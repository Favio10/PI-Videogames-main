import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createVideoGame, getGenres } from "../../redux/actions/";
import { Link } from "react-router-dom";
import "./form.styles.css";

// function Form() {
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);
//   const [selectedGenreNames, setSelectedGenreNames] = useState([]);

//   //console.log("esto esta en el estado NUEVO", genres);

//   // esto lo tengo tambien en el home pero por las dudas lo ejecuto una vez mas
//   // useEffect(() => {
//   //   dispatch(getVideogames());
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     description: "",
//     platform: "",
//     released: "",
//     rating: "",
//     genres: [],
//   });

//   // aca estare manejando las actualizaciones del listado de genres
//   const handleChange = (e) => {
//     const { name, value, options, checked } = e.target;
//     //console.log(`Input changed: ${name} = ${value}`);
//     // console.log(
//     //   `Selected options: ${name} = ${Array.from(options)
//     //     .filter((option) => option.selected)
//     //     .map((option) => option.text)
//     //     .join(", ")}`
//     // );

//     if (name === "genres") {
//       const selecOptions = Array.from(options) //aca modifique primero
//         .filter((option) => option.selected)
//         .map((option) => option.value);

//       //console.log("esto es el select", selecOptions);

//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: selecOptions,
//       }));
//       //const selectedNames = selecOptions.map((option) => option.value);
//       //setSelectedGenreNames(selecOptions);

//       setSelectedGenreNames((prevSelected) => [
//         ...prevSelected,
//         ...selecOptions, // Agrega las nuevas opciones seleccionadas al estado
//       ]);
//       console.log("selectedGenreNames state:", selecOptions);
//     } else if (name === "platform") {
//       // Verifica si ya hay dos plataformas seleccionadas
//       if (checked && formData.platform.length < 2) {
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: [...prevData[name], value],
//         }));
//       }
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: e.target.value,
//       }));
//     }
//   };

//   // con este handleSubmit es para no recargar la pagina a cada rato
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //console.log("Form data:", formData);

//     // aqui indico cuales son requeridos
//     const required = [
//       "name",
//       "image",
//       "description",
//       "platform",
//       "released",
//       "rating",
//       "genres",
//     ];

//     const datarequiredComp = required.every((datComp) => !!formData[datComp]);

//     if (!datarequiredComp) {
//       alert("Por favor, completa todos los campos");
//       return;
//     }

//     // validacion de name
//     const nameValidation = /^[a-zA-Z0-9\s]+$/;
//     if (!nameValidation.test(formData.name)) {
//       alert("El nombre no debe contener simbolos");
//       return;
//     }

//     //validacion de rating
//     const ratingValidation = parseFloat(formData.rating);
//     if (ratingValidation < 0.1) {
//       alert("El valor minimo de rating es 0.1");
//     } else if (ratingValidation > 5.0) {
//       alert("El valor maximo de rating es 5.0");
//     }

//     // validacion de plataforma
//     const platformValidation = formData.platform;
//     if (platformValidation.length > 2) {
//       alert("El maximo de plataformas es 2");
//     }

//     try {
//       console.log("Datos a enviar:", {
//         name: formData.name,
//         image: formData.image,
//         description: formData.description,
//         platform: formData.platform,
//         released: formData.released,
//         rating: formData.rating,
//         genres: selectedGenreNames,
//       });
//       await dispatch(
//         createVideoGame({
//           name: formData.name,
//           image: formData.image,
//           description: formData.description,
//           platform: formData.platform,
//           released: formData.released,
//           rating: formData.rating,
//           genres: selectedGenreNames,
//         })
//       );
//       alert("VideoGame creado exitosamente");

//       setFormData({
//         name: "",
//         image: "",
//         description: "",
//         platform: "",
//         released: "",
//         rating: "",
//         genres: [],
//       });
//     } catch (error) {
//       alert("Hubo un problema al crear tu videogame");
//     }
//   };

//   const genresArray = Array.isArray(genres[0]) ? genres[0] : [];

//   return (
//     <div className="box-container">
//       <div>
//         <Link to="/home">
//           <button className="boton-home">Home</button>
//           <hr />
//         </Link>
//       </div>
//       <h1>Aqui podes crear tu videojuego:</h1>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <div className="label-input">
//           <label htmlFor="name">Nombre: </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="No incluyas simbolos"
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="imagen">Imagen: </label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="(url)"
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="description">Descripcion: </label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Haz un breve relato de tu juego"
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="rating">Rating (entre 0.01 y 5.00): </label>
//           <input
//             type="number"
//             name="rating"
//             min={0.1}
//             max={5.0}
//             step={0.1}
//             value={formData.rating}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="released">Fecha de lanzamiento: </label>

//           <input
//             type="date" // Example using type="date"
//             name="released"
//             value={formData.released}
//             onChange={handleChange}
//             placeholder="Ingrese la fecha de lanzamiento"
//             required
//           />
//         </div>
//         <div className="check-boxPlat">
//           <label>Selecciona hasta dos plataformas:</label>
//           <br />
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="PC"
//               name="platform"
//               value="PC"
//               onChange={handleChange}
//               checked={formData.platform.includes("PC")}
//             />
//             <label htmlFor="PC">PC (Linux, Windows, macOS)</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Moviles"
//               name="platform"
//               value="Moviles"
//               onChange={handleChange}
//               checked={formData.platform.includes("Moviles")}
//             />
//             <label htmlFor="Moviles">Mobile (iOS, Android)</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="PlayStation"
//               name="platform"
//               value="PlayStation"
//               onChange={handleChange}
//               checked={formData.platform.includes("PlayStation")}
//             />
//             <label htmlFor="PlayStation">PlayStation (4, 5)</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Xbox"
//               name="platform"
//               value="Xbox"
//               onChange={handleChange}
//               checked={formData.platform.includes("Xbox")}
//             />
//             <label htmlFor="Xbox">Xbox</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Wii"
//               name="platform"
//               value="Wii"
//               onChange={handleChange}
//               checked={formData.platform.includes("Wii")}
//             />
//             <label htmlFor="Wii">Wii</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Atari"
//               name="platform"
//               value="Atari"
//               onChange={handleChange}
//               checked={formData.platform.includes("Atari")}
//             />
//             <label htmlFor="Atari">Atari</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Nintendo"
//               name="platform"
//               value="Nintendo"
//               onChange={handleChange}
//               checked={formData.platform.includes("Nintendo")}
//             />
//             <label htmlFor="Nintendo">Nintendo</label>
//           </div>
//         </div>

//         <div className="label-input">
//           <label htmlFor="genres"> Generos: </label>
//           <select
//             name="genres"
//             value={formData.genres.map((genre) => genre.id)}
//             onChange={handleChange}
//             multiple
//           >
//             {genresArray.map((genre) => (
//               <option key={genre.id} value={genre.id}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>

//           <div className="label-input">
//             <label htmlFor="genres">Géneros seleccionados: </label>
//             <ul>
//               {selectedGenreNames.map((name) => (
//                 <li key={name}>{name}</li>
//               ))}
//             </ul>
//             {console.log("selectedGenreNames en lista:", selectedGenreNames)}
//           </div>
//         </div>

//         <br />
//         <button type="submit" className="submit">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }
// // lo primero que agrege fue el select
// export default Form;

//! form con state solo para id

// function Form() {
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);
//   const [selectedGenreId, setSelectedGenreId] = useState([]);

//   //console.log("esto esta en el estado NUEVO", genres);

//   // esto lo tengo tambien en el home pero por las dudas lo ejecuto una vez mas
//   // useEffect(() => {
//   //   dispatch(getVideogames());
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//     description: "",
//     platform: "",
//     released: "",
//     rating: "",
//     genres: [],
//   });

//   // aca estare manejando las actualizaciones del listado de genres
//   const handleChange = (e) => {
//     const { name, value, options, checked } = e.target;
//     //console.log(`Input changed: ${name} = ${value}`);
//     // console.log(
//     //   `Selected options: ${name} = ${Array.from(options)
//     //     .filter((option) => option.selected)
//     //     .map((option) => option.text)
//     //     .join(", ")}`
//     // );

//     if (name === "genres") {
//       const selecOptions = Array.from(options) //aca modifique primero
//         .filter((option) => option.selected)
//         .map((option) => option.value);

//       //console.log("esto es el select", selecOptions);

//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: selecOptions,
//       }));
//       //const selectedId = selecOptions.map((option) => option.value);
//       //setSelectedGenreId(selecOptions);
//       //! con este newset me aseguro de que no deja cargar repetidos
//       setSelectedGenreId((prevSelected) => [
//         ...new Set([...prevSelected, ...selecOptions]), //!aca modifique primero el selectoptions
//       ]);
//       //! este tenia antes que me dejaba a veces cargar repetidos, pero si se enviaba el form se actualizaba
//       // setSelectedGenreId((prevSelected) => [
//       //   ...prevSelected,
//       //   ...selecOptions,
//       // ]);

//       console.log("selectedGenreId state:", selecOptions);
//     } else if (name === "platform") {
//       // Verifica si ya hay dos plataformas seleccionadas
//       if (checked && formData.platform.length < 2) {
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: [...prevData[name], value],
//         }));
//       }
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: e.target.value,
//       }));
//     }
//   };

//   // con este handleSubmit es para no recargar la pagina a cada rato
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //console.log("Form data:", formData);

//     // aqui indico cuales son requeridos
//     const required = [
//       "name",
//       "image",
//       "description",
//       "platform",
//       "released",
//       "rating",
//       "genres",
//     ];

//     const datarequiredComp = required.every((datComp) => !!formData[datComp]);

//     if (!datarequiredComp) {
//       alert("Por favor, completa todos los campos");
//       return;
//     }

//     // validacion de name
//     const nameValidation = /^[a-zA-Z0-9\s]+$/;
//     if (!nameValidation.test(formData.name)) {
//       alert("El nombre no debe contener simbolos");
//       return;
//     }

//     //validacion de rating
//     const ratingValidation = parseFloat(formData.rating);
//     if (ratingValidation < 0.1) {
//       alert("El valor minimo de rating es 0.1");
//     } else if (ratingValidation > 5.0) {
//       alert("El valor maximo de rating es 5.0");
//     }

//     // validacion de plataforma
//     const platformValidation = formData.platform;
//     if (platformValidation.length > 2) {
//       alert("El maximo de plataformas es 2");
//     }

//     try {
//       console.log("Datos a enviar:", {
//         name: formData.name,
//         image: formData.image,
//         description: formData.description,
//         platform: formData.platform,
//         released: formData.released,
//         rating: formData.rating,
//         genres: selectedGenreId,
//       });
//       await dispatch(
//         createVideoGame({
//           name: formData.name,
//           image: formData.image,
//           description: formData.description,
//           platform: formData.platform,
//           released: formData.released,
//           rating: formData.rating,
//           genres: selectedGenreId,
//         })
//       );
//       alert("VideoGame creado exitosamente");

//       setFormData({
//         name: "",
//         image: "",
//         description: "",
//         platform: "",
//         released: "",
//         rating: "",
//         genres: [],
//       });
//       setSelectedGenreId([]);
//     } catch (error) {
//       alert("Hubo un problema al crear tu videogame");
//     }
//   };

//   const genresArray = Array.isArray(genres[0]) ? genres[0] : [];

//   return (
//     <div className="box-container">
//       <div>
//         <Link to="/home">
//           <button className="boton-home">Home</button>
//           <hr />
//         </Link>
//       </div>
//       <h1>Aqui podes crear tu videojuego:</h1>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <div className="label-input">
//           <label htmlFor="name">Nombre: </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="No incluyas simbolos"
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="imagen">Imagen: </label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="(url)"
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="description">Descripcion: </label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Haz un breve relato de tu juego"
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="rating">Rating (entre 0.01 y 5.00): </label>
//           <input
//             type="number"
//             name="rating"
//             min={0.1}
//             max={5.0}
//             step={0.1}
//             value={formData.rating}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="label-input">
//           <label htmlFor="released">Fecha de lanzamiento: </label>

//           <input
//             type="date" // Example using type="date"
//             name="released"
//             value={formData.released}
//             onChange={handleChange}
//             placeholder="Ingrese la fecha de lanzamiento"
//             required
//           />
//         </div>
//         <div className="check-boxPlat">
//           <label>Selecciona hasta dos plataformas:</label>
//           <br />
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="PC"
//               name="platform"
//               value="PC"
//               onChange={handleChange}
//               checked={formData.platform.includes("PC")}
//             />
//             <label htmlFor="PC">PC (Linux, Windows, macOS)</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Moviles"
//               name="platform"
//               value="Moviles"
//               onChange={handleChange}
//               checked={formData.platform.includes("Moviles")}
//             />
//             <label htmlFor="Moviles">Mobile (iOS, Android)</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="PlayStation"
//               name="platform"
//               value="PlayStation"
//               onChange={handleChange}
//               checked={formData.platform.includes("PlayStation")}
//             />
//             <label htmlFor="PlayStation">PlayStation (4, 5)</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Xbox"
//               name="platform"
//               value="Xbox"
//               onChange={handleChange}
//               checked={formData.platform.includes("Xbox")}
//             />
//             <label htmlFor="Xbox">Xbox</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Wii"
//               name="platform"
//               value="Wii"
//               onChange={handleChange}
//               checked={formData.platform.includes("Wii")}
//             />
//             <label htmlFor="Wii">Wii</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Atari"
//               name="platform"
//               value="Atari"
//               onChange={handleChange}
//               checked={formData.platform.includes("Atari")}
//             />
//             <label htmlFor="Atari">Atari</label>
//           </div>
//           <div className="check-boxPlat">
//             <input
//               type="checkbox"
//               id="Nintendo"
//               name="platform"
//               value="Nintendo"
//               onChange={handleChange}
//               checked={formData.platform.includes("Nintendo")}
//             />
//             <label htmlFor="Nintendo">Nintendo</label>
//           </div>
//         </div>

//         <div className="label-input">
//           <label htmlFor="genres"> Generos: </label>
//           <select
//             name="genres"
//             value={formData.genres.map((genre) => genre.id)}
//             onChange={handleChange}
//             multiple
//           >
//             {genresArray.map((genre) => (
//               <option key={genre.id} value={genre.id}>
//                 {genre.name}
//                 {console.log(genre)}
//               </option>
//             ))}
//           </select>

//           <div className="label-input">
//             <label htmlFor="genres">Géneros seleccionados: </label>
//             <ul>
//               {selectedGenreId.map((name) => (
//                 <li key={name}>{name}</li>
//               ))}
//             </ul>
//             {/* <div className="label-input">
//               <label htmlFor="genres">Generos prueba: </label>
//               <ul>
//                 {genresArray.map((genre) => (
//                   <li key={genre.id} value={genre.id}>
//                     {genre.name}
//                   </li>
//                 ))}
//               </ul>
//             </div> */}
//           </div>
//         </div>

//         <br />
//         <button type="submit" className="submit">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }
// // lo primero que agrege fue el select
// export default Form;

//! form con state para id y name

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [selectedGenreId, setSelectedGenreId] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState([]);

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
    //console.log(`Input changed: ${name} = ${value}`);
    // console.log(
    //   `Selected options: ${name} = ${Array.from(options)
    //     .filter((option) => option.selected)
    //     .map((option) => option.text)
    //     .join(", ")}`
    // );

    if (name === "genres") {
      const selecOptions = Array.from(options) //aca modifique primero
        .filter((option) => option.selected)
        .map((option) => option.value);

      //console.log("esto es el select", selecOptions);

      setFormData((prevData) => ({
        ...prevData,
        [name]: selecOptions,
      }));
      //const selectedId = selecOptions.map((option) => option.value);
      //setSelectedGenreId(selecOptions);
      //! con este newset me aseguro de que no deja cargar repetidos
      setSelectedGenreId((prevSelected) => [
        ...new Set([...prevSelected, ...selecOptions]), //!aca modifique primero el selectoptions
      ]);
      //! este tenia antes que me dejaba a veces cargar repetidos, pero si se enviaba el form se actualizaba
      // setSelectedGenreId((prevSelected) => [
      //   ...prevSelected,
      //   ...selecOptions,
      // ]);

      setSelectedGenreName((prevSelectedName) => [
        ...prevSelectedName,
        ...selecOptions.map(
          (id) => genresArray.find((genre) => genre.id === parseInt(id)).name
        ),
      ]);

      console.log("selectedGenreId state: ", selectedGenreId);
      console.log("selectedGenreName state:", selectedGenreName);
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
    //console.log("Form data:", formData);

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
        <div className="label-input">
          <label htmlFor="released">Fecha de lanzamiento: </label>

          <input
            type="date" // Example using type="date"
            name="released"
            value={formData.released}
            onChange={handleChange}
            placeholder="Ingrese la fecha de lanzamiento"
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

        <div className="label-input">
          <label htmlFor="genres"> Generos: </label>
          <select
            name="genres"
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
            <ul>
              {selectedGenreName.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            {/* <div className="label-input">
              <label htmlFor="genres">Generos prueba: </label>
              <ul>
                {genresArray.map((genre) => (
                  <li key={genre.id} value={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div> */}
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
