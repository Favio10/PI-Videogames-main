require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { Videogame, Genres } = require("../db");

// const getAllCont = async () => {
//   const infoDB = await Videogame.findAll();
//   const response = (
//     await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`
//     )
//   ).data;

//   return response.results.map((game) => {
//     const cleanGenres = game.genres.map((genre) => genre.name);
//     const clean = {
//       genres: cleanGenres,
//       id: game.id,
//       image: game.background_image,
//       name: game.name,
//       rating: game.rating,
//       created: false,
//     };

//     if (infoDB.length !== 0) {
//       return [...infoDB, ...clean];
//     } else {
//       return [clean];
//     }
//   });
// };

const getAllCont = async () => {
  // Obtener información de la base de datos
  const infoDB = await Videogame.findAll();

  // Obtener información de la API Rawg
  const response = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`
    )
  ).data;

  // Mapear los resultados de la API
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

  // Combinar la información de la base de datos y la API
  const combinedGames =
    infoDB.length !== 0 ? [...infoDB, ...apiGames] : apiGames;

  return combinedGames;
};

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

    // Puedes personalizar la lógica para mapear las plataformas según tus necesidades
    const cleanPlatforms = platforms
      .map((platform) => platform.platform.name)
      .join(", ");

    // Construir el objeto limpio con la información deseada
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
    genresArray,
  });

  if (genresArray && genresArray.length > 0) {
    const genres = await Genres.findAll({
      where: { name: genresArray },
    });

    await newGame.addGenres(genres);
  }
  //await newGame.addGenres(genres);

  return newGame;
};

module.exports = { getAllCont, getDetailCont, getNameContr, postNewCont };
