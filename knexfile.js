// Update with your config settings.

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
		useNullAsDefault: true,
	},

	production: {
		client: "pg",
		connection: process.env.DATABASE_URL + "?ssl=true",

		migrations: {
			tableName: "knex_migrations",
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
		useNullAsDefault: true,
	},
};
