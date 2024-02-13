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

    if (searchString.trim() !== "") {
      dispatch(getByName(searchString))
        .then((response) => {
          if (response.length === 0) {
            setError("No se encontraron resultados");
          } else {
            setError(null);
          }
        })
        .catch((err) => {
          setError();
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
        .catch((err) => {
          setError(
            "Ocurrio un error al cargar la lista. Intenta nuevamente..."
          );
        });
    }
  }, [dispatch, searchString]);

  return (
    <div className="home">
      <Navbar handleSearch={handleSearch} />
      <hr />
      <h2 className="home-title">Videogame List</h2>
      {error && <p className="error-message">{error}</p>}
      <Cards allVideoGames={allVideoGames} />
    </div>
  );
}

export default Home;
