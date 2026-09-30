import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as listClients, r as createTicket, u as listTickets } from "./server-B0YXnW-G.mjs";
import { t as Input } from "./input-DYiR5noz.mjs";
import { t as Label } from "./label-DuzO9Sit.mjs";
import { t as Textarea } from "./textarea-Bh8_GwiR.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { l as Plus } from "../_libs/lucide-react.mjs";
import { n as DialogContent, r as DialogTitle, t as Dialog } from "./dialog-Dgd69C-f.mjs";
import { i as STATUSES, r as PRIORITIES, t as CHANNELS } from "./types-DvSQP_Cw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as runOrQueue, m as Button } from "./router-DU9zikjW.mjs";
import { n as TicketRow, t as EmptyTickets } from "./ticket-list-CarBG9pa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-B_KKW2JW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TicketsPage() {
	const [status, setStatus] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const tickets = useQuery({
		queryKey: [
			"tickets",
			status,
			channel,
			priority,
			query
		],
		queryFn: () => listTickets({ data: {
			status: status || void 0,
			channel: channel || void 0,
			priority: priority || void 0,
			query: query || void 0
		} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mr-auto text-sm font-semibold",
						children: "Tickets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
						value: status,
						onChange: setStatus,
						options: ["", ...STATUSES],
						labels: { "": "Status" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
						value: priority,
						onChange: setPriority,
						options: ["", ...PRIORITIES],
						labels: { "": "Priority" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
						value: channel,
						onChange: setChannel,
						options: ["", ...CHANNELS],
						labels: { "": "Channel" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Filter",
						className: "h-11 w-36 sm:h-9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: [tickets.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTickets, { label: "No tickets match these filters." }), tickets.data?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
					ticket: t,
					to: `/desk/tickets/${t.id}`
				}, t.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewTicketDialog, {
				open,
				onOpenChange: setOpen
			})
		]
	});
}
function Filter({ value, onChange, options, labels }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "h-11 rounded-md border border-input bg-background px-2 text-sm sm:h-9",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o,
			children: labels[o] ?? o
		}, o))
	});
}
function NewTicketDialog({ open, onOpenChange }) {
	const clients = useQuery({
		queryKey: ["clients"],
		queryFn: () => listClients(),
		enabled: open
	});
	const [clientId, setClientId] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("medium");
	const navigate = useNavigate();
	const qc = useQueryClient();
	const create = useMutation({
		mutationFn: () => runOrQueue({
			type: "createTicket",
			payload: {
				clientId: Number(clientId),
				subject,
				body,
				priority,
				channel: "web"
			}
		}, () => createTicket({ data: {
			clientId: Number(clientId),
			subject,
			body,
			priority,
			channel: "web"
		} }), {
			id: -1,
			number: 0
		}),
		onSuccess: (res) => {
			qc.invalidateQueries();
			onOpenChange(false);
			setSubject("");
			setBody("");
			if ("queued" in res && res.queued) {
				toast.message("Ticket saved on this phone. It will open on the desk when you’re back online.");
				return;
			}
			navigate({
				to: "/desk/tickets/$ticketId",
				params: { ticketId: String(res.id) }
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New ticket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 space-y-3",
			onSubmit: (e) => {
				e.preventDefault();
				if (!clientId) return;
				create.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Client" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "h-11 w-full rounded-md border border-input bg-background px-3 text-sm",
						value: clientId,
						onChange: (e) => setClientId(e.target.value ? Number(e.target.value) : ""),
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select…"
						}), clients.data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.company
						}, c.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: subject,
						onChange: (e) => setSubject(e.target.value),
						required: true,
						minLength: 3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 w-full rounded-md border border-input bg-background px-3 text-sm",
						value: priority,
						onChange: (e) => setPriority(e.target.value),
						children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: p
						}, p))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "First message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: body,
						onChange: (e) => setBody(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: create.isPending,
						children: create.isPending ? "Creating…" : "Create ticket"
					})
				})
			]
		})] })
	});
}
//#endregion
export { TicketsPage as component };
