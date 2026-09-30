import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as getClient } from "./server-B0YXnW-G.mjs";
import { i as initials } from "./utils-D8zjXuuU.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Route$2 } from "./router-DU9zikjW.mjs";
import { n as TicketRow } from "./ticket-list-CarBG9pa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients._clientId-4-nv_JwK.js
var import_jsx_runtime = require_jsx_runtime();
function ClientDetailPage() {
	const { clientId } = Route$2.useParams();
	const id = Number(clientId);
	const q = useQuery({
		queryKey: ["client", id],
		queryFn: () => getClient({ data: { id } }),
		enabled: Number.isFinite(id)
	});
	const data = q.data;
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Client not found."
	});
	const c = data.client;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk/clients",
				className: "text-xs text-muted-foreground hover:text-foreground",
				children: "Clients"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-12 place-items-center rounded-full bg-muted text-sm font-medium",
					children: initials(c.company)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: c.company
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							c.contactName,
							" · ",
							c.email,
							" · ",
							c.phone
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							c.plan,
							" · ",
							c.city,
							" · ",
							c.status
						]
					})
				] })]
			}),
			c.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed",
				children: c.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-sm font-semibold",
				children: "Tickets"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-hidden rounded-2xl border border-border bg-card",
				children: data.tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
					ticket: t,
					to: `/desk/tickets/${t.id}`
				}, t.id))
			})
		]
	});
}
//#endregion
export { ClientDetailPage as component };
