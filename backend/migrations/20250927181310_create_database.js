"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('acciones', (table) => {
            table.integer('pokemon_id').primary().notNullable();
            table.uuid('user_id').primary().notNullable();
            table.boolean('like_foto').defaultTo(false).notNullable();
            table.timestamp('creado_en').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('actualizado_en').defaultTo(knex.fn.now()).notNullable();
        });
        yield knex.schema.createTable('usuarios', (table) => {
            table.uuid('id_user').primary().defaultTo(knex.fn.uuid()).notNullable();
            table.string('user_email').notNullable();
            table.string('user_password').notNullable();
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('acciones');
        yield knex.schema.dropTable('usuarios');
    });
}
