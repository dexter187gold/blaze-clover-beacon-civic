import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as listClients, g as simulateInbound, n as connectChannel, s as listChannels } from "./server-B0YXnW-G.mjs";
import { t as Input } from "./input-DYiR5noz.mjs";
import { t as ChannelPill } from "./status-pills-Cqe4F4kV.mjs";
import { t as Label } from "./label-DuzO9Sit.mjs";
import { t as Textarea } from "./textarea-Bh8_GwiR.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { m as Button } from "./router-DU9zikjW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channels-BPila8xl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COPY = {
	whatsapp: {
		title: "WhatsApp Business",
		body: "Point Meta's WhatsApp Cloud API webhook at Helix. Incoming chats become tickets in the inbox.",
		placeholder: "+27 60 555 0199"
	},
	facebook: {
		title: "Facebook Messenger",
		body: "Page messages land as tickets. Verify the token in Meta's developer console.",
		placeholder: "Page name"
	},
	email: {
		title: "Support email",
		body: "Forward support@ to Helix, or post to the inbound webhook with the verify token.",
		placeholder: "support@yourdesk.com"
	},
	web: {
		title: "Web widget",
		body: "The browser widget is live on your client portal and this desk.",
		placeholder: "helix.app"
	},
	portal: {
		title: "Client portal",
		body: "Share your desk code. Clients sign in and open tickets without emailing you.",
		placeholder: "Portal"
	}
};
function ChannelsPage() {
	const channels = useQuery({
		queryKey: ["channels"],
		queryFn: () => listChannels()
	});
	const clients = useQuery({
		queryKey: ["clients"],
		queryFn: () => listClients()
	});
	const origin = typeof window !== "undefined" ? window.location.origin : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight italic",
				children: "Channels"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted-foreground",
				children: "Helix is built to run in the browser, on WhatsApp, and on Facebook. Windows users can install the desk as an app from Chrome — no separate executable required."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4",
				children: channels.data?.map((ch) => {
					const meta = COPY[ch.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelPill, { channel: ch.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: ch.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-base font-semibold",
										children: meta?.title ?? ch.kind
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 max-w-xl text-sm text-muted-foreground",
										children: meta?.body
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: ch.handle
								})]
							}),
							(ch.kind === "whatsapp" || ch.kind === "facebook") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-xl bg-muted p-3 font-mono text-[11px] leading-relaxed break-all text-muted-foreground",
								children: [
									"POST ",
									origin,
									"/api/webhooks/",
									ch.kind,
									"?token=",
									ch.verifyToken
								]
							}),
							(ch.kind === "whatsapp" || ch.kind === "facebook" || ch.kind === "email") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulateForm, {
								kind: ch.kind,
								clients: clients.data ?? []
							})
						]
					}, ch.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectForm, {})
		]
	});
}
function SimulateForm({ kind, clients }) {
	const [clientId, setClientId] = (0, import_react.useState)(clients[0]?.id ?? "");
	const [text, setText] = (0, import_react.useState)(kind === "whatsapp" ? "Hi, the VPN just dropped again for the Sandton office." : kind === "facebook" ? "Guest posted: Wi-Fi splash page is still last year's offer." : "Please reset MFA for finance@ before 09:00.");
	const navigate = useNavigate();
	const qc = useQueryClient();
	const send = useMutation({
		mutationFn: () => simulateInbound({ data: {
			kind,
			clientId: Number(clientId),
			text
		} }),
		onSuccess: (res) => {
			qc.invalidateQueries();
			navigate({
				to: "/desk/tickets/$ticketId",
				params: { ticketId: String(res.id) }
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-2",
		onSubmit: (e) => {
			e.preventDefault();
			if (!clientId) return;
			send.mutate();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
			"Simulate an inbound ",
			kind,
			" message"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-10 rounded-md border border-input bg-background px-3 text-sm sm:w-56",
					value: clientId,
					onChange: (e) => setClientId(Number(e.target.value)),
					children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.company
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: text,
					onChange: (e) => setText(e.target.value),
					rows: 2,
					className: "min-h-10 flex-1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: send.isPending,
					className: "sm:self-end",
					children: send.isPending ? "…" : "Receive"
				})
			]
		})]
	});
}
function ConnectForm() {
	const qc = useQueryClient();
	const [kind, setKind] = (0, import_react.useState)("whatsapp");
	const [handle, setHandle] = (0, import_react.useState)("");
	const save = useMutation({
		mutationFn: () => connectChannel({ data: {
			kind,
			handle
		} }),
		onSuccess: () => {
			qc.invalidateQueries();
			setHandle("");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-6 rounded-2xl border border-dashed border-border p-5",
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold",
			children: "Connect or update a channel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
					value: kind,
					onChange: (e) => setKind(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "whatsapp",
							children: "WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "facebook",
							children: "Facebook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "email",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "web",
							children: "Web"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "portal",
							children: "Portal"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: handle,
					onChange: (e) => setHandle(e.target.value),
					placeholder: COPY[kind]?.placeholder,
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: save.isPending,
					children: "Save"
				})
			]
		})]
	});
}
//#endregion
export { ChannelsPage as component };
