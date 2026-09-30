import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-D8zjXuuU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-pills-Cqe4F4kV.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { tone: {
		muted: "bg-muted text-muted-foreground",
		open: "bg-open/15 text-open",
		pending: "bg-pending/15 text-pending",
		waiting: "bg-waiting/15 text-waiting",
		resolved: "bg-resolved/15 text-resolved",
		closed: "bg-closed/15 text-closed",
		urgent: "bg-urgent/15 text-urgent",
		high: "bg-high/15 text-high",
		medium: "bg-medium/15 text-medium",
		low: "bg-low/15 text-low",
		whatsapp: "bg-whatsapp/15 text-whatsapp",
		facebook: "bg-facebook/15 text-facebook",
		email: "bg-email/15 text-email",
		web: "bg-web/15 text-web",
		portal: "bg-portal/15 text-portal"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
var statusTone = {
	open: "open",
	pending: "pending",
	waiting: "waiting",
	resolved: "resolved",
	closed: "closed"
};
var priorityTone = {
	low: "low",
	medium: "medium",
	high: "high",
	urgent: "urgent"
};
var channelTone = {
	web: "web",
	portal: "portal",
	email: "email",
	whatsapp: "whatsapp",
	facebook: "facebook"
};
var channelLabel = {
	web: "Web",
	portal: "Portal",
	email: "Email",
	whatsapp: "WhatsApp",
	facebook: "Facebook"
};
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: statusTone[status],
		children: status
	});
}
function PriorityPill({ priority }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: priorityTone[priority],
		children: priority
	});
}
function ChannelPill({ channel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: channelTone[channel],
		children: channelLabel[channel]
	});
}
//#endregion
export { PriorityPill as n, StatusPill as r, ChannelPill as t };
