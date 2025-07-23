import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MoviesList from '../components/MoviesList';
import TitleComponent from '../components/TitleComponent';
import { TMDbService } from '../services/tmdbService';
import MainLayout from '../layouts/MainLayouts';
import Loader from '../components/Loader';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [coverMovie, setCoverMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const tmdbService = new TMDbService();
  useEffect(() => {
    fetchMovies();
  }, [])

  const fetchMovies = async () => {
    setLoading(true);
    let trm = await tmdbService.getTrending("all", "week");
    setTopMovies(trm);

    let mvs = await tmdbService.getPopularMovies();
    setMovies(mvs);
    let randomMovie = Math.floor(Math.random() * mvs.length) + 1;
    setCoverMovie(mvs[randomMovie]);

    setLoading(false);
  }

  return loading ? (
    <MainLayout>
      <Loader loading={loading} />
    </MainLayout>
  ):(
    <MainLayout>
      <Hero
        backgroundImage={tmdbService.getImageUrl(coverMovie.poster_path, 'original')}
        title={coverMovie.title}
        data={coverMovie}
        description={coverMovie.overview}
      />

      <TitleComponent title={"Top Rated"} />
      <MoviesList list={topMovies} />

      <TitleComponent title={"Popular"} />
      <MoviesList list={movies} />
      <div className='mb-5'/>
    </MainLayout>
  )
}
