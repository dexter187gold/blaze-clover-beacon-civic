import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as getTicket } from "./server-B0YXnW-G.mjs";
import { o as ticketRef } from "./utils-D8zjXuuU.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as Route } from "./router-DU9zikjW.mjs";
import { n as TicketThread, t as TicketHeaderMeta } from "./ticket-thread-B2cP1gI-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets._ticketId-DpLHUQy3.js
var import_jsx_runtime = require_jsx_runtime();
function PortalTicket() {
	const { ticketId } = Route.useParams();
	const id = Number(ticketId);
	const ticket = useQuery({
		queryKey: ["ticket", id],
		queryFn: () => getTicket({ data: { id } }),
		enabled: Number.isFinite(id)
	});
	const t = ticket.data;
	if (ticket.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!t) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Ticket not found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70dvh] flex-col overflow-hidden rounded-2xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal/tickets",
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "Tickets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs text-muted-foreground",
					children: ticketRef(t.number)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-lg font-semibold",
					children: t.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketHeaderMeta, { ticket: t })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketThread, {
			ticket: t,
			mode: "client"
		})]
	});
}
//#endregion
export { PortalTicket as component };
