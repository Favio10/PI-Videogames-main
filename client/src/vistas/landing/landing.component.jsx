import "./landing.styles.css";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className="divLanding">
      <h1 className="tituloLanding"> Bienvenido!</h1>
      <Link to="/home">
        <button className="buttonLanding">Home</button>
      </Link>
    </div>
  );
}

export default Landing;
