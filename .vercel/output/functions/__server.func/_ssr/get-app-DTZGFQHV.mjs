import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as ArrowRight, a as Smartphone, c as Radio, d as Monitor, n as Wifi, x as CloudOff } from "../_libs/lucide-react.mjs";
import { a as InstallHelixButton, m as Button, s as PrimeDeviceButton, u as displayStandalone } from "./router-DU9zikjW.mjs";
import { t as HelixWordmark } from "./helix-mark-Bxr11lWG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-app-DTZGFQHV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GetApp() {
	const [standalone] = (0, import_react.useState)(() => displayStandalone());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex h-16 max-w-3xl items-center justify-between px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixWordmark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Sign in"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 pb-24 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
					children: "Phone · Windows · Offline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-3 text-4xl leading-[1.1] tracking-tight italic",
					children: "Run Helix on your phone, then take the desk offline."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: "Helix is a web app. You do not need Grok, an APK, or a Windows installer to use it day to day. Open it in Chrome, install it like a native app, sign in once while you have signal, then prime the phone so tickets stay readable in the field."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallHelixButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimeDeviceButton, {})]
				}),
				standalone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-resolved",
					children: "Running as an installed app on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-12 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
							n: "01",
							title: "Publish once, then leave Grok behind",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use Publish in this chat. Helix receives its own web address. Share that address with your technicians and clients. After that, nobody needs Grok to sign in, open tickets, or run the desk." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: "Daily sign-in is email, Google, or X. Staff land on the management desk. Clients join with your desk code and land on the client portal."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
							n: "02",
							title: "Android — test before you go live",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You do not sideload an APK. Chrome on Android is the test bed, and it is the live product." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
									className: "mt-3 list-decimal space-y-2 pl-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open the published Helix address in Chrome — not in-app browsers, not Facebook’s browser." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sign in as staff while you still have data or Wi-Fi." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											"Tap the Chrome menu (three dots) → ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: "Add to Home screen"
											}),
											" or",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: "Install app"
											}),
											"."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open Helix from the new home-screen icon so it runs full-screen." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											"Come back to this page and tap ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: "Prime this phone for offline"
											}),
											". That stores tickets, clients, and knowledge on the device."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Turn on Airplane mode. Re-open Helix from the home screen. You should still see the last queue, open a ticket, and draft a reply. Replies sit on the phone until you have signal again." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3",
									children: "If Chrome does not offer Install, the page is probably inside a preview frame. Publish first, then open the public address on the phone itself."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
							n: "03",
							title: "Windows — the desk as an app",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "There is no separate .exe to download. Chrome and Edge install Helix as a desktop app with its own window and taskbar icon — that is the Windows bonus." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "mt-3 list-decimal space-y-2 pl-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open Helix in Chrome or Edge on the PC." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Chrome: the install icon in the address bar, or Menu →",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "Save and share → Install Helix"
										}),
										"."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Edge: Menu → ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "Apps → Install this site as an app"
										}),
										"."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pin it to the taskbar. Launch it like any other Windows program." })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							n: "04",
							title: "What works offline vs what needs the network",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "size-4" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "size-4" }), "Works with no signal"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-2 space-y-1 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open the installed app" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Read the last ticket queue and threads" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Browse clients and knowledge articles" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Draft replies and new tickets (they queue)" })
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-4" }), "Needs a connection"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-2 space-y-1 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "First sign-in on a new device" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "WhatsApp and Facebook inbound webhooks" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Seeing another technician’s latest reply" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sending the queued work off the phone" })
										]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							n: "05",
							title: "WhatsApp, Facebook, and the browser",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Channels are connected on the desk under Channels. Point Meta’s WhatsApp Cloud API and Page webhooks at the URLs shown there. The phone app does not replace WhatsApp — inbound chats still become tickets on the desk, and you can work those tickets from the installed Android app." })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/login",
							children: ["Open the desk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Back to Helix"
						})
					})]
				})
			]
		})]
	});
}
function Step({ n, title, children, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-2xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
				children: [icon, n]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-lg font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children
			})
		]
	});
}
//#endregion
export { GetApp as component };
