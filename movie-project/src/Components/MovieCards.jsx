import '../styles/home.css'

const MovieCards = ({movie}) => {
    const ClickFavourite = () => {
        alert("Added to favourites");
    }
    return (
        <>    
        <div className="card">
        <div className='Moviebox'>
            <div className='Moviecard'>
                <div className='Favourites'>
                    <button onClick={ClickFavourite}>💗</button>
                </div>
                <div className='movieImage'>
                <img src={movie.img} alt={movie.title} />
                </div>
                
            </div>
            <div className='MovieDetails'>
                <h1>Movie:{movie.title}</h1>
                <h1>Release Date:{movie.year}</h1>
            </div>
        </div>
        </div>
        </>
    )
}
export default MovieCards