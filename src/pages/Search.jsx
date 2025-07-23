import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayouts';
import { TMDbService } from '../services/tmdbService';
import TitleComponent from '../components/TitleComponent';
import MoviesList from '../components/MoviesList';

function Search() {
    const [movies, setMovie] = useState([]);
    const [shows, setShows] = useState([]);
    const { query } = useParams();
    const tmdbService = new TMDbService();
    useEffect(() => {
        searchQuery();
    }, [query])

    const searchQuery = async () => {
        const mov = await tmdbService.search(query, "movie");
        setMovie(mov);
        const sh = await tmdbService.search(query, "tv");
        setShows(sh);
    }
    return (
        <MainLayout>
            <div style={{
                minHeight: '80vh',
                paddingTop: "100px"
            }}>
                <div className="container">
                    <h4 className='text-white'>Result for: {query}</h4>
                </div>
                <TitleComponent title={`Movie`} showAll={false} />
                <MoviesList list={movies} />

                <TitleComponent title={`Shows`} showAll={false} />
                <MoviesList list={shows} page='tv' />

            </div>
            <div className='mb-5' />
        </MainLayout>
    )
}

export default Search
