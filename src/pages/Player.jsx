import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import "../css/player.css"
import { useNavigate, useParams } from 'react-router-dom'
import { TMDbService } from '../services/tmdbService';
import Loader from '../components/Loader';

function Player() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const tmdbService = new TMDbService();
    const fetchLink = async () => {
        setLoading(true);
        const movie = await tmdbService.getMovieVideo(id);
        setData(movie.results[0]);
        console.log(movie.results[0]);

    }
    useEffect(() => {
        fetchLink();
    }, [])
    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        }}>

            <Loader loading={loading} />
            <button className="back-btn" onClick={() => navigate(-1)}>
                <FaArrowLeft />
            </button>
            <iframe
                width="100%"
                height="100%"
                style={{
                    aspectRatio: "16/9"
                }}
                src={`https://www.youtube.com/embed/${data.key}/?autoplay=1`}
                title={data.name}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
        </div>
    )
}

export default Player
