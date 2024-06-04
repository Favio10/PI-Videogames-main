require("dotenv").config();
const axios = require("axios");
//const API_KEY = process.env.API_KEY;
const API_KEY = "e31c791198bb47658c8b09f490c32750";
const { Videogame, Genres } = require("../db");

// contr todos los videogames (con lista asociada)
const getAllCont = async () => {
  const infoDB = await Videogame.findAll({
    include: [
      {
        model: Genres,
      },
    ],
  });

  const response = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`
    )
  ).data;

  const apiGames = response.results.map((game) => {
    const cleanGenres = game.genres.map((genre) => genre.name);
    return {
      genres: cleanGenres,
      id: game.id,
      image: game.background_image,
      name: game.name,
      rating: game.rating,
      created: false,
    };
  });

  // filtro los name del Json de genres
  const transformedDB = infoDB.map((game) => {
    const cleanGenres = game.genres.map((genre) => genre.name);
    return {
      ...game.toJSON(),
      genres: cleanGenres,
    };
  });

  // aca combino la información de la base de datos y la API
  const combinedGames =
    transformedDB.length !== 0 ? [...transformedDB, ...apiGames] : apiGames;

  return combinedGames;
};

// cont para cada detail

const getDetailCont = async (id, source) => {
  let gameDetail;

  if (source === "api") {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const data = response.data;
    if (!data || Object.keys(data).length === 0) {
      return "no se encontro un videogame con ese ID en la API";
    }

    const {
      id: gameId,
      name,
      description_raw,
      background_image: image,
      rating,
      platforms,
      released,
      genres,
    } = data;

    const genreList = genres.map((genre) => genre.name).join(", ");

    // incluyo esto por que platforms vienen en array
    const cleanPlatforms = platforms
      .map((platform) => platform.platform.name)
      .join(", ");

    gameDetail = {
      id: gameId,
      name,
      description: description_raw,
      image,
      rating,
      plataforma: cleanPlatforms,
      released: released,
      genres: genreList,
    };
  } else {
    const gameFromDB = await Videogame.findByPk(id, {
      include: [
        {
          model: Genres,
        },
      ],
    });

    // limpio la info que traigo de la tabla
    const genreNames = gameFromDB.genres.map((genre) => genre.name).join(", ");

    gameDetail = {
      id: gameFromDB.id,
      name: gameFromDB.name,
      description: gameFromDB.description,
      platform: gameFromDB.platform,
      image: gameFromDB.image,
      released: gameFromDB.released,
      rating: gameFromDB.rating,
      genres: genreNames,
    };
  }
  return gameDetail;
};

// cont para filtro por name
const getNameContr = async (name) => {
  try {
    const apiResponse = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`
    );

    const videogameApi = apiResponse.data.results.map((game) => {
      const cleanGenres = game.genres.map((genre) => genre.name);

      const clean = {
        genres: cleanGenres,
        id: game.id,
        image: game.background_image,
        name: game.name,
        rating: game.rating,
        created: false,
      };
      return clean;
    });

    const videogameDB = await Videogame.findAll({ where: { name: name } });

    if (videogameApi.length > 0 || videogameDB.length > 0) {
      if (videogameDB.length > 0) {
        return [...videogameApi, ...videogameDB];
      } else {
        return [...videogameApi];
      }
    }

    return [];
  } catch (error) {
    console.log("Error al obtener datos: ", error);
    throw error;
  }
};

// contr para crear un videogame
const postNewCont = async (
  name,
  description,
  platform,
  image,
  released,
  rating,
  genres
) => {
  const newGame = await Videogame.create({
    name,
    description,
    platform,
    image,
    released,
    rating,
    genres,
  });

  if (genres && genres.length > 0) {
    const genresTotal = await Genres.findAll({
      where: { id: genres },
    });

    await newGame.addGenres(genresTotal);
  }

  return newGame;
};

module.exports = { getAllCont, getDetailCont, getNameContr, postNewCont };
