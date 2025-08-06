import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import "../css/player.css";
import { useNavigate, useParams } from 'react-router-dom';
import { TMDbService } from '../services/tmdbService';
import Loader from '../components/Loader';

function TvPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // default to loading
    const tmdbService = new TMDbService();

    const fetchLink = async () => {
        try {
            const movie = await tmdbService.getMovieVideo(id);
            console.log(movie);
            if (movie?.results?.length > 0) {
                setData(movie.results[0]);
            } else {
                setData(null);
            }
        } catch (error) {
            console.error("Error fetching movie video:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLink();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundColor: "black"
        }}>

            <Loader loading={loading} />

            <button className="back-btn" onClick={() => navigate(-1)} style={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 2
            }}>
                <FaArrowLeft />
            </button>

            {!loading && (
                data ? (
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ aspectRatio: "16/9" }}
                        src={`https://www.youtube.com/embed/${data.key}?autoplay=1`}
                        title={data.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <h3 className='text-white'>Video Not Available</h3>
                )
            )}
        </div>
    );
}

export default TvPlayer;