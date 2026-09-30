import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CloudOff, Download, Smartphone, Wifi } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  displayStandalone,
  fieldModeEnabled,
  flushQueue,
  isOnline,
  listQueue,
  primeDevice,
  queueCount,
  registerServiceWorker,
  setFieldMode,
} from "@/lib/offline";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function useOnline() {
  const [online, setOnline] = useState(isOnline);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

export function useQueueCount() {
  const [count, setCount] = useState(queueCount);
  useEffect(() => {
    const sync = () => setCount(queueCount());
    window.addEventListener("helix-queue", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("helix-queue", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return count;
}

export function OfflineBar() {
  const online = useOnline();
  const queued = useQueueCount();
  if (online && queued === 0) return null;
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2 text-xs text-muted-foreground">
      <p className="flex items-center gap-2">
        {online ? <Wifi className="size-3.5" /> : <CloudOff className="size-3.5" />}
        {online
          ? `Sending ${queued} update${queued === 1 ? "" : "s"} saved on this device…`
          : `Offline · showing work saved on this device${queued ? ` · ${queued} waiting to send` : ""}`}
      </p>
      <Link to="/get-app" className="shrink-0 text-foreground underline-offset-4 hover:underline">
        Phone & offline
      </Link>
    </div>
  );
}

export function InstallHelixButton({ className }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(() => displayStandalone());

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as InstallEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return (
      <p className="text-sm text-muted-foreground">Helix is installed on this device.</p>
    );
  }

  if (!deferred) {
    if (pathname === "/get-app") {
      return (
        <Button variant="outline" className={className} asChild>
          <a href="?install=1&platform=ios">iPhone install guide</a>
        </Button>
      );
    }
    return (
      <Button asChild variant="outline" className={className}>
        <Link to="/get-app">
          <Smartphone className="size-4" />
          Get Helix on this phone
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className={className}
      onClick={async () => {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        if (choice.outcome === "accepted") setInstalled(true);
        setDeferred(null);
      }}
    >
      <Download className="size-4" />
      Install Helix
    </Button>
  );
}

export function PrimeDeviceButton() {
  const { user, isPending } = useCurrentUserState();
  const client = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(() => fieldModeEnabled());

  if (isPending) return null;
  if (!user) {
    return (
      <Button asChild>
        <Link to="/login">Sign in, then prime this phone</Link>
      </Button>
    );
  }

  return (
    <Button
      disabled={busy}
      onClick={() => {
        setBusy(true);
        void (async () => {
          try {
            setFieldMode(true);
            await registerServiceWorker();
            const res = await primeDevice(client);
            setDone(true);
            toast.success(
              `Saved ${res.tickets} tickets, ${res.clients} clients, ${res.articles} articles on this device.`,
            );
          } catch {
            toast.error("Could not prime while offline. Connect once, then try again.");
          } finally {
            setBusy(false);
          }
        })();
      }}
    >
      {busy ? "Saving to this phone…" : done ? "Refresh offline copy" : "Prime this phone for offline"}
    </Button>
  );
}

export function ConnectivitySync() {
  const client = useQueryClient();
  useEffect(() => {
    void registerServiceWorker();
    const onOnline = () => {
      toast.message("Back online. Syncing the desk…");
      void flushQueue(client);
    };
    const onOffline = () => {
      toast.message("You’re offline. Helix will keep the last copy on this device.");
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    if (isOnline() && listQueue().length > 0) void flushQueue(client);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [client]);
  return null;
}
