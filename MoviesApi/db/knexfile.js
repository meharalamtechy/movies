require("dotenv").config({ path: "../.env" });

module.exports = {
  client: "pg",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },

  migrations: {
    directory: __dirname + "/migrations",
  },

  seeds: {
    directory: __dirname + "/seeds",
  },
};
