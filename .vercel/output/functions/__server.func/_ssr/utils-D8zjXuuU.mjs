import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-D8zjXuuU.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "H";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function formatRelative(iso) {
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return "";
	const diff = Date.now() - then;
	const min = Math.round(diff / 6e4);
	if (min < 1) return "just now";
	if (min < 60) return `${min}m ago`;
	const hr = Math.round(min / 60);
	if (hr < 24) return `${hr}h ago`;
	const day = Math.round(hr / 24);
	if (day < 7) return `${day}d ago`;
	return new Date(iso).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
}
function formatWhen(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function slaLabel(iso, status) {
	if (!iso || status === "resolved" || status === "closed") return null;
	const due = new Date(iso).getTime();
	const mins = Math.round((due - Date.now()) / 6e4);
	if (mins < 0) return {
		kind: "overdue",
		text: `${Math.abs(mins) < 60 ? `${Math.abs(mins)}m` : `${Math.round(Math.abs(mins) / 60)}h`} overdue`
	};
	if (mins < 60) return {
		kind: "soon",
		text: `${mins}m left`
	};
	const hours = Math.round(mins / 60);
	if (hours < 48) return {
		kind: "ok",
		text: `${hours}h left`
	};
	return {
		kind: "ok",
		text: `${Math.round(hours / 24)}d left`
	};
}
function ticketRef(n) {
	return `HX-${String(n).padStart(4, "0")}`;
}
//#endregion
export { slaLabel as a, initials as i, formatRelative as n, ticketRef as o, formatWhen as r, cn as t };
