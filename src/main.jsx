import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import Home from './pages/Home';
import TVShows from './pages/TVShows';
import MovieDetails from './pages/MovieDetails';
import ShowDetails from './pages/ShowDetails';
import Movies from './pages/Movies';
import Search from './pages/Search';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/tv-shows' element={<TVShows />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/show/:id' element={<ShowDetails />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
