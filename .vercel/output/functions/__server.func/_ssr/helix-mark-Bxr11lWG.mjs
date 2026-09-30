import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cn } from "./utils-D8zjXuuU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/helix-mark-Bxr11lWG.js
var import_jsx_runtime = require_jsx_runtime();
function HelixMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": "true",
		className: cn("size-7", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				className: "fill-secondary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 7.5c4.2 2.8 7.8 2.8 12 0M10 24.5c4.2-2.8 7.8-2.8 12 0",
				className: "stroke-primary",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.5 10.5c3.2 2.1 5.8 2.1 9 0M11.5 21.5c3.2-2.1 5.8-2.1 9 0",
				className: "stroke-primary",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13 13.5c2.1 1.3 3.9 1.3 6 0M13 18.5c2.1-1.3 3.9-1.3 6 0",
				className: "stroke-primary",
				strokeWidth: "1.3",
				strokeLinecap: "round",
				opacity: "0.45"
			})
		]
	});
}
function HelixWordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] font-semibold tracking-tight",
			children: "Helix"
		})]
	});
}
//#endregion
export { HelixWordmark as t };
