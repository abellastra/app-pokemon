import { pgTable, unique, uuid, varchar, foreignKey, primaryKey, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const usuarios = pgTable("usuarios", {
	idUser: uuid("id_user").defaultRandom().primaryKey().notNull(),
	userEmail: varchar("user_email", { length: 255 }).notNull(),
	userPassword: varchar("user_password", { length: 255 }).notNull(),
	userName: varchar("user_name", { length: 100 }).notNull(),
}, (table) => [
	unique("usuarios_user_email_unique").on(table.userEmail),
]);

export const acciones = pgTable("acciones", {
	pokemonId: integer("pokemon_id").notNull(),
	userId: uuid("user_id").notNull(),
	likeFoto: boolean("like_foto").default(false),
	creadoEn: timestamp("creado_en", { mode: 'string' }).defaultNow(),
	actualizadoEn: timestamp("actualizado_en", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [usuarios.idUser],
			name: "acciones_user_id_usuarios_id_user_fk"
		}),
	primaryKey({ columns: [table.pokemonId, table.userId], name: "acciones_pokemon_id_user_id_pk"}),
]);
