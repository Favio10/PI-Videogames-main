import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";

export function getVideogames() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/videogames/`);
      dispatch({
        type: GET_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching videogames:", error);
    }
    return;
  };
}

export function getByName(name) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/videogames/?name=${name}`
    );
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
}

export function getById(id) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: response.data,
    });
  };
}

export function createVideoGame(data) {
  return async function (dispatch) {
    try {
      const { name, description, platform, image, released, rating, genres } =
        data;
      const videogameData = {
        name,
        description,
        platform,
        image,
        released,
        rating,
        genres,
      };

      const response = await axios.post(
        `http://localhost:3001/videogames/`,
        videogameData
      );
      return dispatch({
        type: CREATE_VIDEOGAME,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error en la creacion: ", error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/genres`);
    try {
      console.log("Respuesta de getgenres: ", response.data);
      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error al obtener los generos: ", error);
    }
    return;
  };
}
