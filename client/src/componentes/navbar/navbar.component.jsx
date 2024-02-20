import { Link } from "react-router-dom";
import React from "react";
import "./navbar.styles.css";

function Navbar({ handleSearch }) {
  function handleChange(e) {
    handleSearch(e.target.value);
  }

  return (
    <div className="search-box">
      <br />
      <Link to="/">
        <button className="buttonExit">Exit</button>
      </Link>
      <form>
        <input
          type="search"
          placeholder="Tipea un nombre"
          onChange={handleChange}
          className="inputSearch"
        />
      </form>
      <Link to="/form">
        <button className="buttonCreate">Create</button>
      </Link>
      <Link to="/about">
        <button className="buttonAbout">About</button>
      </Link>
    </div>
  );
}
export default Navbar;
