import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createTicket } from "./server-B0YXnW-G.mjs";
import { t as Input } from "./input-DYiR5noz.mjs";
import { t as Label } from "./label-DuzO9Sit.mjs";
import { t as Textarea } from "./textarea-Bh8_GwiR.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as PRIORITIES } from "./types-DvSQP_Cw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as runOrQueue, m as Button } from "./router-DU9zikjW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-BUl0UAGT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPortalTicket() {
	const [subject, setSubject] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("medium");
	const navigate = useNavigate();
	const qc = useQueryClient();
	const create = useMutation({
		mutationFn: () => runOrQueue({
			type: "createTicket",
			payload: {
				subject,
				body,
				priority,
				channel: "portal"
			}
		}, () => createTicket({ data: {
			subject,
			body,
			priority,
			channel: "portal"
		} }), {
			id: -1,
			number: 0
		}),
		onSuccess: (res) => {
			qc.invalidateQueries();
			if ("queued" in res && res.queued) {
				toast.message("Saved on this phone. We’ll open it on the desk when you’re back online.");
				navigate({ to: "/portal/tickets" });
				return;
			}
			navigate({
				to: "/portal/tickets/$ticketId",
				params: { ticketId: String(res.id) }
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight italic",
				children: "New ticket"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Tell us what broke. We'll pick it up on the desk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate();
				},
				children: [
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "What happened" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: body,
							onChange: (e) => setBody(e.target.value),
							required: true,
							rows: 6
						})]
					}),
					create.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: "Could not open the ticket. Try again."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: create.isPending,
						children: create.isPending ? "Opening…" : "Submit ticket"
					})
				]
			})
		]
	});
}
//#endregion
export { NewPortalTicket as component };
