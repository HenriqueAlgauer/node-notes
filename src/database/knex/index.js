const config = require("../../../knexfile");
const knex = require("knex");

const environment = process.env.NODE_ENV || "production";
const connection = knex(config[environment]);

module.exports = connection;
