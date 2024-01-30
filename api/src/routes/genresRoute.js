const { Router } = require("express");
const { genresHand } = require("../handlers/genresHand");

const genresRoute = Router();

genresRoute.get("/", genresHand);

module.exports = genresRoute;
