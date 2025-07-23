import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { TMDbService } from '../services/tmdbService';
import MainLayout from '../layouts/MainLayouts';
import Loader from '../components/Loader';

function ShowDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const tmdbService = new TMDbService();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const fetchMovie = async () => {
        try {
            const movie = await tmdbService.getTVDetails(id);
            console.log(movie);
            setMovie(movie);
        } catch (e) {
            navigate("/");
        }
    };

    if (!movie) return (<Loader loading={true} />);

    return (
        <MainLayout>
            <Background background={tmdbService.getImageUrl(movie.backdrop_path, "original")}>
                <Overlay />
                <Content>
                    <Poster src={tmdbService.getImageUrl(movie.poster_path, "original")}/>
                    <Title>{movie.title}</Title>
                    <Genres>
                        {movie.genres?.map((g) => (
                            <Genre key={g.id}>{g.name}</Genre>
                        ))}
                    </Genres>
                    <Info>
                        <span><strong>Release:</strong> {movie.release_date}</span>
                        <span><strong>Rating:</strong> ⭐ {movie.vote_average}/10</span>
                    </Info>
                    <Overview>{movie.overview}</Overview>
                </Content>
            </Background>
        </MainLayout>
    );
}

export default ShowDetails;

const Poster = styled.img`
height:400px;
margin-bottom:20px;
`;

const Background = styled.div`
  position: relative;
  min-height: 100vh;
  background: url(${props => props.background}) no-repeat center center/cover;
  display: flex;
  align-items: flex-end;
  padding: 60px 30px;
  color: white;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0,0,0,0.2));
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  max-width: 800px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Genres = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const Genre = styled.span`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 6px 12px;
  border-radius: 30px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const Info = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (min-width: 500px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const Overview = styled.p`
  line-height: 1.7;
  font-size: 1.1rem;
  color: #ddd;
`;

const Loading = styled.div`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-top: 100px;
`;
