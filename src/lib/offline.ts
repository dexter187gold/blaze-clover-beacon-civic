import type { QueryClient } from "@tanstack/react-query";
import type { Actor } from "@/lib/desk/types";

const CACHE_KEY = "helix.cache.v1";
const QUEUE_KEY = "helix.queue.v1";
const ACTOR_KEY = "helix.actor.v1";
const FIELD_KEY = "helix.field";

export type QueuedOp = {
  id: string;
  createdAt: string;
} & (
  | {
      type: "reply";
      payload: { ticketId: number; body: string; isInternal?: boolean };
    }
  | {
      type: "createTicket";
      payload: {
        clientId?: number;
        subject: string;
        body: string;
        priority?: "low" | "medium" | "high" | "urgent";
        channel?: "web" | "portal" | "email" | "whatsapp" | "facebook";
      };
    }
  | {
      type: "updateTicket";
      payload: { id: number; status?: string; priority?: string; assignee?: string };
    }
);

type CacheSnap = { queries: { key: unknown[]; data: unknown }[] };

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota — keep the last successful snapshot */
  }
}

export function isOnline() {
  return typeof navigator === "undefined" || navigator.onLine;
}

export function loadActor(): Actor | null {
  return readJson<Actor | null>(ACTOR_KEY, null);
}

export function saveActor(actor: Actor) {
  writeJson(ACTOR_KEY, actor);
}

export function fieldModeEnabled() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(FIELD_KEY) === "1";
}

export function setFieldMode(on: boolean) {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(FIELD_KEY, "1");
  else window.localStorage.removeItem(FIELD_KEY);
}

export function restoreQueryClient(client: QueryClient) {
  const snap = readJson<CacheSnap>(CACHE_KEY, { queries: [] });
  for (const entry of snap.queries) {
    if (Array.isArray(entry.key)) client.setQueryData(entry.key, entry.data);
  }
}

export function persistQueryClient(client: QueryClient) {
  let timer = 0;
  const flush = () => {
    const queries = client
      .getQueryCache()
      .getAll()
      .filter((q) => q.state.status === "success" && q.state.data !== undefined)
      .map((q) => ({ key: [...q.queryKey] as unknown[], data: q.state.data }));
    writeJson(CACHE_KEY, { queries });
  };
  const unsub = client.getQueryCache().subscribe(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(flush, 400);
  });
  return () => {
    window.clearTimeout(timer);
    unsub();
    flush();
  };
}

export function listQueue(): QueuedOp[] {
  return readJson<QueuedOp[]>(QUEUE_KEY, []);
}

export function queueCount() {
  return listQueue().length;
}

export function enqueue(op: Omit<QueuedOp, "id" | "createdAt">): QueuedOp {
  const item: QueuedOp = {
    ...op,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  } as QueuedOp;
  writeJson(QUEUE_KEY, [...listQueue(), item]);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("helix-queue"));
  }
  return item;
}

function writeQueue(next: QueuedOp[]) {
  writeJson(QUEUE_KEY, next);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("helix-queue"));
}

export async function runOrQueue<T extends object>(
  op: Omit<QueuedOp, "id" | "createdAt">,
  onlineFn: () => Promise<T>,
  queuedResult: T,
): Promise<T & { queued?: boolean }> {
  if (!isOnline()) {
    enqueue(op);
    return { ...queuedResult, queued: true };
  }
  try {
    return await onlineFn();
  } catch (err) {
    if (!isOnline()) {
      enqueue(op);
      return { ...queuedResult, queued: true };
    }
    throw err;
  }
}

export async function flushQueue(client: QueryClient) {
  if (!isOnline()) return;
  const pending = listQueue();
  if (pending.length === 0) return;
  const {
    replyTicket,
    createTicket,
    updateTicket,
  } = await import("@/lib/desk/server");
  const kept: QueuedOp[] = [];
  for (const op of pending) {
    try {
      if (op.type === "reply") {
        await replyTicket({ data: op.payload });
      } else if (op.type === "createTicket") {
        await createTicket({ data: op.payload });
      } else if (op.type === "updateTicket") {
        await updateTicket({ data: op.payload });
      }
    } catch {
      kept.push(op);
    }
  }
  writeQueue(kept);
  if (kept.length !== pending.length) {
    await client.invalidateQueries();
  }
}

export async function primeDevice(client: QueryClient) {
  const { listTickets, listClients, listKnowledge, getDeskStats, listChannels, getTicket, getClient } =
    await import("@/lib/desk/server");
  const [tickets, clients, kb, stats, channels] = await Promise.all([
    listTickets({ data: {} }),
    listClients(),
    listKnowledge(),
    getDeskStats(),
    listChannels(),
  ]);
  client.setQueryData(["tickets", "recent"], tickets);
  client.setQueryData(["tickets", "queue"], tickets);
  client.setQueryData(["tickets", "", "", "", ""], tickets);
  client.setQueryData(["inbox", ""], tickets);
  client.setQueryData(["portal-tickets"], tickets);
  client.setQueryData(["clients"], clients);
  client.setQueryData(["kb"], kb);
  client.setQueryData(["desk-stats"], stats);
  client.setQueryData(["channels"], channels);

  const details = await Promise.all(tickets.slice(0, 40).map((t) => getTicket({ data: { id: t.id } })));
  for (const detail of details) {
    if (detail) client.setQueryData(["ticket", detail.id], detail);
  }
  const clientRows = await Promise.all(clients.slice(0, 24).map((c) => getClient({ data: { id: c.id } })));
  for (const row of clientRows) {
    if (row) client.setQueryData(["client", row.client.id], row);
  }

  const queries = client
    .getQueryCache()
    .getAll()
    .filter((q) => q.state.data !== undefined)
    .map((q) => ({ key: [...q.queryKey] as unknown[], data: q.state.data }));
  writeJson(CACHE_KEY, { queries });
  setFieldMode(true);
  await registerServiceWorker();
  return { tickets: tickets.length, clients: clients.length, articles: kb.length };
}

export async function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD && !fieldModeEnabled()) return;
  try {
    await navigator.serviceWorker.register("/sw.js");
  } catch {
    /* preview iframes may reject registration */
  }
}

export function displayStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: window-controls-overlay)").matches ||
    ("standalone" in window.navigator && Boolean((window.navigator as { standalone?: boolean }).standalone))
  );
}
