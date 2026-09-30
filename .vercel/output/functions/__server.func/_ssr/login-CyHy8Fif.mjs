import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Input } from "./input-DYiR5noz.mjs";
import { t as Label } from "./label-DuzO9Sit.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { t as GROK_PROVIDERS } from "./server-DdMT_LbK.mjs";
import { l as useCurrentUserState, m as Button } from "./router-DU9zikjW.mjs";
import { t as HelixWordmark } from "./helix-mark-Bxr11lWG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CyHy8Fif.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("staff");
	const [emailMode, setEmailMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [joinCode, setJoinCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-background" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: mode === "client" ? "/portal" : "/desk" });
	async function onEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		sessionStorage.setItem("helix.intent", mode);
		if (mode === "client") {
			sessionStorage.setItem("helix.joinCode", joinCode.trim().toUpperCase());
			sessionStorage.setItem("helix.company", company.trim());
		} else {
			sessionStorage.removeItem("helix.joinCode");
			if (company.trim()) sessionStorage.setItem("helix.company", company.trim());
		}
		try {
			if (emailMode === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name || email
				});
				if (err) throw new Error(err.message ?? "Could not create account");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password
				});
				if (err) throw new Error(err.message ?? "Could not sign in");
			}
			window.location.href = mode === "client" ? "/portal" : "/desk";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixWordmark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight italic",
					children: mode === "staff" ? "Open the desk." : "Enter as a client."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: mode === "staff" ? "Management portal for your IT team." : "Use the desk code your provider shared."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 rounded-lg bg-muted p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("staff"),
						className: `h-9 rounded-md text-sm ${mode === "staff" ? "bg-card text-foreground" : "text-muted-foreground"}`,
						children: "Staff"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("client"),
						className: `h-9 rounded-md text-sm ${mode === "client" ? "bg-card text-foreground" : "text-muted-foreground"}`,
						children: "Client"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						className: "w-full",
						onClick: () => {
							sessionStorage.setItem("helix.intent", mode);
							if (mode === "client") {
								sessionStorage.setItem("helix.joinCode", joinCode.trim().toUpperCase());
								sessionStorage.setItem("helix.company", company.trim());
							}
							signIn(p.providerId, { callbackURL: mode === "client" ? "/portal" : "/desk" });
						},
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						"Email",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: onEmail,
					children: [
						emailMode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Your name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								required: true
							})]
						}),
						mode === "staff" && emailMode === "up" || mode === "client" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "company",
								children: mode === "client" ? "Your company" : "Desk name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "company",
								value: company,
								onChange: (e) => setCompany(e.target.value),
								placeholder: mode === "staff" ? "Northline IT" : "Meridian Legal"
							})]
						}) : null,
						mode === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "code",
								children: "Desk code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "code",
								value: joinCode,
								onChange: (e) => setJoinCode(e.target.value),
								placeholder: "e.g. K7M2QH",
								className: "font-mono uppercase",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								autoComplete: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								autoComplete: emailMode === "up" ? "new-password" : "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								minLength: 8,
								required: true
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: busy,
							children: busy ? "Please wait…" : emailMode === "up" ? "Create account" : "Sign in with email"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline",
					onClick: () => setEmailMode(emailMode === "up" ? "in" : "up"),
					children: emailMode === "up" ? "Have an account? Sign in" : "Need an account? Create one"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: [
						"Testing on a phone?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/get-app",
							className: "text-foreground underline-offset-4 hover:underline",
							children: "Install Helix and go offline"
						}),
						"."
					]
				})
			]
		})
	});
}
//#endregion
export { Login as component };
