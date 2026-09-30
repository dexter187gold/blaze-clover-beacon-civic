import { r as __exportAll } from "../_runtime.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll$1 } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-BVrNBThr.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-B0YXnW-G.js
var server_B0YXnW_G_exports = /* @__PURE__ */ __exportAll({
	_: () => updateTicket,
	a: () => getDeskStats,
	c: () => listClients,
	d: () => replyTicket,
	f: () => saveClient,
	g: () => simulateInbound,
	h: () => server_exports,
	i: () => getClient,
	l: () => listKnowledge,
	m: () => searchDesk,
	n: () => connectChannel,
	o: () => getTicket,
	p: () => saveKnowledge,
	r: () => createTicket,
	s: () => listChannels,
	t: () => bootstrapDesk,
	u: () => listTickets
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var server_exports = /* @__PURE__ */ __exportAll$1({
	bootstrapDesk: () => bootstrapDesk,
	connectChannel: () => connectChannel,
	createTicket: () => createTicket,
	getClient: () => getClient,
	getDeskStats: () => getDeskStats,
	getTicket: () => getTicket,
	listChannels: () => listChannels,
	listClients: () => listClients,
	listKnowledge: () => listKnowledge,
	listTickets: () => listTickets,
	replyTicket: () => replyTicket,
	saveClient: () => saveClient,
	saveKnowledge: () => saveKnowledge,
	searchDesk: () => searchDesk,
	simulateInbound: () => simulateInbound,
	updateTicket: () => updateTicket
});
var bootstrapInput = object({
	displayName: string().optional(),
	email: string().optional(),
	intent: _enum(["staff", "client"]).optional(),
	joinCode: string().optional(),
	company: string().optional()
});
var bootstrapDesk = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => bootstrapInput.parse(d ?? {})).handler(createSsrRpc("08849bb6b5157627ebb90bee8f2f0001240810cd5a09c068fba803e6abf6b868"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("c94a2a65f77ec7df014e92d09dc59bbd766752aa92c0957ecf0f6b4a4504b9a4"));
var ticketListInput = object({
	status: string().optional(),
	channel: string().optional(),
	priority: string().optional(),
	clientId: number().optional(),
	query: string().optional(),
	previewClientId: number().optional()
});
var listTickets = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => ticketListInput.parse(d ?? {})).handler(createSsrRpc("6f2c2ee382a7395bef4befcacd71a920504cb1d39c02b2c56c3282d0a0142a08"));
var getTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => object({
	id: number(),
	previewClientId: number().optional()
}).parse(d)).handler(createSsrRpc("7c36ea322b43eaeaf8762780247c57489769d5b53c54b3322deb9ecf2f5737c5"));
var replyInput = object({
	ticketId: number(),
	body: string().min(1),
	isInternal: boolean().optional()
});
var replyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => replyInput.parse(d)).handler(createSsrRpc("67ea0ccaee9fed73a387e5f63dcf90d52adf6471ab0e7a70978d28314f2b95a0"));
var updateTicketInput = object({
	id: number(),
	status: string().optional(),
	priority: string().optional(),
	assignee: string().optional()
});
var updateTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => updateTicketInput.parse(d)).handler(createSsrRpc("e36257cd7ea30cf88d514e2b860caf25a383e341bed2e2fac94a128a00e6ea5a"));
var createTicketInput = object({
	clientId: number().optional(),
	subject: string().min(3),
	body: string().min(1),
	priority: _enum([
		"low",
		"medium",
		"high",
		"urgent"
	]).optional(),
	channel: _enum([
		"web",
		"portal",
		"email",
		"whatsapp",
		"facebook"
	]).optional()
});
var createTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => createTicketInput.parse(d)).handler(createSsrRpc("42d7ea3e42e36b2a0e654afe7ac2fb28384595a9c2b21e0674f6ee331b0bcd93"));
var listClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("06ce4f4b01846cc276e17691c5f2700864ef3c0c0d9806bbaf720a379d969b0a"));
var getClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => object({ id: number() }).parse(d)).handler(createSsrRpc("427048700fc85b915d36fb568d55d5e3d7cdb47ab45eee3ba05814180a5b7a3b"));
var upsertClientInput = object({
	id: number().optional(),
	company: string().min(1),
	contactName: string().min(1),
	email: string().optional(),
	phone: string().optional(),
	plan: string().optional(),
	city: string().optional(),
	notes: string().optional(),
	status: string().optional()
});
var saveClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => upsertClientInput.parse(d)).handler(createSsrRpc("285a50b7f1bc1f62c46b45f8945f2bfab8be5c618ec1d340a6c2d4826e60cffe"));
var listKnowledge = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8560e307ddeaf187e7f2b45f7a115aecff82df4d35b43842fab999f7387b6987"));
var saveKbInput = object({
	id: number().optional(),
	title: string().min(1),
	category: string().min(1),
	excerpt: string().optional(),
	body: string().min(1),
	published: boolean().optional()
});
var saveKnowledge = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => saveKbInput.parse(d)).handler(createSsrRpc("90bd1fdd79d0750b630dbd3377393e088b7eb23c94f03daf7e919304c49cc8a4"));
var listChannels = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7ef301764c8cb9a27d1744baa0e0d9aa0733258640b56555bfff3a9ed9d355f3"));
var connectChannelInput = object({
	kind: _enum([
		"web",
		"portal",
		"email",
		"whatsapp",
		"facebook"
	]),
	handle: string().min(1)
});
var connectChannel = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => connectChannelInput.parse(d)).handler(createSsrRpc("b366b8fee0cab9e9ee83cb0ac8703f5611d9589a67956bad75e0abcfe2fb05ff"));
var simulateInput = object({
	kind: _enum([
		"whatsapp",
		"facebook",
		"email"
	]),
	clientId: number(),
	text: string().min(1)
});
var simulateInbound = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => simulateInput.parse(d)).handler(createSsrRpc("f143025cbfaf29af3b04b23cab07dc8047f596055e42b1aade9c4ef626b58ae1"));
var getDeskStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3f23027ccc6f3d480079598ae205d58537e017ac29e0760775d099eba917d348"));
var searchDesk = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => object({ q: string() }).parse(d)).handler(createSsrRpc("2b46accd43cc37d1c428ef7846df2cca7a64620eb945d6410f4c687760514d41"));
//#endregion
export { updateTicket as _, getDeskStats as a, listClients as c, replyTicket as d, saveClient as f, simulateInbound as g, server_B0YXnW_G_exports as h, getClient as i, listKnowledge as l, searchDesk as m, connectChannel as n, getTicket as o, saveKnowledge as p, createTicket as r, listChannels as s, bootstrapDesk as t, listTickets as u };
