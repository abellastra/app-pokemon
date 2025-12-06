import { relations } from "drizzle-orm/relations";
import { usuarios, acciones } from "./schema";

export const accionesRelations = relations(acciones, ({one}) => ({
	usuario: one(usuarios, {
		fields: [acciones.userId],
		references: [usuarios.idUser]
	}),
}));

export const usuariosRelations = relations(usuarios, ({many}) => ({
	acciones: many(acciones),
}));