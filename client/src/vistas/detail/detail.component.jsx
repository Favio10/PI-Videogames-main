import { useDispatch, useSelector } from "react-redux";
import Card from "../../componentes/card/card.component";
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

  return (
    <div>
      <Link to="/home">
        <button className="boton-home">Home</button>
      </Link>
      <p className="title">Page Details </p>
      {character ? (
        <div className="box-detail">
          <img
            src={character.image}
            alt={character.name}
            className="image"
          ></img>
          <h1>{character.name}</h1>
          <p>Rating actual: {character.rating}</p>
          <p>Generos: {character.genres}</p>
          <p>Plataformas: {character.plataforma}</p>
          <p>Fecha de lanzamiento: {character.released}</p>
          <p>Descripcion: {character.description}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Detail;
