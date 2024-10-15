var express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboard");

router.post("/getAllMovies", dashboardController.getAllMovies);
router.post("/add-movie", dashboardController.addMovie);
router.post("/edit-movie", dashboardController.editMovie);

module.exports = router;
