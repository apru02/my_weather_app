import React from "react";
import "../App.css";
import { useState } from "react";
export default function Search({ on_search }) {
  const [myCity, setMyCity] = useState("");
  const handleInputChange = (event) => {
    setMyCity(event.target.value);
  };
  const handleSubmit=(event)=>{
    event.preventDefault()
    on_search(myCity);
  }
  return (
    <form
      className="d-flex"
      style={{ justifyContent: "center" }}
      role="search"
      width="40px"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search your City"
        aria-label="Search"
        style={{ width: "45%" }}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
