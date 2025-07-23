import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayouts';
import Hero from '../components/Hero';
import TitleComponent from '../components/TitleComponent';
import MoviesList from '../components/MoviesList';
import { TMDbService } from '../services/tmdbService';
import Loader from '../components/Loader';
import styled from 'styled-components';

function TVShows() {
    const [topShows, setTopShows] = useState([]);
    const [coverShow, setCoverShow] = useState({});
    const [loading, setLoading] = useState(false);

    const tmdbService = new TMDbService();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = parseInt(searchParams.get("page")) || 1;

    useEffect(() => {
        fetchShows(page);
        // eslint-disable-next-line
    }, [page]);

    const fetchShows = async (pageNum) => {
        setLoading(true);
        try {
            let response = await tmdbService.getPopularShows(pageNum);
            setTopShows(response);
            const randomIndex = Math.floor(Math.random() * response.length);
            setCoverShow(response[randomIndex]);
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
        setLoading(false);
    };

    const handleNext = () => {
        setSearchParams({ page: page + 1 });
    };

    const handlePrevious = () => {
        setSearchParams({ page: page - 1 });
    };

    return (
        <MainLayout>
            <Loader loading={loading} />
            <Hero
                backgroundImage={tmdbService.getImageUrl(coverShow.backdrop_path || coverShow.poster_path, 'original')}
                title={coverShow.name || coverShow.title}
                description={coverShow.overview}
                data={coverShow}
                page="tv"
            />

            <TitleComponent title={`Top Rated TV Shows - Page ${page}`} showAll={false} />
            <MoviesList list={topShows} page="tv" />

            <PaginationWrapper>
                <button disabled={page <= 1} onClick={handlePrevious}>Previous</button>
                <span>Page {page}</span>
                <button onClick={handleNext}>Next</button>
            </PaginationWrapper>

            <div className='mb-5' />
        </MainLayout>
    );
}

export default TVShows;


// Styled Pagination
const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
    gap: 20px;

    button {
        padding: 10px 20px;
        background-color: #e50914;
        border: none;
        color: white;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.3s ease;
        &:disabled {
            background-color: #555;
            cursor: not-allowed;
        }
    }

    span {
        color: white;
        font-size: 1.1rem;
    }
`;
