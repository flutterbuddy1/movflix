import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Hero = ({ backgroundImage, title, description, data, page = "movie" }) => {
    const navigate = useNavigate();
    return (
        <HeroContainer>
            <Background image={backgroundImage} />
            <Overlay />
            <Content>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Buttons>
                    <PlayButton onClick={() => data.media_type == "tv" ? navigate(`/show/${data.id}`) : page == "movie" ? navigate(`/movie/${data.id}`) : navigate(`/show/${data.id}`)}>▶ Play</PlayButton>
                    {/* <MyListButton>＋ My List</MyListButton> */}
                </Buttons>
            </Content>
        </HeroContainer>
    );
};

export default Hero;

// ---------------- STYLES ----------------

const HeroContainer = styled.div`
  position: relative;
  height: 90vh;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 75vh;
  }
`;

const Background = styled.div`
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, #111 10%, transparent 90%);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #ddd;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Buttons = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
`;

const PlayButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const MyListButton = styled.button`
  background-color: rgba(109, 109, 110, 0.7);
  color: #fff;
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(109, 109, 110, 0.4);
  }
`;
