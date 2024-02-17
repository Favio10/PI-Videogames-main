import "./card.styles.css";
import { Link } from "react-router-dom";

function Card({ videoGame, index }) {
  //const { name, image, rating, genres, id } = videoGame[0];
  const { name, image, rating, genres, id } = videoGame;

  let genremap;
  if (genres) {
    genremap = genres.join(", ");
  } else {
    genremap = genres;
  }

  return (
    <Link to={`/home/${id}`}>
      <div className="card-container">
        <img src={image} alt="" className="image" />
        <h2 className="texto">{name}</h2>
        <p className="texto">Rating: {rating}</p>
        <p className="texto">Genero: {genremap}</p>
      </div>
    </Link>
  );
}

export default Card;
