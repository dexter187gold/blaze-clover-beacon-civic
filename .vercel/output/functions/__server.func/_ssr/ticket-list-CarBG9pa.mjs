import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as slaLabel, n as formatRelative, o as ticketRef, t as cn } from "./utils-D8zjXuuU.mjs";
import { n as PriorityPill, r as StatusPill, t as ChannelPill } from "./status-pills-Cqe4F4kV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket-list-CarBG9pa.js
var import_jsx_runtime = require_jsx_runtime();
function TicketRow({ ticket, active, to }) {
	const sla = slaLabel(ticket.slaDueAt, ticket.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("block border-b border-border px-4 py-3 transition-colors hover:bg-accent/50", active && "bg-accent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-muted-foreground tabular-nums",
						children: ticketRef(ticket.number)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-sm font-medium",
						children: ticket.subject
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 truncate text-xs text-muted-foreground",
					children: [
						ticket.clientCompany,
						" · ",
						ticket.requesterName,
						ticket.lastMessage ? ` — ${ticket.lastMessage}` : ""
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 flex-col items-end gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: formatRelative(ticket.updatedAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: ticket.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityPill, { priority: ticket.priority })]
					}),
					sla && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-[11px] tabular-nums", sla.kind === "overdue" ? "text-urgent" : sla.kind === "soon" ? "text-pending" : "text-muted-foreground"),
						children: sla.text
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelPill, { channel: ticket.channel })
		})]
	});
}
function EmptyTickets({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid flex-1 place-items-center px-6 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		})
	});
}
//#endregion
export { TicketRow as n, EmptyTickets as t };
