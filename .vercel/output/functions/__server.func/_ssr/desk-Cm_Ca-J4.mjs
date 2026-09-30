import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as searchDesk } from "./server-B0YXnW-G.mjs";
import { o as ticketRef, t as cn } from "./utils-D8zjXuuU.mjs";
import { t as Input } from "./input-DYiR5noz.mjs";
import { r as StatusPill } from "./status-pills-Cqe4F4kV.mjs";
import { E as BookOpen, T as Building2, _ as Inbox, a as Smartphone, c as Radio, g as LayoutDashboard, i as Ticket, m as Menu, p as MessageCircle, s as Search, w as ChartColumn } from "../_libs/lucide-react.mjs";
import { n as DialogContent, r as DialogTitle, t as Dialog } from "./dialog-Dgd69C-f.mjs";
import { m as Button, o as OfflineBar } from "./router-DU9zikjW.mjs";
import { n as WorkspaceGate, t as UserButton } from "./workspace-gate-C0YyTEEd.mjs";
import { t as HelixWordmark } from "./helix-mark-Bxr11lWG.mjs";
import { n as SheetContent, t as Sheet } from "./sheet-DnH4s8rc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-Cm_Ca-J4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommandSearch() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [clients, setClients] = (0, import_react.useState)([]);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const t = window.setTimeout(() => {
			searchDesk({ data: { q } }).then((r) => {
				setTickets(r.tickets);
				setClients(r.clients);
			});
		}, 160);
		return () => window.clearTimeout(t);
	}, [q, open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground hover:border-ring/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1 text-left",
				children: "Search tickets and clients"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] sm:inline",
				children: "⌘K"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "sr-only",
					children: "Search"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Find a ticket, company, or person",
						className: "border-0 bg-transparent focus-visible:ring-0"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-80 overflow-y-auto p-2",
					children: [
						tickets.length === 0 && clients.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-8 text-center text-sm text-muted-foreground",
							children: q ? "Nothing matches yet." : "Type to search this desk."
						}),
						tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-accent",
							onClick: () => {
								setOpen(false);
								navigate({
									to: "/desk/tickets/$ticketId",
									params: { ticketId: String(t.id) }
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: ticketRef(t.number)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm",
									children: t.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: t.status })
							]
						}, t.id)),
						clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-accent",
							onClick: () => {
								setOpen(false);
								navigate({
									to: "/desk/clients/$clientId",
									params: { clientId: String(c.id) }
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Client"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm",
									children: c.company
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: c.contactName
								})
							]
						}, c.id))
					]
				})
			]
		})
	})] });
}
var NAV = [
	{
		to: "/desk",
		label: "Home",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/desk/inbox",
		label: "Inbox",
		icon: Inbox,
		exact: false
	},
	{
		to: "/desk/tickets",
		label: "Tickets",
		icon: Ticket,
		exact: false
	},
	{
		to: "/desk/clients",
		label: "Clients",
		icon: Building2,
		exact: false
	},
	{
		to: "/desk/knowledge",
		label: "Knowledge",
		icon: BookOpen,
		exact: false
	},
	{
		to: "/desk/channels",
		label: "Channels",
		icon: Radio,
		exact: false
	},
	{
		to: "/desk/reports",
		label: "Reports",
		icon: ChartColumn,
		exact: false
	}
];
var MOBILE_NAV = [
	{
		to: "/desk",
		label: "Home",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/desk/inbox",
		label: "Inbox",
		icon: Inbox,
		exact: false
	},
	{
		to: "/desk/tickets",
		label: "Tickets",
		icon: Ticket,
		exact: false
	},
	{
		to: "/desk/clients",
		label: "Clients",
		icon: Building2,
		exact: false
	}
];
function NavLinks({ pathname, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-0.5",
		children: NAV.map((item) => {
			const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-2.5 rounded-lg px-3 text-sm transition-colors", active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
			}, item.to);
		})
	});
}
function DeskShell({ actor, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const company = actor.kind === "staff" ? actor.profile.company : actor.company;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-card md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-14 items-center px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/desk",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixWordmark, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate px-3 text-[11px] font-medium tracking-wide text-muted-foreground uppercase",
							children: company
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto px-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { pathname })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/get-app",
								className: "mb-1 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "Phone & offline"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/portal",
								className: "mb-3 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Client portal"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								className: "md:hidden",
								onClick: () => setOpen(true),
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSearch, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/get-app",
								className: "hidden h-9 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:text-foreground sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3.5" }), "Install"]
							}),
							actor.kind === "staff" && actor.profile.deskCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden font-mono text-[11px] text-muted-foreground lg:inline",
								children: ["Desk ", actor.profile.deskCode]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBar, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex min-h-0 flex-1 flex-col pb-16 md:pb-0",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden",
						children: MOBILE_NAV.map((item) => {
							const Icon = item.icon;
							const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-foreground" : "text-muted-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "flex flex-col p-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 items-center px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixWordmark, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto px-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
								pathname,
								onNavigate: () => setOpen(false)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/get-app",
									onClick: () => setOpen(false),
									className: "mb-1 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "Phone & offline"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/portal",
									onClick: () => setOpen(false),
									className: "mb-3 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Client portal"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
							]
						})
					]
				})
			})
		]
	});
}
function DeskLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceGate, {
		expect: "staff",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskShell, {
			actor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})
	});
}
//#endregion
export { DeskLayout as component };
