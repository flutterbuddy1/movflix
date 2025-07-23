import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NetflixCard = ({ id, type, image, title, rating , data, page}) => {
    const navigate = useNavigate();
    return (
        <Card className='col-3' onClick={() => type == "tv" ? navigate(`/show/${id}`) : page == "movie" ? navigate(`/movie/${id}`) : navigate(`/show/${id}`)}>
            <Poster src={image} alt={title} />
            <CardOverlay>
                <Title>{title}</Title>
                {rating && <Rating>⭐ {rating}</Rating>}
            </CardOverlay>
        </Card>
    );
};

export default NetflixCard;
const Card = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #141414;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.08);
    z-index: 10;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 210px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, #000, transparent);
  color: #fff;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.h4`
  font-size: 1rem;
  margin: 0;
`;

const Rating = styled.span`
  font-size: 0.9rem;
  color: #f5c518;
`;
