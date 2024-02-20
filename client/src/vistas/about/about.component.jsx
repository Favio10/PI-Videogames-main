import "./about.styles.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <div>
      <div>
        <br />
      </div>
      <Link to="/home">
        <button className="buttonHome">Home</button>
      </Link>

      <div className="div-cont">
        <h2 className="nameDetail">Hola, bienvenidos a mi pequeño proyecto!</h2>
        <hr />
        <br />
        <p className="etcDetail">
          Este proyecto integrador (PI) fue realizado por Favio Olivera. Dicho
          proyecto cuenta con una DataBase, con su servidor y lo correspondiente
          desde el frontEnd. Integralmente fue compuesto para la instancia de
          PI, habiendo ya aprobado los 4 modulos correspondienes anteriores. En
          este PI encontraras una gran cantidad de videojuegos, pudiendo
          filtarlo por su nombre, por su genero, ver como estan posicionados.
          Podes tambien ver el detallado de cada videogame con su
          correspondiente description, y hasta tenes una opcion para crear tu
          propio videogame!
        </p>
      </div>
    </div>
  );
}

export default About;
