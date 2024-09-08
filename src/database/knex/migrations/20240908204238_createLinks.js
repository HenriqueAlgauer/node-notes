exports.up = async function (knex) {
    const exists = await knex.schema.hasTable("links");
    if (!exists) {
        return knex.schema.createTable("links", (table) => {
            table.increments("id");
            table.text("url").notNullable();

            table
                .integer("note_id")
                .references("id")
                .inTable("notes")
                .onDelete("CASCADE");
            table.timestamp("created_at").default(knex.fn.now());
        });
    }
}
exports.down = (knex) => knex.schema.dropTableIfExists("links");
