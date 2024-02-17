import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card.component";
import "./cards.styles.css";
import { useEffect, useState } from "react";
import { getGenres } from "../../redux/actions";

function Cards({ allVideoGames }) {
  const videoGamesList = allVideoGames;
  const cardsPorPag = 15;
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // manejo de pagina actual
  const [pagActual, setPagActual] = useState(1);
  // almacena la lista ordenada y filtrada
  const [listOrdVideogame, setListOrdVideogame] = useState([]);
  // almacena el criterio de orden para los nombres
  const [selectOrderName, setSelectOrderName] = useState("default");
  // almacena el criterio de orden para el rating
  const [selectOrderRating, setSelectOrderRating] = useState("default");
  // almacena el criterio de orden para el origen
  const [origenVideogame, setOrigenVideogame] = useState("all");
  // almacena la lista de genero seleccionada por el usuario
  const [selectGenre, setSelectGenre] = useState("all");

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    //console.log("Videogames list update: ", videoGamesList);
    //console.log("Select order name:", selectOrderName);
    //console.log("Select order genre:", selectGenre);

    setListOrdVideogame((prevList) => {
      let filteredList = [...videoGamesList];
      console.log("Este es el filtered list", filteredList);

      //! filtro por name
      switch (selectOrderName) {
        case "nombreAsc":
          //console.log("Sorting by Nombre Asc");
          filteredList = filteredList
            .filter((videoGame) => videoGame.name) // No es necesario el array dentro de array
            .sort((a, b) =>
              a.name.localeCompare(b.name, undefined, { undefined: "base" })
            );
          break;
        case "nombreDesc":
          //console.log("Sorting by Nombre Desc");
          filteredList = filteredList
            .filter((videoGame) => videoGame.name)
            .sort((a, b) =>
              b.name.localeCompare(a.name, undefined, { undefined: "base" })
            );
          break;
        default:
          break;
      }

      //! filtro por origen

      if (origenVideogame === "database") {
        filteredList = filteredList.filter(
          (videoGame) => videoGame.created === true
        );
      } else if (origenVideogame === "api") {
        filteredList = filteredList.filter(
          (videoGame) => videoGame.created === false
        );
      }

      //! filtro por genero

      if (selectGenre !== "all") {
        filteredList = filteredList.filter(
          (videoGame) =>
            videoGame.genres && videoGame.genres.includes(selectGenre)
        );
      }

      //! ordenamiento por rating

      switch (selectOrderRating) {
        case "ratingAsc":
          filteredList.sort(
            (a, b) => filtroRating(a.rating) - filtroRating(b.rating)
          );
          break;
        case "ratingDesc":
          filteredList.sort(
            (a, b) => filtroRating(b.rating) - filtroRating(a.rating)
          );
          break;
        default:
          break;
      }

      return filteredList;
    });
  }, [
    videoGamesList,
    selectOrderName,
    selectOrderRating,
    origenVideogame,
    selectGenre,
    pagActual,
  ]);

  const handleCreatedFilter = (event) => {
    setOrigenVideogame(event.target.value);
  };

  const handleGenreFilter = (event) => {
    setSelectGenre(event.target.value);
  };

  const handleSortName = (event) => {
    setSelectOrderName(event.target.value);
    setSelectOrderRating("default");
  };

  const handleSortRating = (event) => {
    setSelectOrderRating(event.target.value);
  };

  const filtroRating = (ratingData) => {
    if (typeof ratingData === "string") {
      const ratingMaxMin = ratingData.split(" - ");
      const ratingMinimo = parseInt(ratingMaxMin[0]);
      return ratingMinimo;
    } else if (typeof ratingData === "number") {
      return ratingData;
    }
    return 0;
  };

  const numPrimCard = pagActual * cardsPorPag;
  const numUltCard = numPrimCard - cardsPorPag;
  const cardActual = listOrdVideogame.slice(numUltCard, numPrimCard);

  const totalPag = Math.ceil(listOrdVideogame.length / cardsPorPag);

  const paginate = (pageNumber) => setPagActual(pageNumber);

  const genresArray = genres.length > 0 ? genres[0] : [];

  return (
    <div className="cards-container">
      <div className="all-select">
        <div className="box-filter">
          <h3>Ordena por Nombre:</h3>
          <select
            value={selectOrderName}
            onChange={handleSortName}
            className="selOption"
          >
            <option value="default">Default</option>
            <option value="nombreAsc">Nombre (A-Z)</option>
            <option value="nombreDesc">Nombre (Z-A)</option>
          </select>
        </div>
        <div className="box-filter">
          <h3>Ordenar por rating: </h3>
          <select
            value={selectOrderRating}
            onChange={handleSortRating}
            className="selOption"
          >
            <option value="default">Default</option>
            <option value="ratingAsc">Rating (Menor a Mayor)</option>
            <option value="ratingDesc">Rating (Mayor a Menor)</option>
          </select>
        </div>
        <div className="box-filter">
          <h3>Origen:</h3>
          <select
            value={origenVideogame}
            onChange={handleCreatedFilter}
            className="selOption"
          >
            <option value="all">Todos los juegos</option>
            <option value="database">Juegos de Base de datos</option>
            <option value="api">Juegos de API</option>
          </select>
        </div>
        <div className="box-filter">
          <h3>Genero: </h3>
          <select
            value={selectGenre}
            onChange={handleGenreFilter}
            className="selOption"
          >
            <option key="all" value="all">
              Todos los generos
            </option>
            {genresArray.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div className="cards-list">
        {cardActual.length > 0 ? (
          cardActual.map((videoGame, index) => (
            <Card key={index} videoGame={videoGame} />
          ))
        ) : (
          <p>No hay juegos en esta pagina</p>
        )}
      </div>
      <div className="pagination-container">
        {listOrdVideogame.length > cardsPorPag && (
          <div>
            {Array.from({ length: totalPag }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Cards;

//!ultimo ya con inconveniente de bucle
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../card/card.component";
// import "./cards.styles.css";
// import { useEffect, useState } from "react";
// import { getGenres } from "../../redux/actions";

// function Cards({ allVideoGames }) {
//   const videoGamesList = allVideoGames.flat(); // Utilizar flat para aplanar el array
//   const cardsPorPag = 15;
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);
//   // console.log(videoGamesList);
//   // console.log(genres);

//   const [pagActual, setPagActual] = useState(1);
//   const [listOrdVideogame, setListOrdVideogame] = useState([]);
//   const [selectOrderName, setSelectOrderName] = useState("nameAsc");
//   const [selectOrderRating, setSelectOrderRating] = useState("default");
//   const [origenVideogame, setOrigenVideogame] = useState("all");
//   const [selectGenre, setSelectGenre] = useState("all");

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   useEffect(() => {
//     //console.log("Videogames list update: ", videoGamesList);
//     //console.log("Select order name:", selectOrderName);
//     //console.log("Select order genre:", selectGenre);
//     // console.log("Origen videogame:", origenVideogame);

//     let nameOrder = [...videoGamesList];

//     //! filtro por name
//     switch (selectOrderName) {
//       case "nombreAsc":
//         //console.log("Sorting by Nombre Asc");
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.name) // No es necesario el array dentro de array
//           .sort((a, b) =>
//             a.name.localeCompare(b.name, undefined, { undefined: "base" })
//           );
//         break;
//       case "nombreDesc":
//         //console.log("Sorting by Nombre Desc");
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.name)
//           .sort((a, b) =>
//             b.name.localeCompare(a.name, undefined, { undefined: "base" })
//           );
//         break;
//       default:
//         break;
//     }

//     //! filtro por origen

//     let filterOrigen = [...nameOrder];
//     //console.log("Updated Name Order:", nameOrder);

//     if (origenVideogame === "database") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame.created === true
//       );
//     } else if (origenVideogame === "api") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame.created === false
//       );
//     }

//     //! filtro por genero

//     let filterGenre = [...filterOrigen];

//     if (selectGenre !== "all") {
//       filterGenre = filterGenre.filter(
//         (videoGame) =>
//           videoGame.genres && videoGame.genres.includes(selectGenre)
//       );
//     }

//     setListOrdVideogame(filterGenre);

//     //! ordenamiento por rating

//     switch (selectOrderRating) {
//       case "ratingAsc":
//         filterOrigen.sort(
//           (a, b) => filtroRating(a.rating) - filtroRating(b.rating)
//         );
//         break;
//       case "ratingDesc":
//         filterOrigen.sort(
//           (a, b) => filtroRating(b.rating) - filtroRating(a.rating)
//         );
//         break;
//       default:
//         break;
//     }

//     setListOrdVideogame(filterOrigen);
//   }, [
//     videoGamesList,
//     selectOrderName,
//     selectOrderRating,
//     origenVideogame,
//     selectGenre,
//   ]);

//   const handleCreatedFilter = (event) => {
//     setOrigenVideogame(event.target.value);
//   };

//   const handleGenreFilter = (event) => {
//     setSelectGenre(event.target.value);
//   };

//   const handleSortName = (event) => {
//     setSelectOrderName(event.target.value);
//     setSelectOrderRating("default");
//   };

//   const handleSortRating = (event) => {
//     setSelectOrderRating(event.target.value);
//   };

//   const filtroRating = (ratingData) => {
//     if (typeof ratingData === "string") {
//       const ratingMaxMin = ratingData.split(" - ");
//       const ratingMinimo = parseInt(ratingMaxMin[0]);
//       return ratingMinimo;
//     } else if (typeof ratingData === "number") {
//       return ratingData;
//     }
//     return 0;
//   };

//   const numPrimCard = pagActual * cardsPorPag;
//   const numUltCard = numPrimCard - cardsPorPag;
//   const cardActual = listOrdVideogame.slice(numUltCard, numPrimCard);

//   const totalPag = Math.ceil(listOrdVideogame.length / cardsPorPag);

//   const paginate = (pageNumber) => setPagActual(pageNumber);

//   const genresArray = genres.length > 0 ? genres[0] : [];

//   return (
//     <div className="cards-container">
//       <div className="all-select">
//         <div className="box-filter">
//           <h3>Ordena por Nombre:</h3>
//           <select
//             value={selectOrderName}
//             onChange={handleSortName}
//             className="selOption"
//           >
//             <option value="nombreAsc">Nombre (A-Z)</option>
//             <option value="nombreDesc">Nombre (Z-A)</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Ordenar por rating: </h3>
//           <select
//             value={selectOrderRating}
//             onChange={handleSortRating}
//             className="selOption"
//           >
//             <option value="default">Default</option>
//             <option value="ratingAsc">Rating (Menor a Mayor)</option>
//             <option value="ratingDesc">Rating (Mayor a Menor)</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Origen:</h3>
//           <select
//             value={origenVideogame}
//             onChange={handleCreatedFilter}
//             className="selOption"
//           >
//             <option value="all">Todos los juegos</option>
//             <option value="database">Juegos de Base de datos</option>
//             <option value="api">Juegos de API</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Genero: </h3>
//           <select
//             value={selectGenre}
//             onChange={handleGenreFilter}
//             className="selOption"
//           >
//             <option key="all" value="all">
//               Todos los generos
//             </option>
//             {genresArray.map((genre) => (
//               <option key={genre.id} value={genre.name}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <br />
//       <div className="cards-list">
//         {cardActual.length > 0 ? (
//           cardActual.map((videoGame, index) => (
//             <Card key={index} videoGame={videoGame} />
//           ))
//         ) : (
//           <p>No hay juegos en esta pagina</p>
//         )}
//       </div>
//       <div className="pagination-container">
//         {listOrdVideogame.length > cardsPorPag && (
//           <div>
//             {Array.from({ length: totalPag }, (_, index) => (
//               <button key={index + 1} onClick={() => paginate(index + 1)}>
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Cards;

//! CODIGO CON LA MODIFICACION DE ARRAY DENTRO DE ARRAY
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../card/card.component";
// import "./cards.styles.css";
// import { useEffect, useState } from "react";
// import { getGenres } from "../../redux/actions";

// function Cards({ allVideoGames }) {
//   const videoGamesList = allVideoGames;
//   const cardsPorPag = 15;
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);
//   console.log(videoGamesList);

//   const [pagActual, setPagActual] = useState(1);
//   const [listOrdVideogame, setListOrdVideogame] = useState([]);
//   const [selectOrderName, setSelectOrderName] = useState("nameAsc");
//   const [selectOrderRating, setSelectOrderRating] = useState("default");
//   const [origenVideogame, setOrigenVideogame] = useState("all");
//   const [selectGenre, setSelectGenre] = useState("all");

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("Videogames list update: ", videoGamesList);
//     console.log("Select order name:", selectOrderName);

//     let nameOrder = [...videoGamesList];

//     //! filtro por name
//     switch (selectOrderName) {
//       case "nombreAsc":
//         console.log("Sorting by Nombre Asc");
//         nameOrder = nameOrder
//           .filter((videoGameArray) => videoGameArray[0].name)
//           .sort((a, b) =>
//             a[0].name.localeCompare(b[0].name, undefined, { undefined: "base" })
//           );
//         break;
//       case "nombreDesc":
//         console.log("Sorting by Nombre Desc");
//         nameOrder = nameOrder
//           .filter((videoGameArray) => videoGameArray[0].name)
//           .sort((a, b) =>
//             b[0].name.localeCompare(a[0].name, undefined, { undefined: "base" })
//           );
//         break;
//       default:
//         break;
//     }

//     //! filtro por origen

//     let filterOrigen = [...nameOrder];
//     console.log("Updated Name Order:", nameOrder);

//     if (origenVideogame === "database") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame[0].created === true
//       );
//     } else if (origenVideogame === "api") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame[0].created === false
//       );
//     }

//     //! filtro por genero

//     let filterGenre = [...filterOrigen];

//     if (selectGenre !== "all") {
//       filterGenre = filterGenre.filter(
//         (videoGameArray) =>
//           videoGameArray[0].genres &&
//           videoGameArray[0].genres.includes(selectGenre)
//       );
//     }

//     setListOrdVideogame(filterGenre);

//     switch (selectOrderRating) {
//       case "ratingAsc":
//         filterOrigen.sort(
//           (a, b) => filtroRating(a[0].rating) - filtroRating(b[0].rating)
//         );
//         break;
//       case "ratingDesc":
//         filterOrigen.sort(
//           (a, b) => filtroRating(b[0].rating) - filtroRating(a[0].rating)
//         );
//         break;
//       default:
//         break;
//     }

//     setListOrdVideogame(filterOrigen);
//   }, [
//     videoGamesList,
//     selectOrderName,
//     selectOrderRating,
//     origenVideogame,
//     selectGenre,
//   ]);

//   const handleCreatedFilter = (event) => {
//     setOrigenVideogame(event.target.value);
//   };

//   const handleGenreFilter = (event) => {
//     setSelectGenre(event.target.value);
//   };

//   const handleSortName = (event) => {
//     setSelectOrderName(event.target.value);
//     setSelectOrderRating("default");
//   };

//   const handleSortRating = (event) => {
//     setSelectOrderRating(event.target.value);
//   };

//   const filtroRating = (ratingData) => {
//     // Verificar si ratingData es un string o un número
//     if (typeof ratingData === "string") {
//       // Manejar el caso en que ratingData es una cadena
//       const ratingMaxMin = ratingData.split(" - ");
//       const ratingMinimo = parseInt(ratingMaxMin[0]);
//       return ratingMinimo;
//     } else if (typeof ratingData === "number") {
//       // Manejar el caso en que ratingData es un número
//       return ratingData;
//     }
//     // Manejar otros casos, por ejemplo, si ratingData no es ni cadena ni número
//     return 0; // O cualquier valor predeterminado que desees asignar
//   };

//   const numPrimCard = pagActual * cardsPorPag;
//   const numUltCard = numPrimCard - cardsPorPag;
//   const cardActual = listOrdVideogame.slice(numUltCard, numPrimCard);

//   const totalPag = Math.ceil(listOrdVideogame.length / cardsPorPag);

//   const paginate = (pageNumber) => setPagActual(pageNumber);

//   const genresArray = genres.length > 0 ? genres[0] : [];

//   return (
//     <div className="cards-container">
//       <div className="all-select">
//         <div className="box-filter">
//           <h3>Ordena por Nombre:</h3>
//           <select
//             value={selectOrderName}
//             onChange={handleSortName}
//             className="selOption"
//           >
//             <option value="nombreAsc">Nombre (A-Z)</option>
//             <option value="nombreDesc">Nombre (Z-A)</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Ordenar por rating: </h3>
//           <select
//             value={selectOrderRating}
//             onChange={handleSortRating}
//             className="selOption"
//           >
//             <option value="default">Default</option>
//             <option value="ratingAsc">Rating (Menor a Mayor)</option>
//             <option value="ratingDesc">Rating (Mayor a Menor)</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Origen:</h3>
//           <select
//             value={origenVideogame}
//             onChange={handleCreatedFilter}
//             className="selOption"
//           >
//             <option value="all">Todos los juegos</option>
//             <option value="database">Juegos de Base de datos</option>
//             <option value="api">Juegos de API</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Genero: </h3>
//           <select
//             value={selectGenre}
//             onChange={handleGenreFilter}
//             className="selOption"
//           >
//             <option key="all" value="all">
//               Todos los generos
//             </option>
//             {genresArray.map((genre) => (
//               <option key={genre.id} value={genre.name}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <br />
//       <div className="cards-list">
//         {cardActual.length > 0 ? (
//           cardActual.map((videoGame, index) => (
//             <Card key={index} videoGame={videoGame} />
//           ))
//         ) : (
//           <p>No hay juegos en esta pagina</p>
//         )}
//       </div>
//       <div className="pagination-container">
//         {listOrdVideogame.length > cardsPorPag && (
//           <div>
//             {Array.from({ length: totalPag }, (_, index) => (
//               <button key={index + 1} onClick={() => paginate(index + 1)}>
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Cards;

//! ESTE ES MI CARDS ANTES DE MODIFICACION PARA ORDENAMIENTO DE CARDS Y SEPARAR NOMBRES DE RATING
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../card/card.component";
// import "./cards.styles.css";
// import { useEffect, useState } from "react";
// import { getGenres } from "../../redux/actions";

// function Cards({ allVideoGames }) {
//   const videoGamesList = allVideoGames;
//   const cardsPorPag = 15;
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);
//   //console.log(genres);

//   const [pagActual, setPagActual] = useState(1);
//   const [listOrdVideogame, setListOrdVideogame] = useState([]);
//   const [selectOrder, setSelectOrder] = useState("nameAsc");
//   const [origenVideogame, setOrigenVideogame] = useState("all");
//   const [selectGenre, setSelectGenre] = useState("all");

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   useEffect(() => {
//     let nameOrder = [...videoGamesList];
//     // nameOrder = videoGamesList;

//     switch (selectOrder) {
//       case "nombreAsc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.name)
//           .sort((a, b) =>
//             a.name.localeCompare(b.name, undefined, { undefined: "base" })
//           );
//         break;
//       case "nombreDesc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.name)
//           .sort((a, b) =>
//             b.name.localeCompare(a.name, undefined, { undefined: "base" })
//           );
//         break;
//       case "ratingAsc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.rating)
//           .sort((a, b) => filtroRating(a.rating) - filtroRating(b.rating));
//         break;
//       case "ratingDesc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.rating)
//           .sort((a, b) => filtroRating(b.rating) - filtroRating(a.rating));
//         break;
//       default:
//         break;
//     }

//     let filterOrigen = [...nameOrder];

//     if (origenVideogame === "database") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame.created === true
//       );
//     } else if (origenVideogame === "api") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame.created === false
//       );
//     }

//     setListOrdVideogame(filterOrigen);
//   }, [videoGamesList, selectOrder, origenVideogame, selectGenre]);

//   const handleCreatedFilter = (event) => {
//     setOrigenVideogame(event.target.value);
//   };

//   const handleGenreFilter = (event) => {
//     setSelectGenre(event.target.value);
//   };

//   const handleSort = (event) => {
//     setSelectOrder(event.target.value);
//   };

//   const filtroRating = (ratingString) => {
//     const ratingMaxMin = ratingString.split(" - ");
//     const ratingMinimo = parseInt(ratingMaxMin[0]);
//     return ratingMinimo;
//   };

//   const numPrimCard = pagActual * cardsPorPag;
//   const numUltCard = numPrimCard - cardsPorPag;
//   const cardActual = listOrdVideogame.slice(numUltCard, numPrimCard);

//   const totalPag = Math.ceil(listOrdVideogame.length / cardsPorPag);

//   const paginate = (pageNumber) => setPagActual(pageNumber);

//   const genresArray = genres.length > 0 ? genres[0] : [];

//   return (
//     <div className="cards-container">
//       <div className="all-select">
//         <div className="box-filter">
//           <h3>Orden:</h3>
//           <select
//             value={selectOrder}
//             onChange={handleSort}
//             className="selOption"
//           >
//             <option value="nombreAsc">Nombre (A-Z)</option>
//             <option value="nombreDesc">Nombre (Z-A)</option>
//             <option value="ratingAsc">Rating (Menor a Mayor)</option>
//             <option value="ratingDesc">Rating (Mayor a Menor)</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Origen:</h3>
//           <select
//             value={origenVideogame}
//             onChange={handleCreatedFilter}
//             className="selOption"
//           >
//             <option value="all">Todos los juegos</option>
//             <option value="database">Juegos de Base de datos</option>
//             <option value="api">Juegos de API</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Genero: </h3>
//           <select
//             value={selectGenre}
//             onChange={handleGenreFilter}
//             className="selOption"
//           >
//             <option key="all" value="all">
//               Todos los generos
//             </option>
//             {genresArray.map((genre) => (
//               <option key={genre.id} value={genre.name}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <br />
//       <div className="cards-list">
//         {cardActual.length > 0 ? (
//           cardActual.map((videoGame, index) => (
//             <Card key={index} videoGame={videoGame} />
//           ))
//         ) : (
//           <p>No hay juegos en esta pagina</p>
//         )}
//       </div>
//       <div className="pagination-container">
//         {listOrdVideogame.length > cardsPorPag && (
//           <div>
//             {Array.from({ length: totalPag }, (_, index) => (
//               <button key={index + 1} onClick={() => paginate(index + 1)}>
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Cards;

//!Esto que esta para abajo es antiguo

//return (
//   <div>
//     <div>
//       <div>
//         <h3>Orden:</h3>
//         <select
//           value={selectOrder}
//           onChange={handleSort}
//           className="selOption"
//         >
//           <option value="nombreAsc">Nombre (A-Z)</option>
//           <option value="nombreDesc">Nombre (Z-A)</option>
//           <option value="ratingAsc">Rating (Menor a Mayor)</option>
//           <option value="ratingDesc">Rating (Mayor a Menor)</option>
//         </select>
//       </div>
//       <div>
//         <h3>Origen:</h3>
//         <select
//           value={origenVideogame}
//           onChange={handleCreatedFilter}
//           className="selOption"
//         >
//           <option value="all">Todos los juegos</option>
//           <option value="database">Juegos de Base de datos</option>
//           <option value="api">Juegos de API</option>
//         </select>
//       </div>
//     </div>
//     <br />
//     <div className="cards-list">
//       {cardActual.length > 0 ? (
//         cardActual.map((videoGame, index) => (
//           <Card key={index} videoGame={videoGame} />
//         ))
//       ) : (
//         <p>No hay juegos en esta pagina</p>
//       )}
//     </div>
//     <div>
//       {listOrdVideogame.length>cardsPorPag && (
//         <div>
//           <Array.from({length: totalPag}, (_, index) => (
//             <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// )

// import { useDispatch, useSelector } from "react-redux";
// import Card from "../card/card.component";
// import "./cards.styles.css";
// import { useEffect, useState } from "react";
// import { getGenres } from "../../redux/actions";

// function Cards({ allVideoGames }) {
//   const videoGamesList = allVideoGames;
//   const cardsPorPag = 15;
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);

//   const [pagActual, setPagActual] = useState(1);
//   const [listOrdVideogame, setListOrdVideogame] = useState([]);
//   const [selectOrder, setSelectOrder] = useState("nombreAsc");
//   const [origenVideogame, setOrigenVideogame] = useState("all");

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   useEffect(() => {
//     let nameOrder = [...videoGamesList];

//     switch (selectOrder) {
//       case "nombreAsc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.name)
//           .sort((a, b) =>
//             a.name.localeCompare(b.name, undefined, { undefined: "base" })
//           );
//         break;
//       case "nombreDesc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.name)
//           .sort((a, b) =>
//             b.name.localeCompare(a.name, undefined, { undefined: "base" })
//           );
//         break;
//       case "ratingAsc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.rating)
//           .sort((a, b) => filtroRating(a.rating) - filtroRating(b.rating));
//         break;
//       case "ratingDesc":
//         nameOrder = nameOrder
//           .filter((videoGame) => videoGame.rating)
//           .sort((a, b) => filtroRating(b.rating) - filtroRating(a.rating));
//         break;
//       default:
//         break;
//     }

//     let filterOrigen = [...nameOrder];

//     if (origenVideogame === "database") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame.created === true
//       );
//     } else if (origenVideogame === "api") {
//       filterOrigen = filterOrigen.filter(
//         (videoGame) => videoGame.created === false
//       );
//     }

//     setListOrdVideogame(filterOrigen);
//   }, [videoGamesList, selectOrder, origenVideogame]);

//   const handleCreatedFilter = (event) => {
//     setOrigenVideogame(event.target.value);
//   };

//   const handleSort = (event) => {
//     setSelectOrder(event.target.value);
//   };

//   const filtroRating = (ratingString) => {
//     const ratingMaxMin = ratingString.split(" - ");
//     const ratingMinimo = parseInt(ratingMaxMin[0]);
//     return ratingMinimo;
//   };

//   const numPrimCard = pagActual * cardsPorPag;
//   const numUltCard = numPrimCard - cardsPorPag;
//   const cardActual = listOrdVideogame.slice(numUltCard, numPrimCard);

//   const totalPag = Math.ceil(listOrdVideogame.length / cardsPorPag);

//   const paginate = (pageNumber) => setPagActual(pageNumber);

//   return (
//     <div className="cards-container">
//       <div className="all-select">
//         <div className="box-filter">
//           <h3>Orden:</h3>
//           <select
//             value={selectOrder}
//             onChange={handleSort}
//             className="selOption"
//           >
//             <option value="nombreAsc">Nombre (A-Z)</option>
//             <option value="nombreDesc">Nombre (Z-A)</option>
//             <option value="ratingAsc">Rating (Menor a Mayor)</option>
//             <option value="ratingDesc">Rating (Mayor a Menor)</option>
//           </select>
//         </div>
//         <div className="box-filter">
//           <h3>Origen:</h3>
//           <select
//             value={origenVideogame}
//             onChange={handleCreatedFilter}
//             className="selOption"
//           >
//             <option value="all">Todos los juegos</option>
//             <option value="database">Juegos de Base de Datos</option>
//             <option value="api">Juegos de API</option>
//           </select>
//         </div>
//         {/* Puedes agregar aquí el bloque para temperamentos si es necesario */}
//       </div>

//       <br />
//       <div className="cards-list">
//         {cardActual.length > 0 ? (
//           cardActual.map((videoGame, index) => (
//             <Card key={index} videoGame={videoGame} />
//           ))
//         ) : (
//           <p>No hay juegos en esta página</p>
//         )}
//       </div>

//       <div className="pagination-container">
//         {listOrdVideogame.length > cardsPorPag && (
//           <div className="pagination">
//             {Array.from({ length: totalPag }, (_, index) => (
//               <button key={index + 1} onClick={() => paginate(index + 1)}>
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cards;
