import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card.component";
import "./cards.styles.css";
import { useEffect, useState } from "react";
import { getGenres } from "../../redux/actions";

function Cards({ allVideoGames }) {
  const videoGamesList = allVideoGames;
  const cardsPorPag = 15;
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // manejo de pagina actual
  const [pagActual, setPagActual] = useState(1);
  // almacena la lista ordenada y filtrada
  const [listOrdVideogame, setListOrdVideogame] = useState([]);
  // almacena el criterio de orden para los nombres
  const [selectOrderName, setSelectOrderName] = useState("default");
  // almacena el criterio de orden para el rating
  const [selectOrderRating, setSelectOrderRating] = useState("default");
  // almacena el criterio de orden para el origen
  const [origenVideogame, setOrigenVideogame] = useState("all");
  // almacena la lista de genero seleccionada por el usuario
  const [selectGenre, setSelectGenre] = useState("all");

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    // Cargar el estado desde localStorage al montar el componente
    const savedState = JSON.parse(localStorage.getItem("cardsState"));

    if (savedState) {
      setSelectOrderName(savedState.selectOrderName || "default");
      setSelectOrderRating(savedState.selectOrderRating || "default");
      setOrigenVideogame(savedState.origenVideogame || "all");
      setSelectGenre(savedState.selectGenre || "all");
      setPagActual(savedState.pagActual || 1);
    }
  }, []);

  useEffect(() => {
    // guardar estado al salir de vista
    const currentState = {
      selectOrderName,
      selectOrderRating,
      origenVideogame,
      selectGenre,
      pagActual,
    };

    localStorage.setItem("cardsState", JSON.stringify(currentState));
  }, [
    selectOrderName,
    selectOrderRating,
    origenVideogame,
    selectGenre,
    pagActual,
  ]);

  useEffect(() => {
    setListOrdVideogame((prevList) => {
      let filteredList = [...videoGamesList];
      //console.log("Este es el filtered list", filteredList);

      // filtro por name
      switch (selectOrderName) {
        case "nombreAsc":
          //console.log("Sorting by Nombre Asc");
          filteredList = filteredList
            .filter((videoGame) => videoGame.name)
            .sort((a, b) =>
              a.name.localeCompare(b.name, undefined, { undefined: "base" })
            );
          break;
        case "nombreDesc":
          //console.log("Sorting by Nombre Desc");
          filteredList = filteredList
            .filter((videoGame) => videoGame.name)
            .sort((a, b) =>
              b.name.localeCompare(a.name, undefined, { undefined: "base" })
            );
          break;
        default:
          break;
      }

      //filtro por origen

      if (origenVideogame === "database") {
        filteredList = filteredList.filter(
          (videoGame) => videoGame.created === true
        );
      } else if (origenVideogame === "api") {
        filteredList = filteredList.filter(
          (videoGame) => videoGame.created === false
        );
      }

      // filtro por genero

      if (selectGenre !== "all") {
        filteredList = filteredList.filter(
          (videoGame) =>
            videoGame.genres && videoGame.genres.includes(selectGenre)
        );
      }

      // ordenamiento por rating

      switch (selectOrderRating) {
        case "ratingAsc":
          filteredList.sort(
            (a, b) => filtroRating(a.rating) - filtroRating(b.rating)
          );
          break;
        case "ratingDesc":
          filteredList.sort(
            (a, b) => filtroRating(b.rating) - filtroRating(a.rating)
          );
          break;
        default:
          break;
      }

      return filteredList;
    });
  }, [
    videoGamesList,
    selectOrderName,
    selectOrderRating,
    origenVideogame,
    selectGenre,
    pagActual,
  ]);

  const handleCreatedFilter = (event) => {
    setOrigenVideogame(event.target.value);
  };

  const handleGenreFilter = (event) => {
    setSelectGenre(event.target.value);
  };

  const handleSortName = (event) => {
    setSelectOrderName(event.target.value);
    setSelectOrderRating("default");
  };

  const handleSortRating = (event) => {
    setSelectOrderRating(event.target.value);
  };

  const filtroRating = (ratingData) => {
    if (typeof ratingData === "string") {
      const ratingMaxMin = ratingData.split(" - ");
      const ratingMinimo = parseInt(ratingMaxMin[0]);
      return ratingMinimo;
    } else if (typeof ratingData === "number") {
      return ratingData;
    }
    return 0;
  };

  const numPrimCard = pagActual * cardsPorPag;
  const numUltCard = numPrimCard - cardsPorPag;
  const cardActual = listOrdVideogame.slice(numUltCard, numPrimCard);

  const totalPag = Math.ceil(listOrdVideogame.length / cardsPorPag);

  const paginate = (pageNumber) => setPagActual(pageNumber);

  const genresArray = genres.length > 0 ? genres[0] : [];

  return (
    <div className="cards-container">
      <div className="all-select">
        <div className="box-filter">
          <h3 className="ordenCard"> Name:</h3>
          <select
            value={selectOrderName}
            onChange={handleSortName}
            className="selOption"
          >
            <option value="default">Default</option>
            <option value="nombreAsc">Nombre (A-Z)</option>
            <option value="nombreDesc">Nombre (Z-A)</option>
          </select>
        </div>
        <div className="box-filter">
          <h3 className="ordenCard">Rating: </h3>
          <select
            value={selectOrderRating}
            onChange={handleSortRating}
            className="selOption"
          >
            <option value="default">Default</option>
            <option value="ratingAsc">Rating (Menor a Mayor)</option>
            <option value="ratingDesc">Rating (Mayor a Menor)</option>
          </select>
        </div>
        <div className="box-filter">
          <h3 className="ordenCard">Origen:</h3>
          <select
            value={origenVideogame}
            onChange={handleCreatedFilter}
            className="selOption"
          >
            <option value="all">Todos los juegos</option>
            <option value="database">Juegos de Base de datos</option>
            <option value="api">Juegos de API</option>
          </select>
        </div>
        <div className="box-filter">
          <h3 className="ordenCard">Genero: </h3>
          <select
            value={selectGenre}
            onChange={handleGenreFilter}
            className="selOption"
          >
            <option key="all" value="all">
              Todos los generos
            </option>
            {genresArray.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div className="cards-list">
        {cardActual.length > 0 ? (
          cardActual.map((videoGame, index) => (
            <Card key={index} videoGame={videoGame} />
          ))
        ) : (
          <p>No hay juegos en esta pagina</p>
        )}
      </div>
      <div className="pagination-container">
        {listOrdVideogame.length > cardsPorPag && (
          <div>
            {Array.from({ length: totalPag }, (_, index) => (
              <button
                className="buttonPag"
                key={index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
        <br />
      </div>
    </div>
  );
}
export default Cards;
