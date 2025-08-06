import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { TMDbService } from '../services/tmdbService';
import MainLayout from '../layouts/MainLayouts';
import Loader from '../components/Loader';
import { FaPlay } from 'react-icons/fa';

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
          <PosterArea>
            <Poster src={tmdbService.getImageUrl(movie.poster_path, "original")} />
            <PlayBtn className='playbtn' onClick={() => navigate(`/tv-player/${id}`)}>
              <FaPlay className='icon' />
              Play
            </PlayBtn>
          </PosterArea>
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
          <SecondaryPlayBtn onClick={() => navigate(`/tv-player/${id}`)}>
            <FaPlay className='icon' />
            Watch Now
          </SecondaryPlayBtn>
        </Content>
      </Background>
      <div className="container pb-4">
        {movie.seasons?.length > 0 && (
          <SeasonsSection>
            <SeasonHeading>Seasons</SeasonHeading>
            <SeasonsGrid>
              {movie.seasons.map((season) => (
                <SeasonCard key={season.id}>
                  <SeasonPoster
                    src={tmdbService.getImageUrl(season.poster_path, "w300")}
                    alt={season.name}
                  />
                  <SeasonInfo>
                    <h3>{season.name}</h3>
                    <small>📅 {season.air_date || "Unknown date"}</small>
                    <small>🎬 {season.episode_count} Episodes</small>
                  </SeasonInfo>
                </SeasonCard>
              ))}
            </SeasonsGrid>
          </SeasonsSection>
        )}
      </div>
    </MainLayout>
  );
}

export default ShowDetails;



const PosterArea = styled.div`
height:400px;
width:260px;
margin-bottom:20px;
position:relative;
overflow:hidden;
margin-top:60px;
&:hover .playbtn{
left:0;
right:0;
bottom:0;
top:0;
border:none;
visibility: visible;
background:rgba(0,0,0,0.5);
}

@media (max-width: 768px) {
    height:250px;
    width:170px;
  }
`;


const Poster = styled.img`
height:100%;
position:absolute;
object-fit:cover;
`;

const PlayBtn = styled.button`
    position:absolute;
    visibility: hidden;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:white;
    font-size:20px;
    font-width:bold;
    .icon {
      color:white;
      font-size:25px;
      margin-bottom:10px;
    }
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

const SeasonsSection = styled.div`
  margin-top: 40px;
`;

const SeasonHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fff;
`;

const SeasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
`;

const SeasonCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const SeasonPoster = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SeasonInfo = styled.div`
  padding: 10px;
  color: #ccc;

  h3 {
    font-size: 1rem;
    margin-bottom: 6px;
    color: #fff;
  }

  small {
    display: block;
    margin-bottom: 4px;
    font-size: 0.85rem;
  }
`;

const SecondaryPlayBtn = styled(PlayBtn)`
  position: static;
  margin-top: 20px;
  background-color: #e50914;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  visibility: visible;
  border: none;

  .icon {
    font-size: 1.2rem;
    margin-right: 10px;
    margin-bottom: 0;
  }

  display: inline-flex;
  flex-direction: row;
`;
