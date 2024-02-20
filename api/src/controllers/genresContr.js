const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { Genres } = require("../db");

const getAllCont = async () => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const dataApi = response.data;

    if (dataApi.results) {
      const genresArray = dataApi.results.map((genre) => ({
        id: genre.id,
        name: genre.name,
      }));
      // console.log(genresArray);
      const countGenres = await Genres.findAndCountAll();

      if (countGenres.count === 0) {
        const existGenres = await Genres.findAll();

        if (existGenres.length === 0) {
          for (const genreName of genresArray) {
            await Genres.create({ id: genreName.id, name: genreName.name });
          }
          console.log("generos guardados en la base de datos");
        } else {
          console.log("La base ya contiene generos");
        }
      }
      return [genresArray];
    }
  } catch (error) {
    console.error("Error al obtener datos desde la API:", error.message);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
module.exports = { getAllCont };
