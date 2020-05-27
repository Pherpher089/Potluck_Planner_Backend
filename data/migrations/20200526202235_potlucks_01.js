exports.up = async function (knex) {
	await knex.schema.createTable("users", (tbl) => {
		tbl.increments("id");
		tbl.string("firstName", 256).notNullable();
		tbl.string("lastName", 256).notNullable();
		tbl.string("email").unique().notNullable();
		tbl.string("password").notNullable();
	});
	await knex.schema.createTable("potlucks", (tbl) => {
		tbl.increments("id");
		tbl.string("eventName", 256).notNullable().unique();
		tbl.string("eventDescription", 500).notNullable();
		tbl.integer("locationAddress").notNullable();
		tbl.string("locationStreet").notNullable();
		tbl.string("locationUnit");
		tbl.string("locationState").notNullable();
		tbl.string("locationCity").notNullable();
		tbl.string("locationCountry").notNullable();
		tbl.string("locationPostcode").notNullable();
	});

	await knex.schema.createTable("usersPotlucks", (tbl) => {
		tbl.increments("id");
		tbl.integer("userId").notNullable();
		tbl.integer("role").notNullable();
		tbl.integer("attendance");
		tbl.integer("potluckId")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("potlucks")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});

	await knex.schema.createTable("potluckRequirements", (tbl) => {
		tbl.increments("id");
		tbl.string("foodCategory", 256).notNullable();
		tbl.string("foodDescription", 256).notNullable();
		tbl.integer("servings").notNullable();
		tbl.integer("fufilled")
			.unsigned()
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		tbl.integer("potluckId")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("potlucks")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("users");
	await knex.schema.dropTableIfExists("potlucks");
	await knex.schema.dropTableIfExists("usersPotlucks");
	await knex.schema.dropTableIfExists("potluckRequirements");
};
