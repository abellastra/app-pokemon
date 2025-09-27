import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('acciones', (table) => {
        table.integer('pokemon_id').primary().notNullable();
        table.uuid('user_id').primary().notNullable();
        table.boolean('like_foto').defaultTo(false).notNullable();
        table.timestamp('creado_en').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('actualizado_en').defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable('usuarios', (table) => {
        table.uuid('id_user').primary().defaultTo(knex.fn.uuid()).notNullable();
        table.string('user_email').notNullable();
        table.string('user_password').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('acciones');
    await knex.schema.dropTable('usuarios');
}

