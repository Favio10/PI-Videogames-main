const { Router } = require("express");
const {
  getAllHand,
  getDetailHand,
  getNameHand,
  postNewHand,
} = require("../handlers/gamesHand");

const gamesRoute = Router();
gamesRoute.get("/?", getNameHand);

gamesRoute.get("/:id", getDetailHand);
gamesRoute.get("/", getAllHand);
gamesRoute.post("/", postNewHand);

module.exports = gamesRoute;
