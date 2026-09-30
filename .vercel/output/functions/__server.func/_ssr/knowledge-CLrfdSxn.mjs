import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as listKnowledge, p as saveKnowledge } from "./server-B0YXnW-G.mjs";
import { t as Input } from "./input-DYiR5noz.mjs";
import { t as Label } from "./label-DuzO9Sit.mjs";
import { t as Textarea } from "./textarea-Bh8_GwiR.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { l as Plus } from "../_libs/lucide-react.mjs";
import { n as DialogContent, r as DialogTitle, t as Dialog } from "./dialog-Dgd69C-f.mjs";
import { m as Button } from "./router-DU9zikjW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-CLrfdSxn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KnowledgePage() {
	const kb = useQuery({
		queryKey: ["kb"],
		queryFn: () => listKnowledge()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(null);
	const article = kb.data?.find((a) => a.id === active) ?? kb.data?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col lg:flex-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "w-full shrink-0 overflow-y-auto border-b border-border lg:w-80 lg:border-r lg:border-b-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-sm font-semibold",
						children: "Knowledge"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Article"]
					})]
				}), kb.data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(a.id),
					className: `block w-full border-t border-border px-4 py-3 text-left ${article?.id === a.id ? "bg-accent" : "hover:bg-accent/40"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-wide text-muted-foreground uppercase",
						children: a.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm font-medium",
						children: a.title
					})]
				}, a.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: "min-w-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8",
				children: article ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted-foreground uppercase",
						children: article.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-tight italic",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: article.body
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No articles yet."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleDialog, {
				open,
				onOpenChange: setOpen
			})
		]
	});
}
function ArticleDialog({ open, onOpenChange }) {
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Access");
	const [excerpt, setExcerpt] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const save = useMutation({
		mutationFn: () => saveKnowledge({ data: {
			title,
			category,
			excerpt,
			body,
			published: true
		} }),
		onSuccess: () => {
			qc.invalidateQueries();
			onOpenChange(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New article" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 space-y-3",
			onSubmit: (e) => {
				e.preventDefault();
				save.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: category,
						onChange: (e) => setCategory(e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Excerpt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: excerpt,
						onChange: (e) => setExcerpt(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Body" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: body,
						onChange: (e) => setBody(e.target.value),
						required: true,
						rows: 6
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: save.isPending,
						children: "Publish"
					})
				})
			]
		})] })
	});
}
//#endregion
export { KnowledgePage as component };
