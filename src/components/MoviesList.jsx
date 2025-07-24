import React from 'react'
import NetflixCard from './NetflixCard'
import { TMDbService } from '../services/tmdbService';

function MoviesList({ list , page="movie"}) {
    let tmdbService = new TMDbService();

    if(list.length <= 0) return (<div className='container p-4'>
        <h4 className='text-center text-white'>No {page == "tv" ? "shows" : "movies"} found!</h4>
    </div>);
    return (
        <div className='container'>
        <div className='row'>
            {list.map((movie) => (<NetflixCard
                id={movie.id}
                key={movie.id}
                page={page}
                type={movie.media_type}
                image={tmdbService.getImageUrl(movie.poster_path)}
                title={movie.title}
                data={movie}
                rating={movie.vote_average}
            />))}
        </div>
        </div>
    )
}

export default MoviesList