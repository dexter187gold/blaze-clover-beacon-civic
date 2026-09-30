import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as listKnowledge, u as listTickets } from "./server-B0YXnW-G.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as Plus } from "../_libs/lucide-react.mjs";
import { m as Button } from "./router-DU9zikjW.mjs";
import { n as TicketRow } from "./ticket-list-CarBG9pa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-oofHs04G.js
var import_jsx_runtime = require_jsx_runtime();
function PortalHome() {
	const tickets = useQuery({
		queryKey: ["portal-tickets"],
		queryFn: () => listTickets({ data: {} })
	});
	const kb = useQuery({
		queryKey: ["kb"],
		queryFn: () => listKnowledge()
	});
	const open = (tickets.data ?? []).filter((t) => [
		"open",
		"pending",
		"waiting"
	].includes(t.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight italic",
				children: "Your IT desk."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Open tickets, knowledge, and a short path to ask for help."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/portal/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New ticket"]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-sm font-semibold",
			children: "Open with us"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 overflow-hidden rounded-2xl border border-border bg-card",
			children: [open.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-10 text-center text-sm text-muted-foreground",
				children: "Nothing open. Open a ticket if something breaks."
			}), open.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
				ticket: t,
				to: `/portal/tickets/${t.id}`
			}, t.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-sm font-semibold",
			children: "Help articles"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-2",
			children: kb.data?.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/portal/knowledge",
				className: "rounded-2xl border border-border bg-card p-4 hover:bg-accent/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-wide text-muted-foreground uppercase",
						children: a.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: a.excerpt
					})
				]
			}, a.id))
		})
	] });
}
//#endregion
export { PortalHome as component };
