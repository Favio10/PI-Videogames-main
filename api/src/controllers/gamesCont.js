require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { Videogame, Genres } = require("../db");

// const infoClean = (array) => {
//   return array.map((arr) => {
//     const cleanedInfo = {
//       image: arr.background_image,
//       name: arr.name,
//       rating: arr.rating_top,
//     };
//     return cleanedInfo;
//   });
// };

const getAllCont = async () => {
  const infoDB = await Videogame.findAll();
  const response = (
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
  ).data;

  return response.results.map((game) => {
    const cleanGenres = game.genres.map((genre) => genre.name);
    const clean = {
      genres: cleanGenres,
      id: game.id,
      image: game.background_image,
      name: game.name,
      rating: game.rating,
    };

    return [...infoDB, clean];
  });
};

const getDetailCont = async (id, source) => {
  let gameDetail;

  if (source === "api") {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const data = response.data;
    if (!data || Object.keys(data).length === 0) {
      return "no se encontro una zara con ese ID en la API";
    }

    const {
      id: gameId,
      name,
      description,
      background_image: image,
      rating,
      platforms,
      released,
    } = data;

    // Puedes personalizar la lógica para mapear las plataformas según tus necesidades
    const cleanPlatforms = platforms.map((platform) => platform.platform.name);

    // Construir el objeto limpio con la información deseada
    gameDetail = {
      id: gameId,
      name,
      description: description,
      image,
      rating,
      plataforma: cleanPlatforms,
      released: released,
    };
  } else {
    const gameFromDB = await Videogame.findByPk(id);

    gameDetail = {
      id: gameFromDB.id,
      name: gameFromDB.name,
      description: gameFromDB.description,
      platform: gameFromDB.platform,
      image: gameFromDB.image,
      released: gameFromDB.released,
      rating: gameFromDB.rating,
    };
  }

  return gameDetail;
};

const getNameContr = async (name) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`
  );
  return response.data;
};

const postNewCont = async (
  name,
  description,
  platform,
  image,
  released,
  rating,
  genresArray
) => {
  const newGame = await Videogame.create({
    name,
    description,
    platform,
    image,
    released,
    rating,
  });

  if (genresArray && genresArray.length > 0) {
    const genres = await Genres.findAll({
      where: { name: genresArray },
    });

    await newGame.addGenres(genres);
  }

  return newGame;
};

module.exports = { getAllCont, getDetailCont, getNameContr, postNewCont };
