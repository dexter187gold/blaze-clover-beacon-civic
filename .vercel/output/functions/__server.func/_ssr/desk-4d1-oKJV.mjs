import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getDeskStats, u as listTickets } from "./server-B0YXnW-G.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as CircleCheck, S as CircleDot, T as Building2, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as TicketRow } from "./ticket-list-CarBG9pa.mjs";
import { t as Skeleton } from "./skeleton-BqUkbEo6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-4d1-oKJV.js
var import_jsx_runtime = require_jsx_runtime();
function DeskHome() {
	const stats = useQuery({
		queryKey: ["desk-stats"],
		queryFn: () => getDeskStats()
	});
	const tickets = useQuery({
		queryKey: ["tickets", "recent"],
		queryFn: () => listTickets({ data: {} })
	});
	const s = stats.data;
	const recent = (tickets.data ?? []).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight italic",
					children: "Today on the desk."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Open work, SLA pressure, and the latest threads across every channel."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Open",
						value: s?.open,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-4 text-open" }),
						loading: stats.isPending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Waiting",
						value: s?.pending,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-pending" }),
						loading: stats.isPending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "SLA overdue",
						value: s?.overdue,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-urgent" }),
						loading: stats.isPending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Resolved today",
						value: s?.resolvedToday,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-resolved" }),
						loading: stats.isPending
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Live queue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/desk/tickets",
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "All tickets"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 overflow-hidden rounded-2xl border border-border bg-card",
				children: [tickets.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64" }), recent.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
					ticket: t,
					to: `/desk/tickets/${t.id}`
				}, t.id))]
			})
		]
	});
}
function StatCard({ label, value, icon, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted-foreground uppercase",
				children: label
			}), icon]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-3 h-8 w-12" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-mono text-3xl tabular-nums",
			children: value ?? 0
		})]
	});
}
//#endregion
export { DeskHome as component };
