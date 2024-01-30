const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { Genres } = require("../db");

const getAllCont = async () => {
  const response = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const dataApi = response.data;

  if (dataApi.results) {
    const genresArray = dataApi.results.map((genre) => genre.name);

    //const countGenres = await genres.findAndCountAll();
    //if (countGenres.count === 0) {
    const existGenres = await Genres.findAll();

    if (existGenres.length === 0) {
      for (const genreName of genresArray) {
        await Genres.create({ name: genreName });
      }
      console.log("generos guardados en la base de datos");
    } else {
      console.log("La base ya contiene generos");
    }
    return [genresArray];
  }
};

module.exports = { getAllCont };
