import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cn } from "./utils-D8zjXuuU.mjs";
import { E as BookOpen, a as Smartphone, i as Ticket, l as Plus, m as Menu, v as House } from "../_libs/lucide-react.mjs";
import { m as Button, o as OfflineBar } from "./router-DU9zikjW.mjs";
import { n as WorkspaceGate, t as UserButton } from "./workspace-gate-C0YyTEEd.mjs";
import { t as HelixWordmark } from "./helix-mark-Bxr11lWG.mjs";
import { n as SheetContent, t as Sheet } from "./sheet-DnH4s8rc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-DhDsB56k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/portal",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/portal/tickets",
		label: "Tickets",
		icon: Ticket,
		exact: false
	},
	{
		to: "/portal/knowledge",
		label: "Help",
		icon: BookOpen,
		exact: false
	}
];
function PortalShell({ actor, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const company = actor.kind === "staff" ? actor.profile.company : actor.company;
	const preview = actor.kind === "staff";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [
			preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-muted px-4 py-2 text-center text-xs text-muted-foreground",
				children: [
					"Previewing the client portal as ",
					company,
					".",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/desk",
						className: "text-foreground underline-offset-4 hover:underline",
						children: "Back to desk"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						className: "md:hidden",
						onClick: () => setOpen(true),
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/portal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixWordmark, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden truncate text-sm text-muted-foreground sm:inline",
						children: company
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "ml-4 hidden items-center gap-1 md:flex",
						children: NAV.map((item) => {
							const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-md px-3 py-1.5 text-sm", active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"),
								children: item.label
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/portal/new",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New ticket"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 pb-24 sm:px-6 md:pb-6",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden",
				children: [NAV.map((item) => {
					const Icon = item.icon;
					const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-foreground" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/get-app",
					className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]", pathname.startsWith("/get-app") ? "text-foreground" : "text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "Install"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixWordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mt-6 flex flex-col gap-1",
						children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: "rounded-lg px-3 py-2.5 text-sm hover:bg-accent",
							children: item.label
						}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/get-app",
							onClick: () => setOpen(false),
							className: "rounded-lg px-3 py-2.5 text-sm hover:bg-accent",
							children: "Phone & offline"
						})]
					})]
				})
			})
		]
	});
}
function PortalLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceGate, {
		expect: "client",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalShell, {
			actor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})
	});
}
//#endregion
export { PortalLayout as component };
