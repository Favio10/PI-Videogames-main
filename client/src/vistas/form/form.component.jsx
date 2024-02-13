import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  createVideoGame,
  getGenres,
  getVideogames,
} from "../../redux/actions/";
import { Link } from "react-router-dom";
import "./form.styles.css";

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  //console.log("esto esta en el estado NUEVO", genres);

  // esto lo tengo tambien en el home pero por las dudas lo ejecuto una vez mas
  // useEffect(() => {
  //   dispatch(getVideogames());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    platform: "",
    released: "",
    rating: "",
    genres: [],
  });

  // aca estare manejando las actualizaciones del listado de genres
  const handleChange = (e) => {
    const { name, value, options, checked } = e.target;

    if (name === "genres") {
      const selecOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) =>
          genres.find((genre) => genre.id === parseInt(option.value))
        );

      console.log("esto es el select", selecOptions);

      setFormData((prevData) => ({
        ...prevData,
        [name]: selecOptions,
      }));
    } else if (name === "platform") {
      // Verifica si ya hay dos plataformas seleccionadas
      if (checked && formData.platform.length < 2) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], value],
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // con este handleSubmit es para no recargar la pagina a cada rato
  const handleSubmit = async (e) => {
    e.preventDefault();

    // aqui indico cuales son requeridos
    const required = [
      "name",
      "image",
      "description",
      "platform",
      "released",
      "rating",
      "genres",
    ];

    const datarequiredComp = required.every((datComp) => !!formData[datComp]);

    if (!datarequiredComp) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const nameValidation = /^[a-zA-Z0-9\s]+$/;
    if (!nameValidation.test(formData.name)) {
      alert("El nombre no debe contener simbolos");
      return;
    }

    const ratingValidation = parseFloat(formData.rating);
    if (ratingValidation < 0.1) {
      alert("El valor minimo de rating es 0.1");
    } else if (ratingValidation > 5.0) {
      alert("El valor maximo de rating es 5.0");
    }

    const platformValidation = formData.platform;
    if (platformValidation.length > 2) {
      alert("El maximo de plataformas es 2");
    }

    try {
      console.log("Datos a enviar:", {
        name: formData.name,
        image: formData.image,
        description: formData.description,
        platform: formData.platform,
        released: formData.released,
        rating: formData.rating,
        genres: formData.genres,
      });
      await dispatch(
        createVideoGame({
          name: formData.name,
          image: formData.image,
          description: formData.description,
          platform: formData.platform,
          released: formData.released,
          rating: formData.rating,
          genres: formData.genres,
        })
      );
      alert("Raza creada exitosamente");

      setFormData({
        name: "",
        image: "",
        description: "",
        platform: "",
        released: "",
        rating: "",
        genres: [],
      });
    } catch (error) {
      alert("Hubo un problema al crear tu videogame");
    }
  };

  const genresArray = genres.length > 0 ? genres[0] : [];

  return (
    <div className="box-container">
      <div>
        <Link to="/home">
          <button className="boton-home">Home</button>
          <hr />
        </Link>
      </div>
      <h1>Aqui podes crear tu videojuego:</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="No incluyas simbolos"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="imagen">Imagen: </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="(url)"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="description">Descripcion: </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Haz un breve relato de tu juego"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="rating">Rating (entre 0.01 y 5.00): </label>
          <input
            type="number"
            name="rating"
            min={0.1}
            max={5.0}
            step={0.1}
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="check-boxPlat">
          <label>Selecciona hasta dos plataformas:</label>
          <br />
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="PC"
              name="platform"
              value="PC"
              onChange={handleChange}
              checked={formData.platform.includes("PC")}
            />
            <label htmlFor="PC">PC (Linux, Windows, macOS)</label>
          </div>
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="Moviles"
              name="platform"
              value="Moviles"
              onChange={handleChange}
              checked={formData.platform.includes("Moviles")}
            />
            <label htmlFor="Moviles">Mobile (iOS, Android)</label>
          </div>
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="PlayStation"
              name="platform"
              value="PlayStation"
              onChange={handleChange}
              checked={formData.platform.includes("PlayStation")}
            />
            <label htmlFor="PlayStation">PlayStation (4, 5)</label>
          </div>
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="Xbox"
              name="platform"
              value="Xbox"
              onChange={handleChange}
              checked={formData.platform.includes("Xbox")}
            />
            <label htmlFor="Xbox">Xbox</label>
          </div>
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="Wii"
              name="platform"
              value="Wii"
              onChange={handleChange}
              checked={formData.platform.includes("Wii")}
            />
            <label htmlFor="Wii">Wii</label>
          </div>
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="Atari"
              name="platform"
              value="Atari"
              onChange={handleChange}
              checked={formData.platform.includes("Atari")}
            />
            <label htmlFor="Atari">Atari</label>
          </div>
          <div className="check-boxPlat">
            <input
              type="checkbox"
              id="Nintendo"
              name="platform"
              value="Nintendo"
              onChange={handleChange}
              checked={formData.platform.includes("Nintendo")}
            />
            <label htmlFor="Nintendo">Nintendo</label>
          </div>
        </div>
        {/* <div className="label-input">
          <label htmlFor="genres">Generos: </label>
          <select
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            multiple
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <div>
            <p>Opciones seleccionadas: </p>
            <ul>
              {formData.genres.map((selected) => (
                <li key={selected.id}>{selected.name}</li>
              ))}
            </ul>
          </div>
        </div> */}

        <div className="label-input">
          <label htmlFor="genres"> Generos: </label>
          <select
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            multiple
          >
            {genresArray.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className="label-input">
            <label htmlFor="genres">Géneros seleccionados: </label>
            <ul>
              {formData.genres.map((selected) => (
                <li key={selected.id}>{selected.name} </li>
              ))}
            </ul>
          </div>
        </div>

        <br />
        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}
// lo primero que agrege fue el select
export default Form;

/* <div>
        <label>Selecciona hasta dos plataformas:</label>
        <div>
          <input type="checkbox" id="PC" name="plataformas" value="PC" />
          <label for="PC">PC (Linux, Windows, macOS)</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Moviles"
            name="plataformas"
            value="Moviles"
          />
          <label for="Moviles">Mobile (iOS, Android)</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="PlayStation"
            name="plataformas"
            value="PlayStation"
          />
          <label for="PlayStation">PlayStation (4, 5)</label>
        </div>
        <div>
          <input type="checkbox" id="Xbox" name="plataformas" value="Xbox" />
          <label for="Xbox">Xbox</label>
        </div>
        <div>
          <input type="checkbox" id="Wii" name="plataformas" value="Wii" />
          <label for="Wii">Wii</label>
        </div>
        <div>
          <input type="checkbox" id="Atari" name="plataformas" value="Atari" />
          <label for="Atari">Atari</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Nintendo"
            name="plataformas"
            value="Nintendo"
          />
          <label for="Nintendo">Nintendo</label>
        </div>
      </div> */
