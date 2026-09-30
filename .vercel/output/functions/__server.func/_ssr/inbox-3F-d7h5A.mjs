import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as listTickets } from "./server-B0YXnW-G.mjs";
import { t as cn } from "./utils-D8zjXuuU.mjs";
import { t as ChannelPill } from "./status-pills-Cqe4F4kV.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as CHANNELS } from "./types-DvSQP_Cw.mjs";
import { n as TicketRow, t as EmptyTickets } from "./ticket-list-CarBG9pa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-3F-d7h5A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InboxPage() {
	const [channel, setChannel] = (0, import_react.useState)("");
	const openish = (useQuery({
		queryKey: ["inbox", channel],
		queryFn: () => listTickets({ data: {
			channel: channel || void 0,
			status: void 0
		} })
	}).data ?? []).filter((t) => [
		"open",
		"pending",
		"waiting"
	].includes(t.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-4 py-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl tracking-tight italic",
					children: "Inbox"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "WhatsApp, Facebook, email, portal and web — one queue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setChannel(""),
						className: cn("h-8 rounded-full px-3 text-xs", channel === "" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
						children: "All"
					}), CHANNELS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setChannel(c),
						className: cn("h-8 rounded-full px-2 text-xs", channel === c ? "bg-primary text-primary-foreground" : "bg-muted"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelPill, { channel: c })
					}, c))]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children: [openish.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTickets, { label: "Inbox is clear." }), openish.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
				ticket: t,
				to: `/desk/tickets/${t.id}`
			}, t.id))]
		})]
	});
}
//#endregion
export { InboxPage as component };
