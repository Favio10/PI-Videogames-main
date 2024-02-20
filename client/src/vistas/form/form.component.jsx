import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createVideoGame, getGenres } from "../../redux/actions/";
import { Link } from "react-router-dom";
import "./form.styles.css";

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [selectedGenreId, setSelectedGenreId] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState([]);

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
        .map((option) => option.value);

      const uniqueGenres = selecOptions.filter(
        (genre) => !selectedGenreId.includes(genre)
      );

      setFormData((prevData) => ({
        ...prevData,
        [name]: uniqueGenres,
      }));

      //! con este newset me aseguro de que no deja cargar repetidos
      setSelectedGenreId((prevSelected) => [
        ...new Set([...prevSelected, ...uniqueGenres]),
      ]);

      setSelectedGenreName((prevSelectedName) => [
        ...prevSelectedName,
        ...uniqueGenres.map(
          (id) => genresArray.find((genre) => genre.id === parseInt(id)).name
        ),
      ]);
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
        [name]: e.target.value,
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

    // validacion de name
    const nameValidation = /^[a-zA-Z0-9\s]+$/;
    if (!nameValidation.test(formData.name)) {
      alert("El nombre no debe contener simbolos");
      return;
    }

    //validacion de rating
    const ratingValidation = parseFloat(formData.rating);
    if (ratingValidation < 0.1) {
      alert("El valor minimo de rating es 0.1");
    } else if (ratingValidation > 5.0) {
      alert("El valor maximo de rating es 5.0");
    }

    // validacion de plataforma
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
        genres: selectedGenreId,
      });
      await dispatch(
        createVideoGame({
          name: formData.name,
          image: formData.image,
          description: formData.description,
          platform: formData.platform,
          released: formData.released,
          rating: formData.rating,
          genres: selectedGenreId,
        })
      );
      alert("VideoGame creado exitosamente");

      setFormData({
        name: "",
        image: "",
        description: "",
        platform: "",
        released: "",
        rating: "",
        genres: [],
      });
      setSelectedGenreId([]);
      setSelectedGenreName([]);
    } catch (error) {
      alert("Hubo un problema al crear tu videogame");
    }
  };

  const genresArray = Array.isArray(genres[0]) ? genres[0] : [];

  return (
    <div className="box-container">
      <br />
      <br />
      <div>
        <Link to="/home">
          <button className="buttonHome">Home</button>
        </Link>
      </div>
      <h1 className="tittleForm">¡CREA TU VIDEOJUEGO AQUI!</h1>
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
        <div className="label-input">
          <label htmlFor="released">Fecha de lanzamiento: </label>

          <input
            type="date"
            name="released"
            value={formData.released}
            onChange={handleChange}
            placeholder="Ingrese la fecha de lanzamiento"
            required
          />
        </div>
        <div className="check-boxPlat">
          <br />
          <br />
          <label className="labelPlataforma">
            {" "}
            SELECCIONA HASTA DOS PLATAFORMAS:
          </label>
          <br />
          <div>
            <br />
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="PC"
                name="platform"
                value="PC"
                onChange={handleChange}
                checked={formData.platform.includes("PC")}
              />
              <label className="ckeckLabel" htmlFor="PC">
                PC (Linux, Windows, macOS)
              </label>
            </div>
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="Moviles"
                name="platform"
                value="Moviles"
                onChange={handleChange}
                checked={formData.platform.includes("Moviles")}
              />
              <label className="ckeckLabel" htmlFor="Moviles">
                Mobile (iOS, Android)
              </label>
            </div>
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="PlayStation"
                name="platform"
                value="PlayStation"
                onChange={handleChange}
                checked={formData.platform.includes("PlayStation")}
              />
              <label className="ckeckLabel" htmlFor="PlayStation">
                PlayStation (4, 5)
              </label>
            </div>
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="Xbox"
                name="platform"
                value="Xbox"
                onChange={handleChange}
                checked={formData.platform.includes("Xbox")}
              />
              <label className="ckeckLabel" htmlFor="Xbox">
                Xbox
              </label>
            </div>
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="Wii"
                name="platform"
                value="Wii"
                onChange={handleChange}
                checked={formData.platform.includes("Wii")}
              />
              <label className="ckeckLabel" htmlFor="Wii">
                Wii
              </label>
            </div>
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="Atari"
                name="platform"
                value="Atari"
                onChange={handleChange}
                checked={formData.platform.includes("Atari")}
              />
              <label className="ckeckLabel" htmlFor="Atari">
                Atari
              </label>
            </div>
            <div className="check-boxPlat">
              <input
                type="checkbox"
                className="ckeckIndiv"
                id="Nintendo"
                name="platform"
                value="Nintendo"
                onChange={handleChange}
                checked={formData.platform.includes("Nintendo")}
              />
              <label className="ckeckLabel" htmlFor="Nintendo">
                Nintendo
              </label>
            </div>
          </div>
        </div>

        <div className="">
          <label className="labelPlataforma" htmlFor="genres">
            {" "}
            GENEROS:
          </label>

          <select
            name="genres"
            className="selectOption"
            value={formData.genres.map((genre) => genre.id)}
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
            <ul className="listaTotal">
              {selectedGenreName.map((name) => (
                <li className="listInd" key={name}>
                  {" "}
                  ✓ {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <br />
        <button type="submit" className="submitButton">
          Create
        </button>
        <hr />
        <br />
      </form>
      <div></div>
    </div>
  );
}
export default Form;
