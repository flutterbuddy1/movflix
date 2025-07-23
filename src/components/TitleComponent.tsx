import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function TitleComponent({ title, showAll = true}) {
    const navigate = useNavigate();
    return (
        <CustomContainer className='container'>
            <Title>{title}</Title>
            {showAll ? <ShowAllButton onClick={()=>navigate("/movies")}>Show All</ShowAllButton> : <></>}
        </CustomContainer>
    );
}

export default TitleComponent;

const CustomContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ShowAllButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #f40612;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;
