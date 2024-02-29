const { Router } = require("express");
const { genresHand, newGenresHand } = require("../handlers/genresHand");

const genresRoute = Router();

genresRoute.get("/", genresHand);
genresRoute.post("/", newGenresHand);

module.exports = genresRoute;
