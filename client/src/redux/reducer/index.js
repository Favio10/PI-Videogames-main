import {
  GET_BY_ID,
  GET_BY_NAME,
  GET_GENRES,
  GET_VIDEOGAMES,
  CREATE_VIDEOGAME,
} from "../actions";

const initialState = {
  allVideoGames: [],
  videoGamesCopy: [],
  genres: [],
  characterReducer: {
    character: null,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideoGames: action.payload,
        videoGamesCopy: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allVideoGames: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        characterReducer: {
          ...state.characterReducer,
          character: action.payload,
        },
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        allVideoGames: [...state.allVideoGames, action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
