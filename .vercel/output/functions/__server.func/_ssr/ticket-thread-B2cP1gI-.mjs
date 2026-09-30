import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as replyTicket } from "./server-B0YXnW-G.mjs";
import { i as initials, r as formatWhen, t as cn } from "./utils-D8zjXuuU.mjs";
import { n as PriorityPill, r as StatusPill, t as ChannelPill } from "./status-pills-Cqe4F4kV.mjs";
import { t as Textarea } from "./textarea-Bh8_GwiR.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { f as MessageSquare, h as Lock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as runOrQueue, m as Button } from "./router-DU9zikjW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket-thread-B2cP1gI-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TicketThread({ ticket, mode }) {
	const qc = useQueryClient();
	const [body, setBody] = (0, import_react.useState)("");
	const [internal, setInternal] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)([]);
	const reply = useMutation({
		mutationFn: () => runOrQueue({
			type: "reply",
			payload: {
				ticketId: ticket.id,
				body,
				isInternal: mode === "staff" && internal
			}
		}, () => replyTicket({ data: {
			ticketId: ticket.id,
			body,
			isInternal: mode === "staff" && internal
		} }), { ok: true }),
		onSuccess: (res) => {
			if ("queued" in res && res.queued) {
				setPending((list) => [...list, {
					id: Date.now(),
					authorType: mode === "staff" ? "agent" : "client",
					authorName: "You",
					body,
					isInternal: mode === "staff" && internal,
					channel: ticket.channel,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}]);
				toast.message("Saved on this device. It will send when you’re back online.");
			}
			setBody("");
			qc.invalidateQueries();
		}
	});
	const messages = [...ticket.messages, ...pending];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6",
			children: [messages.map((m) => {
				const system = m.authorType === "system";
				const agent = m.authorType === "agent";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex gap-3", system && "justify-center"),
					children: system ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground",
						children: [m.body, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 opacity-70",
							children: formatWhen(m.createdAt)
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-9 shrink-0 place-items-center rounded-full text-xs font-medium", agent ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"),
						children: initials(m.authorName)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: m.authorName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: formatWhen(m.createdAt)
								}),
								m.isInternal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-[11px] text-pending",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Note"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelPill, { channel: m.channel })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("rounded-xl border px-3.5 py-2.5 text-sm leading-relaxed", m.isInternal ? "border-pending/30 bg-pending/8" : "border-border bg-card"),
							children: m.body
						})]
					})] })
				}, m.id);
			}), messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-2 py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "No messages yet."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "border-t border-border bg-card p-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!body.trim()) return;
				reply.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					placeholder: mode === "staff" ? "Reply to the client, or leave an internal note…" : "Reply to your IT team…",
					rows: 3,
					className: "bg-background"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [mode === "staff" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: internal,
								onChange: (e) => setInternal(e.target.checked),
								className: "size-4 accent-primary"
							}), "Internal note"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden text-xs text-muted-foreground sm:inline",
							children: ["Replying on ", ticket.channel]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: reply.isPending || !body.trim(),
						size: "sm",
						children: reply.isPending ? "Sending…" : internal ? "Add note" : "Send reply"
					})]
				}),
				reply.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-destructive",
					children: "Could not send. Try again."
				})
			]
		})]
	});
}
function TicketHeaderMeta({ ticket }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: ticket.status }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityPill, { priority: ticket.priority }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelPill, { channel: ticket.channel })
		]
	});
}
//#endregion
export { TicketThread as n, TicketHeaderMeta as t };
