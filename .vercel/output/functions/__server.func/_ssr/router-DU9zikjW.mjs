import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { bn as union, gn as object, hn as number, pn as literal, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-D8zjXuuU.mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { a as Smartphone, b as Download, n as Wifi, r as TriangleAlert, x as CloudOff } from "../_libs/lucide-react.mjs";
import { r as getSql } from "./db-D7ObDb6W.mjs";
import { n as auth } from "./server-DdMT_LbK.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-nBf7PZ9A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			ghost: "text-foreground hover:bg-accent",
			outline: "border border-border bg-transparent hover:bg-accent",
			destructive: "bg-destructive text-primary-foreground hover:opacity-90",
			link: "text-muted-foreground underline-offset-4 hover:underline hover:text-foreground"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/offline-zgoNauOR.js
var CACHE_KEY = "helix.cache.v1";
var QUEUE_KEY = "helix.queue.v1";
var ACTOR_KEY = "helix.actor.v1";
var FIELD_KEY = "helix.field";
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
function isOnline() {
	return typeof navigator === "undefined" || navigator.onLine;
}
function loadActor() {
	return readJson(ACTOR_KEY, null);
}
function saveActor(actor) {
	writeJson(ACTOR_KEY, actor);
}
function fieldModeEnabled() {
	if (typeof window === "undefined") return false;
	return window.localStorage.getItem(FIELD_KEY) === "1";
}
function setFieldMode(on) {
	if (typeof window === "undefined") return;
	if (on) window.localStorage.setItem(FIELD_KEY, "1");
	else window.localStorage.removeItem(FIELD_KEY);
}
function restoreQueryClient(client) {
	const snap = readJson(CACHE_KEY, { queries: [] });
	for (const entry of snap.queries) if (Array.isArray(entry.key)) client.setQueryData(entry.key, entry.data);
}
function persistQueryClient(client) {
	let timer = 0;
	const flush = () => {
		writeJson(CACHE_KEY, { queries: client.getQueryCache().getAll().filter((q) => q.state.status === "success" && q.state.data !== void 0).map((q) => ({
			key: [...q.queryKey],
			data: q.state.data
		})) });
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
function listQueue() {
	return readJson(QUEUE_KEY, []);
}
function queueCount() {
	return listQueue().length;
}
function enqueue(op) {
	const item = {
		...op,
		id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	writeJson(QUEUE_KEY, [...listQueue(), item]);
	if (typeof window !== "undefined") window.dispatchEvent(new Event("helix-queue"));
	return item;
}
function writeQueue(next) {
	writeJson(QUEUE_KEY, next);
	if (typeof window !== "undefined") window.dispatchEvent(new Event("helix-queue"));
}
async function runOrQueue(op, onlineFn, queuedResult) {
	if (!isOnline()) {
		enqueue(op);
		return {
			...queuedResult,
			queued: true
		};
	}
	try {
		return await onlineFn();
	} catch (err) {
		if (!isOnline()) {
			enqueue(op);
			return {
				...queuedResult,
				queued: true
			};
		}
		throw err;
	}
}
async function flushQueue(client) {
	if (!isOnline()) return;
	const pending = listQueue();
	if (pending.length === 0) return;
	const { replyTicket, createTicket, updateTicket } = await import("./server-B0YXnW-G.mjs").then((n) => n.h).then((n) => n.h);
	const kept = [];
	for (const op of pending) try {
		if (op.type === "reply") await replyTicket({ data: op.payload });
		else if (op.type === "createTicket") await createTicket({ data: op.payload });
		else if (op.type === "updateTicket") await updateTicket({ data: op.payload });
	} catch {
		kept.push(op);
	}
	writeQueue(kept);
	if (kept.length !== pending.length) await client.invalidateQueries();
}
async function primeDevice(client) {
	const { listTickets, listClients, listKnowledge, getDeskStats, listChannels, getTicket, getClient } = await import("./server-B0YXnW-G.mjs").then((n) => n.h).then((n) => n.h);
	const [tickets, clients, kb, stats, channels] = await Promise.all([
		listTickets({ data: {} }),
		listClients(),
		listKnowledge(),
		getDeskStats(),
		listChannels()
	]);
	client.setQueryData(["tickets", "recent"], tickets);
	client.setQueryData(["tickets", "queue"], tickets);
	client.setQueryData([
		"tickets",
		"",
		"",
		"",
		""
	], tickets);
	client.setQueryData(["inbox", ""], tickets);
	client.setQueryData(["portal-tickets"], tickets);
	client.setQueryData(["clients"], clients);
	client.setQueryData(["kb"], kb);
	client.setQueryData(["desk-stats"], stats);
	client.setQueryData(["channels"], channels);
	const details = await Promise.all(tickets.slice(0, 40).map((t) => getTicket({ data: { id: t.id } })));
	for (const detail of details) if (detail) client.setQueryData(["ticket", detail.id], detail);
	const clientRows = await Promise.all(clients.slice(0, 24).map((c) => getClient({ data: { id: c.id } })));
	for (const row of clientRows) if (row) client.setQueryData(["client", row.client.id], row);
	writeJson(CACHE_KEY, { queries: client.getQueryCache().getAll().filter((q) => q.state.data !== void 0).map((q) => ({
		key: [...q.queryKey],
		data: q.state.data
	})) });
	setFieldMode(true);
	await registerServiceWorker();
	return {
		tickets: tickets.length,
		clients: clients.length,
		articles: kb.length
	};
}
async function registerServiceWorker() {
	if (typeof window === "undefined") return;
	if (!("serviceWorker" in navigator)) return;
	try {
		await navigator.serviceWorker.register("/sw.js");
	} catch {}
}
function displayStandalone() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: window-controls-overlay)").matches || "standalone" in window.navigator && Boolean(window.navigator.standalone);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-BYyFvsCd.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DU9zikjW.js
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 250,
		children
	});
}
function useOnline() {
	const [online, setOnline] = (0, import_react.useState)(isOnline);
	(0, import_react.useEffect)(() => {
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
function useQueueCount() {
	const [count, setCount] = (0, import_react.useState)(queueCount);
	(0, import_react.useEffect)(() => {
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
function OfflineBar() {
	const online = useOnline();
	const queued = useQueueCount();
	if (online && queued === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2",
			children: [online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "size-3.5" }), online ? `Sending ${queued} update${queued === 1 ? "" : "s"} saved on this device…` : `Offline · showing work saved on this device${queued ? ` · ${queued} waiting to send` : ""}`]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/get-app",
			className: "shrink-0 text-foreground underline-offset-4 hover:underline",
			children: "Phone & offline"
		})]
	});
}
function InstallHelixButton({ className }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [deferred, setDeferred] = (0, import_react.useState)(null);
	const [installed, setInstalled] = (0, import_react.useState)(() => displayStandalone());
	(0, import_react.useEffect)(() => {
		const onPrompt = (event) => {
			event.preventDefault();
			setDeferred(event);
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
	if (installed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Helix is installed on this device."
	});
	if (!deferred) {
		if (pathname === "/get-app") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className,
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "?install=1&platform=ios",
				children: "iPhone install guide"
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/get-app",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "Get Helix on this phone"]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		className,
		onClick: async () => {
			await deferred.prompt();
			if ((await deferred.userChoice).outcome === "accepted") setInstalled(true);
			setDeferred(null);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Install Helix"]
	});
}
function PrimeDeviceButton() {
	const { user, isPending } = useCurrentUserState();
	const client = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(() => fieldModeEnabled());
	if (isPending) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			children: "Sign in, then prime this phone"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		disabled: busy,
		onClick: () => {
			setBusy(true);
			(async () => {
				try {
					setFieldMode(true);
					await registerServiceWorker();
					const res = await primeDevice(client);
					setDone(true);
					toast.success(`Saved ${res.tickets} tickets, ${res.clients} clients, ${res.articles} articles on this device.`);
				} catch {
					toast.error("Could not prime while offline. Connect once, then try again.");
				} finally {
					setBusy(false);
				}
			})();
		},
		children: busy ? "Saving to this phone…" : done ? "Refresh offline copy" : "Prime this phone for offline"
	});
}
function ConnectivitySync() {
	const client = useQueryClient();
	(0, import_react.useEffect)(() => {
		registerServiceWorker();
		const onOnline = () => {
			toast.message("Back online. Syncing the desk…");
			flushQueue(client);
		};
		const onOffline = () => {
			toast.message("You’re offline. Helix will keep the last copy on this device.");
		};
		window.addEventListener("online", onOnline);
		window.addEventListener("offline", onOffline);
		if (isOnline() && listQueue().length > 0) flushQueue(client);
		return () => {
			window.removeEventListener("online", onOnline);
			window.removeEventListener("offline", onOffline);
		};
	}, [client]);
	return null;
}
function AppProviders({ children }) {
	const [client] = (0, import_react.useState)(() => {
		const qc = new QueryClient({ defaultOptions: {
			queries: {
				staleTime: 8e3,
				gcTime: 864e5,
				retry: (count) => (typeof navigator === "undefined" || navigator.onLine) && count < 1,
				refetchOnWindowFocus: false,
				networkMode: "offlineFirst"
			},
			mutations: { networkMode: "offlineFirst" }
		} });
		restoreQueryClient(qc);
		return qc;
	});
	(0, import_react.useEffect)(() => persistQueryClient(client), [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectivitySync, {}), children] })
	});
}
var styles_default = "/assets/styles-CH1OmOZJ.css";
var APP_NAME = "Helix";
var Route$22 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0B0C0F"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "description",
				content: "Helix is the CRM and ticketing desk for IT firms — staff portal, client portal, WhatsApp, Facebook, and web."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppProviders, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				toastOptions: { style: {
					background: "#12141a",
					border: "1px solid #262a33",
					color: "#f2f2f0"
				} }
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$18 = () => import("./routes-CPVsA___.mjs");
var Route$21 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./desk-Cm_Ca-J4.mjs");
var Route$20 = createFileRoute("/desk")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./get-app-DTZGFQHV.mjs");
var Route$19 = createFileRoute("/get-app")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./login-CyHy8Fif.mjs");
var Route$18 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./portal-DhDsB56k.mjs");
var Route$17 = createFileRoute("/portal")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./desk-4d1-oKJV.mjs");
var Route$16 = createFileRoute("/desk/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./channels-BPila8xl.mjs");
var Route$15 = createFileRoute("/desk/channels")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./clients-BJihD0hW.mjs");
var Route$14 = createFileRoute("/desk/clients")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./inbox-3F-d7h5A.mjs");
var Route$13 = createFileRoute("/desk/inbox")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./knowledge-CLrfdSxn.mjs");
var Route$12 = createFileRoute("/desk/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./reports-DbXpflMG.mjs");
var Route$11 = createFileRoute("/desk/reports")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./tickets-B_KKW2JW.mjs");
var Route$10 = createFileRoute("/desk/tickets")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./portal-oofHs04G.mjs");
var Route$9 = createFileRoute("/portal/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./knowledge-CiDpOhf0.mjs");
var Route$8 = createFileRoute("/portal/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./new-BUl0UAGT.mjs");
var Route$7 = createFileRoute("/portal/new")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./tickets-ORAajwNp.mjs");
var Route$6 = createFileRoute("/portal/tickets")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var Route$5 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
async function ingestChannelWebhook(input) {
	const sql = await getSql();
	const ch = (await sql`
    select user_id, kind from channels
    where verify_token = ${input.verifyToken} and kind = ${input.kind} and status = 'connected'
    limit 1
  `)[0];
	if (!ch) return { ok: false };
	let client = (await sql`
    select id, contact_name, email from clients
    where user_id = ${ch.user_id}
      and (phone ilike '%' || ${input.fromId} || '%' or contact_name ilike '%' || ${input.fromName} || '%')
    limit 1
  `)[0];
	if (!client) client = (await sql`
      insert into clients (user_id, company, contact_name, email, phone, status, plan, notes, city)
      values (
        ${ch.user_id}, ${input.fromName || "Inbound"}, ${input.fromName || "Unknown"},
        '', ${input.fromId}, 'active', 'break-fix', ${`Arrived via ${input.kind}.`}, ''
      )
      returning id, contact_name, email
    `)[0];
	if (!client) return { ok: false };
	const number = (await sql`
    insert into ticket_seq (user_id, last_number) values (${ch.user_id}, 1042)
    on conflict (user_id) do update set last_number = ticket_seq.last_number + 1
    returning last_number
  `)[0]?.last_number ?? 1042;
	const subject = input.text.slice(0, 80) || `${input.kind} message`;
	const ticketId = (await sql`
    insert into tickets (
      user_id, client_id, number, subject, status, priority, channel, assignee,
      requester_name, requester_email, sla_due_at
    ) values (
      ${ch.user_id}, ${client.id}, ${number}, ${subject}, 'open', 'high', ${input.kind}, 'Unassigned',
      ${client.contact_name}, ${client.email}, now() + interval '8 hours'
    ) returning id
  `)[0].id;
	await sql`
    insert into ticket_messages (user_id, ticket_id, author_type, author_name, body, is_internal, channel)
    values (${ch.user_id}, ${ticketId}, 'channel', ${client.contact_name}, ${input.text}, false, ${input.kind})
  `;
	return {
		ok: true,
		id: ticketId,
		number
	};
}
var Route$4 = createFileRoute("/api/webhooks/facebook")({ server: { handlers: {
	GET: async ({ request }) => {
		const url = new URL(request.url);
		const mode = url.searchParams.get("hub.mode");
		const token = url.searchParams.get("hub.verify_token");
		const challenge = url.searchParams.get("hub.challenge");
		if (mode !== "subscribe" || !token || !challenge) return new Response("forbidden", { status: 403 });
		if (!(await (await getSql())`
          select id from channels where verify_token = ${token} and kind = 'facebook'
        `)[0]) return new Response("forbidden", { status: 403 });
		return new Response(challenge, { status: 200 });
	},
	POST: async ({ request }) => {
		const token = new URL(request.url).searchParams.get("token") ?? "";
		const msg = (await request.json().catch(() => null))?.entry?.[0]?.messaging?.[0];
		const text = msg?.message?.text?.trim();
		if (!text) return new Response(JSON.stringify({ ok: true }), { status: 200 });
		const result = await ingestChannelWebhook({
			kind: "facebook",
			verifyToken: token,
			fromName: "Facebook",
			fromId: msg?.sender?.id || "",
			text
		});
		return Response.json(result, { status: result.ok ? 200 : 403 });
	}
} } });
var Route$3 = createFileRoute("/api/webhooks/whatsapp")({ server: { handlers: {
	GET: async ({ request }) => {
		const url = new URL(request.url);
		const mode = url.searchParams.get("hub.mode");
		const token = url.searchParams.get("hub.verify_token");
		const challenge = url.searchParams.get("hub.challenge");
		if (mode !== "subscribe" || !token || !challenge) return new Response("forbidden", { status: 403 });
		if (!(await (await getSql())`
          select id from channels where verify_token = ${token} and kind = 'whatsapp'
        `)[0]) return new Response("forbidden", { status: 403 });
		return new Response(challenge, { status: 200 });
	},
	POST: async ({ request }) => {
		const token = new URL(request.url).searchParams.get("token") ?? "";
		const change = (await request.json().catch(() => null))?.entry?.[0]?.changes?.[0]?.value;
		const message = change?.messages?.[0];
		const contact = change?.contacts?.[0];
		const text = message?.text?.body?.trim();
		const verifyToken = token || request.headers.get("x-hub-signature-token") || "";
		if (!text) return new Response(JSON.stringify({ ok: true }), { status: 200 });
		const result = await ingestChannelWebhook({
			kind: "whatsapp",
			verifyToken,
			fromName: contact?.profile?.name || "WhatsApp",
			fromId: message?.from || contact?.wa_id || "",
			text
		});
		return Response.json(result, { status: result.ok ? 200 : 403 });
	}
} } });
var $$splitComponentImporter$2 = () => import("./clients._clientId-4-nv_JwK.mjs");
var Route$2 = createFileRoute("/desk/clients/$clientId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./tickets._ticketId-DHwj6u_G.mjs");
var Route$1 = createFileRoute("/desk/tickets/$ticketId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./tickets._ticketId-DpLHUQy3.mjs");
var Route = createFileRoute("/portal/tickets/$ticketId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var DeskRoute = Route$20.update({
	id: "/desk",
	path: "/desk",
	getParentRoute: () => Route$22
});
var GetAppRoute = Route$19.update({
	id: "/get-app",
	path: "/get-app",
	getParentRoute: () => Route$22
});
var LoginRoute = Route$18.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$22
});
var PortalRoute = Route$17.update({
	id: "/portal",
	path: "/portal",
	getParentRoute: () => Route$22
});
var DeskIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => DeskRoute
});
var DeskChannelsRoute = Route$15.update({
	id: "/channels",
	path: "/channels",
	getParentRoute: () => DeskRoute
});
var DeskClientsRoute = Route$14.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => DeskRoute
});
var DeskInboxRoute = Route$13.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => DeskRoute
});
var DeskKnowledgeRoute = Route$12.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => DeskRoute
});
var DeskReportsRoute = Route$11.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => DeskRoute
});
var DeskTicketsRoute = Route$10.update({
	id: "/tickets",
	path: "/tickets",
	getParentRoute: () => DeskRoute
});
var PortalIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => PortalRoute
});
var PortalKnowledgeRoute = Route$8.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => PortalRoute
});
var PortalNewRoute = Route$7.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => PortalRoute
});
var PortalTicketsRoute = Route$6.update({
	id: "/tickets",
	path: "/tickets",
	getParentRoute: () => PortalRoute
});
var ApiAuthSplatRoute = Route$5.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$22
});
var ApiWebhooksFacebookRoute = Route$4.update({
	id: "/api/webhooks/facebook",
	path: "/api/webhooks/facebook",
	getParentRoute: () => Route$22
});
var ApiWebhooksWhatsappRoute = Route$3.update({
	id: "/api/webhooks/whatsapp",
	path: "/api/webhooks/whatsapp",
	getParentRoute: () => Route$22
});
var DeskClientsClientIdRoute = Route$2.update({
	id: "/$clientId",
	path: "/$clientId",
	getParentRoute: () => DeskClientsRoute
});
var DeskTicketsTicketIdRoute = Route$1.update({
	id: "/$ticketId",
	path: "/$ticketId",
	getParentRoute: () => DeskTicketsRoute
});
var PortalTicketsTicketIdRoute = Route.update({
	id: "/$ticketId",
	path: "/$ticketId",
	getParentRoute: () => PortalTicketsRoute
});
var DeskClientsRouteChildren = { DeskClientsClientIdRoute };
var DeskClientsRouteWithChildren = DeskClientsRoute._addFileChildren(DeskClientsRouteChildren);
var DeskTicketsRouteChildren = { DeskTicketsTicketIdRoute };
var DeskRouteChildren = {
	DeskChannelsRoute,
	DeskClientsRoute: DeskClientsRouteWithChildren,
	DeskInboxRoute,
	DeskKnowledgeRoute,
	DeskReportsRoute,
	DeskTicketsRoute: DeskTicketsRoute._addFileChildren(DeskTicketsRouteChildren),
	DeskIndexRoute
};
var DeskRouteWithChildren = DeskRoute._addFileChildren(DeskRouteChildren);
var PortalTicketsRouteChildren = { PortalTicketsTicketIdRoute };
var PortalRouteChildren = {
	PortalKnowledgeRoute,
	PortalNewRoute,
	PortalTicketsRoute: PortalTicketsRoute._addFileChildren(PortalTicketsRouteChildren),
	PortalIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	DeskRoute: DeskRouteWithChildren,
	GetAppRoute,
	LoginRoute,
	PortalRoute: PortalRoute._addFileChildren(PortalRouteChildren),
	ApiAuthSplatRoute,
	ApiWebhooksFacebookRoute,
	ApiWebhooksWhatsappRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { InstallHelixButton as a, useCurrentUser as c, loadActor as d, runOrQueue as f, Route$2 as i, useCurrentUserState as l, Button as m, Route as n, OfflineBar as o, saveActor as p, Route$1 as r, PrimeDeviceButton as s, router_exports as t, displayStandalone as u };
