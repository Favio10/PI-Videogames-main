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
        <h2 className="texto1">{name}</h2>
        <p className="texto2">Rating: {rating}</p>
        <p className="texto2">Genero: {genremap}</p>
      </div>
    </Link>
  );
}

export default Card;
