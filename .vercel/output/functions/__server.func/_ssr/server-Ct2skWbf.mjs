import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-BVrNBThr.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-D7ObDb6W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-Ct2skWbf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string") {
		const d = new Date(value);
		if (!Number.isNaN(d.getTime())) return d.toISOString();
		return value;
	}
	return (/* @__PURE__ */ new Date()).toISOString();
}
function asIsoOrNull(value) {
	if (value == null) return null;
	return asIso(value);
}
function deskCodeFrom(userId) {
	let h = 0;
	for (let i = 0; i < userId.length; i += 1) h = h * 33 + userId.charCodeAt(i) >>> 0;
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let code = "";
	for (let i = 0; i < 6; i += 1) {
		code += alphabet[h % 32];
		h = Math.floor(h / 32) + i * 17;
	}
	return code;
}
function slaHours(priority) {
	if (priority === "urgent") return 2;
	if (priority === "high") return 8;
	if (priority === "medium") return 24;
	return 72;
}
async function loadProfile(sql, userId) {
	const row = (await sql`select user_id, role, name, company, desk_code from profiles where user_id = ${userId}`)[0];
	if (!row) return null;
	return {
		userId: row.user_id,
		role: row.role,
		name: row.name,
		company: row.company,
		deskCode: row.desk_code
	};
}
async function resolveActor(sql, userId) {
	const profile = await loadProfile(sql, userId);
	if (!profile) return null;
	if (profile.role === "staff") return {
		kind: "staff",
		profile
	};
	const c = (await sql`
    select id, user_id, company from clients where portal_user_id = ${userId} limit 1
  `)[0];
	if (!c) return {
		kind: "client",
		profile,
		ownerId: userId,
		clientId: 0,
		company: profile.company
	};
	return {
		kind: "client",
		profile,
		ownerId: c.user_id,
		clientId: c.id,
		company: c.company
	};
}
function mapClient(row) {
	return {
		id: row.id,
		company: row.company,
		contactName: row.contact_name,
		email: row.email,
		phone: row.phone,
		portalUserId: row.portal_user_id,
		status: row.status,
		plan: row.plan,
		notes: row.notes,
		city: row.city,
		createdAt: asIso(row.created_at),
		openTickets: Number(row.open_tickets ?? 0)
	};
}
function mapTicket(row) {
	return {
		id: row.id,
		clientId: row.client_id,
		number: row.number,
		subject: row.subject,
		status: row.status,
		priority: row.priority,
		channel: row.channel,
		assignee: row.assignee,
		requesterName: row.requester_name,
		requesterEmail: row.requester_email,
		slaDueAt: asIsoOrNull(row.sla_due_at),
		firstResponseAt: asIsoOrNull(row.first_response_at),
		createdAt: asIso(row.created_at),
		updatedAt: asIso(row.updated_at),
		clientCompany: row.client_company ?? "",
		lastMessage: row.last_message ?? null
	};
}
async function nextTicketNumber(sql, userId) {
	return (await sql`
    insert into ticket_seq (user_id, last_number) values (${userId}, 1042)
    on conflict (user_id) do update set last_number = ticket_seq.last_number + 1
    returning last_number
  `)[0]?.last_number ?? 1042;
}
async function seedWorkspace(sql, userId, name, company) {
	const { seedDesk } = await import("./seed-DJJ1aett.mjs");
	await seedDesk(sql, {
		userId,
		name,
		company,
		deskCode: deskCodeFrom(userId),
		nextTicketNumber,
		slaHours
	});
}
var bootstrapInput = object({
	displayName: string().optional(),
	email: string().optional(),
	intent: _enum(["staff", "client"]).optional(),
	joinCode: string().optional(),
	company: string().optional()
});
var bootstrapDesk_createServerFn_handler = createServerRpc({
	id: "08849bb6b5157627ebb90bee8f2f0001240810cd5a09c068fba803e6abf6b868",
	name: "bootstrapDesk",
	filename: "src/lib/desk/server.ts"
}, (opts) => bootstrapDesk.__executeServer(opts));
var bootstrapDesk = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => bootstrapInput.parse(d ?? {})).handler(bootstrapDesk_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	let profile = await loadProfile(sql, context.userId);
	if (!profile) {
		const actorName = (data.displayName || "You").trim() || "You";
		if (data.intent === "client" && data.joinCode) {
			const owner = (await sql`
          select user_id, company from profiles where desk_code = ${data.joinCode.trim().toUpperCase()} and role = 'staff' limit 1
        `)[0];
			if (!owner) return {
				ok: false,
				error: "That desk code was not found."
			};
			const companyName = (data.company || actorName).trim();
			await sql`
          insert into profiles (user_id, role, name, company, desk_code)
          values (${context.userId}, 'client', ${actorName}, ${companyName}, '')
        `;
			await sql`
          insert into clients (user_id, company, contact_name, email, phone, portal_user_id, status, plan, notes, city)
          values (${owner.user_id}, ${companyName}, ${actorName}, ${data.email ?? ""}, '', ${context.userId}, 'active', 'managed', 'Joined via client portal.', '')
        `;
		} else {
			const companyName = (data.company || `${actorName.split(" ")[0]} IT`).trim();
			await seedWorkspace(sql, context.userId, actorName, companyName);
		}
		profile = await loadProfile(sql, context.userId);
	} else if (profile.role === "staff") {
		if (((await sql`select count(*)::int as n from clients where user_id = ${context.userId}`)[0]?.n ?? 0) === 0) await seedWorkspace(sql, context.userId, profile.name, profile.company);
	}
	return {
		ok: true,
		actor: await resolveActor(sql, context.userId)
	};
});
var getActor_createServerFn_handler = createServerRpc({
	id: "c94a2a65f77ec7df014e92d09dc59bbd766752aa92c0957ecf0f6b4a4504b9a4",
	name: "getActor",
	filename: "src/lib/desk/server.ts"
}, (opts) => getActor.__executeServer(opts));
var getActor = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getActor_createServerFn_handler, async ({ context }) => {
	return resolveActor(await getSql(), context.userId);
});
var ticketListInput = object({
	status: string().optional(),
	channel: string().optional(),
	priority: string().optional(),
	clientId: number().optional(),
	query: string().optional(),
	previewClientId: number().optional()
});
async function ticketsForOwner(sql, ownerId, filters) {
	return (await sql.query(`select t.id, t.client_id, t.number, t.subject, t.status, t.priority, t.channel, t.assignee,
            t.requester_name, t.requester_email, t.sla_due_at, t.first_response_at, t.created_at, t.updated_at,
            c.company as client_company,
            (select m.body from ticket_messages m where m.ticket_id = t.id order by m.created_at desc limit 1) as last_message
     from tickets t
     join clients c on c.id = t.client_id
     where t.user_id = $1
       and ($2::text is null or t.status = $2)
       and ($3::text is null or t.channel = $3)
       and ($4::text is null or t.priority = $4)
       and ($5::int is null or t.client_id = $5)
       and ($6::text is null or t.subject ilike '%' || $6 || '%' or c.company ilike '%' || $6 || '%' or t.requester_name ilike '%' || $6 || '%')
     order by t.updated_at desc
     limit 200`, [
		ownerId,
		filters.status || null,
		filters.channel || null,
		filters.priority || null,
		filters.clientId ?? null,
		filters.query?.trim() || null
	])).map(mapTicket);
}
var listTickets_createServerFn_handler = createServerRpc({
	id: "6f2c2ee382a7395bef4befcacd71a920504cb1d39c02b2c56c3282d0a0142a08",
	name: "listTickets",
	filename: "src/lib/desk/server.ts"
}, (opts) => listTickets.__executeServer(opts));
var listTickets = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => ticketListInput.parse(d ?? {})).handler(listTickets_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor) return [];
	if (actor.kind === "staff") return ticketsForOwner(sql, context.userId, data);
	if (!actor.clientId) return [];
	return ticketsForOwner(sql, actor.ownerId, {
		...data,
		clientId: actor.clientId
	});
});
var getTicket_createServerFn_handler = createServerRpc({
	id: "7c36ea322b43eaeaf8762780247c57489769d5b53c54b3322deb9ecf2f5737c5",
	name: "getTicket",
	filename: "src/lib/desk/server.ts"
}, (opts) => getTicket.__executeServer(opts));
var getTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => object({
	id: number(),
	previewClientId: number().optional()
}).parse(d)).handler(getTicket_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor) return null;
	const ownerId = actor.kind === "staff" ? context.userId : actor.ownerId;
	const row = (await sql`
      select t.id, t.client_id, t.number, t.subject, t.status, t.priority, t.channel, t.assignee,
             t.requester_name, t.requester_email, t.sla_due_at, t.first_response_at, t.created_at, t.updated_at,
             c.company as client_company
      from tickets t
      join clients c on c.id = t.client_id
      where t.id = ${data.id} and t.user_id = ${ownerId}
    `)[0];
	if (!row) return null;
	if (actor.kind === "client" && row.client_id !== actor.clientId) return null;
	const clientRow = (await sql`
      select c.*, (
        select count(*)::int from tickets t2
        where t2.client_id = c.id and t2.status in ('open','pending','waiting')
      ) as open_tickets
      from clients c where c.id = ${row.client_id} and c.user_id = ${ownerId}
    `)[0];
	if (!clientRow) return null;
	const messages = (await sql`
      select id, author_type, author_name, body, is_internal, channel, created_at
      from ticket_messages
      where ticket_id = ${data.id} and user_id = ${ownerId}
      order by created_at asc
    `).filter((m) => actor.kind === "staff" || !m.is_internal).map((m) => ({
		id: m.id,
		authorType: m.author_type,
		authorName: m.author_name,
		body: m.body,
		isInternal: m.is_internal,
		channel: m.channel,
		createdAt: asIso(m.created_at)
	}));
	return {
		...mapTicket({
			...row,
			last_message: messages.at(-1)?.body ?? null
		}),
		messages,
		client: mapClient(clientRow)
	};
});
var replyInput = object({
	ticketId: number(),
	body: string().min(1),
	isInternal: boolean().optional()
});
var replyTicket_createServerFn_handler = createServerRpc({
	id: "67ea0ccaee9fed73a387e5f63dcf90d52adf6471ab0e7a70978d28314f2b95a0",
	name: "replyTicket",
	filename: "src/lib/desk/server.ts"
}, (opts) => replyTicket.__executeServer(opts));
var replyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => replyInput.parse(d)).handler(replyTicket_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor) throw new Error("No workspace");
	const body = data.body.trim();
	if (!body) throw new Error("Message is empty");
	const ownerId = actor.kind === "staff" ? context.userId : actor.ownerId;
	const t = (await sql`
      select id, client_id, channel, first_response_at from tickets where id = ${data.ticketId} and user_id = ${ownerId}
    `)[0];
	if (!t) throw new Error("Ticket not found");
	if (actor.kind === "client" && t.client_id !== actor.clientId) throw new Error("Ticket not found");
	const isInternal = actor.kind === "staff" && Boolean(data.isInternal);
	const authorType = actor.kind === "staff" ? "agent" : "client";
	const authorName = actor.profile.name;
	await sql`
      insert into ticket_messages (user_id, ticket_id, author_type, author_name, body, is_internal, channel)
      values (${ownerId}, ${data.ticketId}, ${authorType}, ${authorName}, ${body}, ${isInternal}, ${t.channel})
    `;
	if (actor.kind === "staff" && !t.first_response_at && !isInternal) await sql`update tickets set first_response_at = now(), updated_at = now() where id = ${data.ticketId} and user_id = ${ownerId}`;
	else await sql`update tickets set updated_at = now() where id = ${data.ticketId} and user_id = ${ownerId}`;
	if (actor.kind === "client") await sql`update tickets set status = 'open', updated_at = now() where id = ${data.ticketId} and user_id = ${ownerId} and status in ('pending','resolved')`;
	return { ok: true };
});
var updateTicketInput = object({
	id: number(),
	status: string().optional(),
	priority: string().optional(),
	assignee: string().optional()
});
var updateTicket_createServerFn_handler = createServerRpc({
	id: "e36257cd7ea30cf88d514e2b860caf25a383e341bed2e2fac94a128a00e6ea5a",
	name: "updateTicket",
	filename: "src/lib/desk/server.ts"
}, (opts) => updateTicket.__executeServer(opts));
var updateTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => updateTicketInput.parse(d)).handler(updateTicket_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") throw new Error("Forbidden");
	const current = await sql`
      select id, status from tickets where id = ${data.id} and user_id = ${context.userId}
    `;
	if (!current[0]) throw new Error("Ticket not found");
	if (data.status) {
		await sql`update tickets set status = ${data.status}, updated_at = now() where id = ${data.id} and user_id = ${context.userId}`;
		if (data.status !== current[0].status) await sql`
          insert into ticket_messages (user_id, ticket_id, author_type, author_name, body, is_internal, channel)
          values (${context.userId}, ${data.id}, 'system', 'Helix', ${`Status set to ${data.status}.`}, false, 'portal')
        `;
	}
	if (data.priority) await sql`update tickets set priority = ${data.priority}, updated_at = now() where id = ${data.id} and user_id = ${context.userId}`;
	if (data.assignee != null) await sql`update tickets set assignee = ${data.assignee}, updated_at = now() where id = ${data.id} and user_id = ${context.userId}`;
	return { ok: true };
});
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
var createTicket_createServerFn_handler = createServerRpc({
	id: "42d7ea3e42e36b2a0e654afe7ac2fb28384595a9c2b21e0674f6ee331b0bcd93",
	name: "createTicket",
	filename: "src/lib/desk/server.ts"
}, (opts) => createTicket.__executeServer(opts));
var createTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => createTicketInput.parse(d)).handler(createTicket_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor) throw new Error("No workspace");
	const ownerId = actor.kind === "staff" ? context.userId : actor.ownerId;
	let clientId = actor.kind === "staff" ? data.clientId : actor.clientId;
	if (!clientId) clientId = (await sql`
        select id from clients where user_id = ${ownerId} order by id asc limit 1
      `)[0]?.id;
	if (!clientId) throw new Error("Pick a client");
	const client = (await sql`select id, contact_name, email, company from clients where id = ${clientId} and user_id = ${ownerId}`)[0];
	if (!client) throw new Error("Client not found");
	const number = await nextTicketNumber(sql, ownerId);
	const priority = data.priority ?? "medium";
	const channel = data.channel ?? "portal";
	const hours = slaHours(priority);
	const id = (await sql`
      insert into tickets (
        user_id, client_id, number, subject, status, priority, channel, assignee,
        requester_name, requester_email, sla_due_at
      ) values (
        ${ownerId}, ${clientId}, ${number}, ${data.subject.trim()}, 'open', ${priority}, ${channel},
        ${actor.kind === "staff" ? actor.profile.name : "Unassigned"},
        ${actor.kind === "client" ? actor.profile.name : client.contact_name}, ${client.email},
        now() + ${`${hours} hours`}::interval
      ) returning id
    `)[0].id;
	await sql`
      insert into ticket_messages (user_id, ticket_id, author_type, author_name, body, is_internal, channel)
      values (${ownerId}, ${id}, ${actor.kind === "staff" ? "agent" : "client"}, ${actor.profile.name}, ${data.body.trim()}, false, ${channel})
    `;
	return {
		id,
		number
	};
});
var listClients_createServerFn_handler = createServerRpc({
	id: "06ce4f4b01846cc276e17691c5f2700864ef3c0c0d9806bbaf720a379d969b0a",
	name: "listClients",
	filename: "src/lib/desk/server.ts"
}, (opts) => listClients.__executeServer(opts));
var listClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listClients_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") return [];
	return (await sql`
      select c.*, (
        select count(*)::int from tickets t
        where t.client_id = c.id and t.status in ('open','pending','waiting')
      ) as open_tickets
      from clients c
      where c.user_id = ${context.userId}
      order by c.company asc
    `).map(mapClient);
});
var getClient_createServerFn_handler = createServerRpc({
	id: "427048700fc85b915d36fb568d55d5e3d7cdb47ab45eee3ba05814180a5b7a3b",
	name: "getClient",
	filename: "src/lib/desk/server.ts"
}, (opts) => getClient.__executeServer(opts));
var getClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => object({ id: number() }).parse(d)).handler(getClient_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") return null;
	const row = (await sql`
      select c.*, (
        select count(*)::int from tickets t
        where t.client_id = c.id and t.status in ('open','pending','waiting')
      ) as open_tickets
      from clients c
      where c.id = ${data.id} and c.user_id = ${context.userId}
    `)[0];
	if (!row) return null;
	const tickets = await ticketsForOwner(sql, context.userId, { clientId: data.id });
	return {
		client: mapClient(row),
		tickets
	};
});
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
var saveClient_createServerFn_handler = createServerRpc({
	id: "285a50b7f1bc1f62c46b45f8945f2bfab8be5c618ec1d340a6c2d4826e60cffe",
	name: "saveClient",
	filename: "src/lib/desk/server.ts"
}, (opts) => saveClient.__executeServer(opts));
var saveClient = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => upsertClientInput.parse(d)).handler(saveClient_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") throw new Error("Forbidden");
	if (data.id) {
		await sql`
        update clients set
          company = ${data.company.trim()},
          contact_name = ${data.contactName.trim()},
          email = ${data.email ?? ""},
          phone = ${data.phone ?? ""},
          plan = ${data.plan ?? "managed"},
          city = ${data.city ?? ""},
          notes = ${data.notes ?? ""},
          status = ${data.status ?? "active"}
        where id = ${data.id} and user_id = ${context.userId}
      `;
		return { id: data.id };
	}
	return { id: (await sql`
      insert into clients (user_id, company, contact_name, email, phone, plan, city, notes, status)
      values (
        ${context.userId}, ${data.company.trim()}, ${data.contactName.trim()},
        ${data.email ?? ""}, ${data.phone ?? ""}, ${data.plan ?? "managed"},
        ${data.city ?? ""}, ${data.notes ?? ""}, ${data.status ?? "active"}
      ) returning id
    `)[0].id };
});
var listKnowledge_createServerFn_handler = createServerRpc({
	id: "8560e307ddeaf187e7f2b45f7a115aecff82df4d35b43842fab999f7387b6987",
	name: "listKnowledge",
	filename: "src/lib/desk/server.ts"
}, (opts) => listKnowledge.__executeServer(opts));
var listKnowledge = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listKnowledge_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor) return [];
	return (await sql`
      select id, title, category, excerpt, body, published, created_at
      from kb_articles
      where user_id = ${actor.kind === "staff" ? context.userId : actor.ownerId}
        and (${actor.kind !== "staff"} = false or published = true)
      order by category, title
    `).map((r) => ({
		id: r.id,
		title: r.title,
		category: r.category,
		excerpt: r.excerpt,
		body: r.body,
		published: r.published,
		createdAt: asIso(r.created_at)
	}));
});
var saveKbInput = object({
	id: number().optional(),
	title: string().min(1),
	category: string().min(1),
	excerpt: string().optional(),
	body: string().min(1),
	published: boolean().optional()
});
var saveKnowledge_createServerFn_handler = createServerRpc({
	id: "90bd1fdd79d0750b630dbd3377393e088b7eb23c94f03daf7e919304c49cc8a4",
	name: "saveKnowledge",
	filename: "src/lib/desk/server.ts"
}, (opts) => saveKnowledge.__executeServer(opts));
var saveKnowledge = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => saveKbInput.parse(d)).handler(saveKnowledge_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") throw new Error("Forbidden");
	if (data.id) {
		await sql`
        update kb_articles set title = ${data.title}, category = ${data.category},
          excerpt = ${data.excerpt ?? ""}, body = ${data.body}, published = ${data.published ?? true}
        where id = ${data.id} and user_id = ${context.userId}
      `;
		return { id: data.id };
	}
	return { id: (await sql`
      insert into kb_articles (user_id, title, category, excerpt, body, published)
      values (${context.userId}, ${data.title}, ${data.category}, ${data.excerpt ?? ""}, ${data.body}, ${data.published ?? true})
      returning id
    `)[0].id };
});
var listChannels_createServerFn_handler = createServerRpc({
	id: "7ef301764c8cb9a27d1744baa0e0d9aa0733258640b56555bfff3a9ed9d355f3",
	name: "listChannels",
	filename: "src/lib/desk/server.ts"
}, (opts) => listChannels.__executeServer(opts));
var listChannels = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listChannels_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") return [];
	return (await sql`select id, kind, status, handle, verify_token, created_at from channels where user_id = ${context.userId} order by kind`).map((r) => ({
		id: r.id,
		kind: r.kind,
		status: r.status,
		handle: r.handle,
		verifyToken: r.verify_token,
		createdAt: asIso(r.created_at)
	}));
});
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
var connectChannel_createServerFn_handler = createServerRpc({
	id: "b366b8fee0cab9e9ee83cb0ac8703f5611d9589a67956bad75e0abcfe2fb05ff",
	name: "connectChannel",
	filename: "src/lib/desk/server.ts"
}, (opts) => connectChannel.__executeServer(opts));
var connectChannel = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => connectChannelInput.parse(d)).handler(connectChannel_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") throw new Error("Forbidden");
	const token = `${data.kind}-${context.userId.slice(0, 8)}-${Math.random().toString(36).slice(2, 12)}`;
	await sql`
      insert into channels (user_id, kind, status, handle, verify_token)
      values (${context.userId}, ${data.kind}, 'connected', ${data.handle.trim()}, ${token})
      on conflict (user_id, kind) do update set status = 'connected', handle = excluded.handle
    `;
	return { verifyToken: (await sql`
      select verify_token from channels where user_id = ${context.userId} and kind = ${data.kind}
    `)[0]?.verify_token ?? token };
});
var simulateInput = object({
	kind: _enum([
		"whatsapp",
		"facebook",
		"email"
	]),
	clientId: number(),
	text: string().min(1)
});
var simulateInbound_createServerFn_handler = createServerRpc({
	id: "f143025cbfaf29af3b04b23cab07dc8047f596055e42b1aade9c4ef626b58ae1",
	name: "simulateInbound",
	filename: "src/lib/desk/server.ts"
}, (opts) => simulateInbound.__executeServer(opts));
var simulateInbound = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => simulateInput.parse(d)).handler(simulateInbound_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") throw new Error("Forbidden");
	const client = (await sql`
      select id, contact_name, email, company from clients where id = ${data.clientId} and user_id = ${context.userId}
    `)[0];
	if (!client) throw new Error("Client not found");
	const subject = data.kind === "facebook" ? `Facebook message from ${client.company}` : data.text.slice(0, 72);
	const number = await nextTicketNumber(sql, context.userId);
	const id = (await sql`
      insert into tickets (
        user_id, client_id, number, subject, status, priority, channel, assignee,
        requester_name, requester_email, sla_due_at
      ) values (
        ${context.userId}, ${client.id}, ${number}, ${subject}, 'open', 'high', ${data.kind}, 'Unassigned',
        ${client.contact_name}, ${client.email}, now() + interval '8 hours'
      ) returning id
    `)[0].id;
	await sql`
      insert into ticket_messages (user_id, ticket_id, author_type, author_name, body, is_internal, channel)
      values (${context.userId}, ${id}, 'channel', ${client.contact_name}, ${data.text.trim()}, false, ${data.kind})
    `;
	return {
		id,
		number
	};
});
var getDeskStats_createServerFn_handler = createServerRpc({
	id: "3f23027ccc6f3d480079598ae205d58537e017ac29e0760775d099eba917d348",
	name: "getDeskStats",
	filename: "src/lib/desk/server.ts"
}, (opts) => getDeskStats.__executeServer(opts));
var getDeskStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDeskStats_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	const empty = {
		open: 0,
		pending: 0,
		overdue: 0,
		resolvedToday: 0,
		clients: 0,
		byChannel: [],
		byStatus: [],
		byPriority: []
	};
	if (!actor || actor.kind !== "staff") return empty;
	const uid = context.userId;
	const open = await sql`select count(*)::int as n from tickets where user_id = ${uid} and status = 'open'`;
	const pending = await sql`select count(*)::int as n from tickets where user_id = ${uid} and status in ('pending','waiting')`;
	const overdue = await sql`
      select count(*)::int as n from tickets
      where user_id = ${uid} and status in ('open','pending','waiting') and sla_due_at < now()
    `;
	const resolvedToday = await sql`
      select count(*)::int as n from tickets
      where user_id = ${uid} and status in ('resolved','closed') and updated_at::date = now()::date
    `;
	const clients = await sql`select count(*)::int as n from clients where user_id = ${uid}`;
	const byChannel = await sql`
      select channel, count(*)::int as count from tickets where user_id = ${uid} group by channel order by count desc
    `;
	const byStatus = await sql`
      select status, count(*)::int as count from tickets where user_id = ${uid} group by status
    `;
	const byPriority = await sql`
      select priority, count(*)::int as count from tickets where user_id = ${uid} group by priority
    `;
	return {
		open: open[0]?.n ?? 0,
		pending: pending[0]?.n ?? 0,
		overdue: overdue[0]?.n ?? 0,
		resolvedToday: resolvedToday[0]?.n ?? 0,
		clients: clients[0]?.n ?? 0,
		byChannel,
		byStatus,
		byPriority
	};
});
var searchDesk_createServerFn_handler = createServerRpc({
	id: "2b46accd43cc37d1c428ef7846df2cca7a64620eb945d6410f4c687760514d41",
	name: "searchDesk",
	filename: "src/lib/desk/server.ts"
}, (opts) => searchDesk.__executeServer(opts));
var searchDesk = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => object({ q: string() }).parse(d)).handler(searchDesk_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const actor = await resolveActor(sql, context.userId);
	if (!actor || actor.kind !== "staff") return {
		tickets: [],
		clients: []
	};
	const q = data.q.trim();
	if (!q) return {
		tickets: [],
		clients: []
	};
	const tickets = await ticketsForOwner(sql, context.userId, { query: q });
	const clients = await sql`
      select c.*, (
        select count(*)::int from tickets t
        where t.client_id = c.id and t.status in ('open','pending','waiting')
      ) as open_tickets
      from clients c
      where c.user_id = ${context.userId}
        and (c.company ilike '%' || ${q} || '%' or c.contact_name ilike '%' || ${q} || '%' or c.email ilike '%' || ${q} || '%')
      order by c.company
      limit 12
    `;
	return {
		tickets: tickets.slice(0, 12),
		clients: clients.map(mapClient)
	};
});
//#endregion
export { bootstrapDesk_createServerFn_handler, connectChannel_createServerFn_handler, createTicket_createServerFn_handler, getActor_createServerFn_handler, getClient_createServerFn_handler, getDeskStats_createServerFn_handler, getTicket_createServerFn_handler, listChannels_createServerFn_handler, listClients_createServerFn_handler, listKnowledge_createServerFn_handler, listTickets_createServerFn_handler, replyTicket_createServerFn_handler, saveClient_createServerFn_handler, saveKnowledge_createServerFn_handler, searchDesk_createServerFn_handler, simulateInbound_createServerFn_handler, updateTicket_createServerFn_handler };
