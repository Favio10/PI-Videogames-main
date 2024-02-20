import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getByName, getVideogames } from "../../redux/actions";

import Navbar from "../../componentes/navbar/navbar.component";
import Cards from "../../componentes/cards/cards.component";

import "./home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.allVideoGames);
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState(null);

  function handleSearch(value) {
    setSearchString(value);
  }

  useEffect(() => {
    setError(null);

    // useEffect(() => {
    if (searchString.trim() !== "") {
      dispatch(getByName(searchString))
        .then((response) => {
          if (response.length === 0) {
            setError("No se encontraron resultados");
          } else {
            setError(null);
          }
        })
        .catch(() => {
          setError(
            "Ocurrió un error al realizar la búsqueda. Intenta nuevamente..."
          );
        });
    } else {
      dispatch(getVideogames())
        .then((response) => {
          if (response.length === 0) {
            setError("No se encontraron videojuegos");
          } else {
            setError(null);
          }
        })
        .catch(() => {
          setError();
          //"Ocurrio un error al cargar la lista. Intenta nuevamente..."
        });
    }
  }, [dispatch, searchString]);

  return (
    <div className="home">
      <Navbar handleSearch={handleSearch} />
      <a href={window.location.pathname}>
        <h2 className="titleHome">VIDEOGAME LIST</h2>
      </a>
      <br />
      {error && <p className="error-message">{error}</p>}
      <Cards allVideoGames={allVideoGames.flat()} />
    </div>
  );
}

export default Home;
