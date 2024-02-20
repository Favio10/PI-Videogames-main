import { useDispatch, useSelector } from "react-redux";

import "./detail.styles.css";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getById } from "../../redux/actions";
function Detail() {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.characterReducer.character);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  let platformNuevo;

  if (character && character.platform) {
    platformNuevo = character.platform.join(", ");
  }

  return (
    <div>
      <div>
        <br />
      </div>
      <Link to="/home">
        <button className="buttonHome">Home</button>
      </Link>

      {character ? (
        <div className="box-detail">
          <img
            src={character.image}
            alt={character.name}
            className="imageDetail"
          ></img>
          <h1 className="nameDetail">{character.name}</h1>
          <p className="etcDetail">Rating actual: {character.rating}</p>
          <p className="etcDetail">Generos: {character.genres}</p>
          <p className="etcDetail">
            Plataformas: {character.plataforma} {platformNuevo}
          </p>
          <p className="etcDetail">
            Fecha de lanzamiento: {character.released}
          </p>
          <p className="etcDetail">Descripcion: {character.description}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Detail;
