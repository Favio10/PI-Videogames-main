import { Link } from "react-router-dom";
import React from "react";
import "./navbar.styles.css";

function Navbar({ handleSearch }) {
  function handleChange(e) {
    handleSearch(e.target.value);
  }

  return (
    <div className="search-box">
      <Link to="/">
        <button className="exit">Exit</button>
      </Link>
      <form>
        <input
          type="search"
          placeholder="Tipea un nombre"
          onChange={handleChange}
        />
      </form>
      <Link to="/form">
        <button>Create your Game</button>
      </Link>
      <Link to="/about">
        <button className="about">About</button>
      </Link>
    </div>
  );
}
export default Navbar;
