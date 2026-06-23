import React from "react";

const Propexample = ({ movie }) => {
  return (
    <>
      <h1>Movie List</h1>

      <div style={{ border: "1px solid black", padding: "10px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {movie.map((item) => (
          <div key={item.title}>
            
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <h1>Movie name is {item.title}</h1>
              <p>Hero is {item.hero}</p>
              <img src={item.image} style={{ width: "200px" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button>Watch</button>
                <button>Save</button>
                <button>Review</button>
                <button>Ignore</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Propexample;

