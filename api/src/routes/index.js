const { Router } = require("express");

// Importar todos los routers;
const gamesRoute = require("./gamesRoute");
const genresRoute = require("./genresRoute");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", gamesRoute);
router.use("/genres", genresRoute);

module.exports = router;
