import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as listTickets } from "./server-B0YXnW-G.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as TicketRow, t as EmptyTickets } from "./ticket-list-CarBG9pa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-ORAajwNp.js
var import_jsx_runtime = require_jsx_runtime();
function PortalTickets() {
	const tickets = useQuery({
		queryKey: ["portal-tickets"],
		queryFn: () => listTickets({ data: {} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight italic",
			children: "Tickets"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Everything you have opened with your IT team."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 overflow-hidden rounded-2xl border border-border bg-card",
			children: [tickets.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTickets, { label: "No tickets yet." }), tickets.data?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
				ticket: t,
				to: `/portal/tickets/${t.id}`
			}, t.id))]
		})
	] });
}
//#endregion
export { PortalTickets as component };
