/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) =>
  knex.schema.createTable("pokemon", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("image").notNullable();
    table.bigInteger("pokeApiId").notNullable().unique().index();
    table.string("types").notNullable();
    table.integer("hp").notNullable();
    table.integer("attack").notNullable();
    table.integer("defense").notNullable();
    table.integer("specialAttack").notNullable();
    table.integer("specialDefense").notNullable();
    table.integer("speed").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => knex.schema.dropTableIfExists("pokemon");
