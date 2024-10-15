const knex = require("../../db/db");
const bcrypt = require("bcrypt");

const verifyHashPassword = async (plainPassword, dbPassword) => {
  const isPasswordValid = await bcrypt.compare(plainPassword, dbPassword);
  return isPasswordValid;
};


module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userQuery = knex("users").where({ email });
      const user = await userQuery.first();
      if (user) {
        const isPasswordValid = await verifyHashPassword(password, user.password);
        

        if (!isPasswordValid) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const query = await knex("movies")
        .where({ user_id: user.id})

        return res.status(200).json({
          success: true,
          totalMoviesCount: query.length,
          message: "Login successful",
        });
      } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      next(error);
    }
  },
};
