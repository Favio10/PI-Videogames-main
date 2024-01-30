const { Router } = require("express");
const {
  getAllHand,
  getDetailHand,
  getNameHand,
  postNewHand,
} = require("../handlers/gamesHand");

const gamesRoute = Router();
gamesRoute.get("/name?", getNameHand);
gamesRoute.get("/", getAllHand);
gamesRoute.get("/:id", getDetailHand);

gamesRoute.post("/", postNewHand);

module.exports = gamesRoute;
