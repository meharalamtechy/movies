const knex = require("../../db/db");

module.exports = {
  getAllMovies: async (req, res, next) => {
    try {
      const { userId } = req.body;
      const query = knex("movies")
        .where({ user_id: userId || 1 })
        .orderBy("id", "desc");

      const countQuery = await query.clone();
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * limit;
      const moviesList = await query.limit(limit).offset(offset);

      res.status(200).json({
        success: true,
        moviesList,
        totalCount: countQuery.length,
      });
    } catch (error) {
      next(error);
    }
  },

  addMovie: async (req, res, next) => {
    try {
      const { userId, title, year, base64Image, movieId } = req.body;
      if (movieId) {
        await knex("movies")
          .update({ title, year, poster_url: base64Image })
          .where({ id: movieId });
      } else {
        await knex("movies")
          .insert({
            user_id: userId || 1,
            title,
            year,
            poster_url: base64Image,
          })
          .returning("id");
      }

      res.status(200).json({
        success: true,
        message: `Movie ${movieId ? "updated" : "added"} successfully`,
      });
    } catch (error) {
      next(error);
    }
  },

  editMovie: async (req, res, next) => {
    try {
      const { movieId } = req.body;
      const movieData = await knex("movies").select().where({ id: movieId });

      res.status(200).json({
        success: true,
        movieData,
        message: "Movie edited successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
