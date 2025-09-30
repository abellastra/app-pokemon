import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('usuarios', (table) => {
        table.string('user_name', 50).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('usuarios', (table) => {
        table.dropColumn('user_name');
    });
}

