exports.up = async function (knex) {
    const exists = await knex.schema.hasTable("users");
    if (!exists) {
        return knex.schema.createTable("users", (table) => {
            table.increments("id");
            table.text("name");
            table.text("email");
            table.text("password");
            table.text("avatar").nullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
    }
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
