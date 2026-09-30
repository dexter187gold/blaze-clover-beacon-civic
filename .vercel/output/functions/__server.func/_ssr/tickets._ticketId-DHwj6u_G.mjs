import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as updateTicket, o as getTicket, u as listTickets } from "./server-B0YXnW-G.mjs";
import { a as slaLabel, i as initials, o as ticketRef, r as formatWhen } from "./utils-D8zjXuuU.mjs";
import { t as Label } from "./label-DuzO9Sit.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as PanelRight } from "../_libs/lucide-react.mjs";
import { i as STATUSES, r as PRIORITIES } from "./types-DvSQP_Cw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as runOrQueue, m as Button, r as Route$1 } from "./router-DU9zikjW.mjs";
import { n as TicketRow } from "./ticket-list-CarBG9pa.mjs";
import { n as SheetContent, r as SheetTitle, t as Sheet } from "./sheet-DnH4s8rc.mjs";
import { n as TicketThread, t as TicketHeaderMeta } from "./ticket-thread-B2cP1gI-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets._ticketId-DHwj6u_G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TicketDetailPage() {
	const { ticketId } = Route$1.useParams();
	const id = Number(ticketId);
	const qc = useQueryClient();
	const ticket = useQuery({
		queryKey: ["ticket", id],
		queryFn: () => getTicket({ data: { id } }),
		enabled: Number.isFinite(id)
	});
	const queue = useQuery({
		queryKey: ["tickets", "queue"],
		queryFn: () => listTickets({ data: {} })
	});
	const [propsOpen, setPropsOpen] = (0, import_react.useState)(false);
	const t = ticket.data;
	const mutate = useMutation({
		mutationFn: (patch) => runOrQueue({
			type: "updateTicket",
			payload: {
				id,
				...patch
			}
		}, () => updateTicket({ data: {
			id,
			...patch
		} }), { ok: true }),
		onSuccess: (res) => {
			if ("queued" in res && res.queued) toast.message("Change saved on this device. It will sync when you’re online.");
			qc.invalidateQueries();
		}
	});
	if (ticket.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Loading ticket…"
	});
	if (!t) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Ticket not found."
	});
	const sla = slaLabel(t.slaDueAt, t.status);
	const properties = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
				value: t.status,
				onChange: (e) => mutate.mutate({ status: e.target.value }),
				children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s,
					children: s
				}, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
				value: t.priority,
				onChange: (e) => mutate.mutate({ priority: e.target.value }),
				children: PRIORITIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s,
					children: s
				}, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Assignee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
				defaultValue: t.assignee,
				onBlur: (e) => {
					if (e.target.value !== t.assignee) mutate.mutate({ assignee: e.target.value });
				}
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-background p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted-foreground uppercase",
						children: "SLA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-1 text-sm tabular-nums ${sla?.kind === "overdue" ? "text-urgent" : ""}`,
						children: sla ? sla.text : "Complete"
					}),
					t.slaDueAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: ["Due ", formatWhen(t.slaDueAt)]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/desk/clients/$clientId",
				params: { clientId: String(t.clientId) },
				className: "block rounded-xl border border-border bg-background p-3 hover:bg-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted-foreground uppercase",
						children: "Client"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-full bg-muted text-xs",
							children: initials(t.client.company)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: t.client.company
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t.client.contactName
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [
							t.client.plan,
							" · ",
							t.client.city,
							" · ",
							t.client.openTickets,
							" open"
						]
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-72 shrink-0 overflow-y-auto border-r border-border xl:block",
				children: (queue.data ?? []).slice(0, 24).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketRow, {
					ticket: item,
					active: item.id === t.id,
					to: `/desk/tickets/${item.id}`
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 border-b border-border px-4 py-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: ticketRef(t.number)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 text-lg font-semibold tracking-tight",
								children: t.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketHeaderMeta, { ticket: t })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon-sm",
						className: "lg:hidden",
						onClick: () => setPropsOpen(true),
						"aria-label": "Properties",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketThread, {
					ticket: t,
					mode: "staff"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-80 shrink-0 overflow-y-auto border-l border-border p-4 lg:block",
				children: properties
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: propsOpen,
				onOpenChange: setPropsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "mb-4",
					children: "Ticket"
				}), properties] })
			})
		]
	});
}
//#endregion
export { TicketDetailPage as component };
