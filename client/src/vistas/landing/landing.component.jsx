import "./landing.styles.css";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className="divLanding">
      <div className="divSegundo">
        <h1 className="tituloLanding"> ¡Bienvenidos!</h1>
        <p className="parrafoLanding">
          En esta web encontraras todo tipo de informacion
          <br />
          sobre tus juegos preferidos
        </p>
        <br />
        <Link to="/home">
          <button className="buttonLanding">Home</button>
        </Link>
        <br />
      </div>
      <br />
    </div>
  );
}

export default Landing;
