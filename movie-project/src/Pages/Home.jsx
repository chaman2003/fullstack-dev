import { useState } from "react";
import MovieCards from "../Components/MovieCards";

function Home() {
  const movies = [
    { id: 1, title: "Inception", year: 2010 , img:"https://www.tallengestore.com/cdn/shop/products/Inception-LeonardoDiCaprio-ChristopherNolan-HollywoodSciFiMoviePoster2.jpg?v=1685582017"},
    { id: 2, title: "The Dark Knight", year: 2008 , img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ekE6Hhz9gvIbiFSUPxt-FyAh4zXTXX0bjQ&s"},
    { id: 3, title: "Interstellar", year: 2014, img: "https://m.media-amazon.com/images/I/91UMpWgj05L._UF1000,1000_QL80_.jpg" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  function submitform(e) {
    e.preventDefault();
    alert(searchQuery);
    // setSearchQuery("---")
  }
  return (
    <>
    <div className="home-root">
      <form action="submitform" onSubmit={submitform} className="submit">
        <input
          type="text"
          placeholder="Search your movie"
          className="inp"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="Movie-grid">
        {movies.map((movie) => (
          movie.title.toLowerCase().startsWith(searchQuery) && (
            <MovieCards movie={movie} key={movie.id} />
          )
        ))}
      </div>
      </div>
    </>
  );
}
export default Home;