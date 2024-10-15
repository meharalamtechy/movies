const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex.transaction(async function (trx) {
    try {
      // Generate a salt and hash the password
      const saltRounds = 10;
      const password = "Hosting@123";
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert data into users table
      const [user] = await trx("users").insert([
        {
          email: "defaultuser@yopmail.com",
          password: hashedPassword,
          created_date: knex.fn.now(),
        },
      ]).returning('*');

      await trx.commit();
    } catch (error) {
      // Rollback transaction if any error occurs
      await trx.rollback();
      console.error("Error creating default user:", error);
    }
  });
};
