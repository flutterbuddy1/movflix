import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiX } from 'react-icons/fi'; // Icons

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Handle search logic here (e.g., navigate to results)
      console.log("Search for:", searchQuery);
      navigate(`/search/${searchQuery}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <NavBarContainer scrolled={scrolled}>
        <LogoText onClick={()=>navigate("/")}>
          <span>MOV</span>FLIX
        </LogoText>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/tv-shows">TV Shows</Link>
          <Link to="/movies">Movies</Link>
        </NavLinks>

        <SearchButton onClick={() => setShowSearch(true)}>
          <FiSearch size={20} />
        </SearchButton>
      </NavBarContainer>

      {showSearch && (
        <SearchOverlay>
          <CloseButton onClick={() => setShowSearch(false)}>
            <FiX size={28} />
          </CloseButton>
          <SearchInput
            type="text"
            placeholder="Search for movies or TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            autoFocus
          />
        </SearchOverlay>
      )}
    </>
  );
};

export default Navbar;
const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  background-color: ${({ scrolled }) => (scrolled ? '#111' : 'transparent')};
  transition: background-color 0.4s ease;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const LogoText = styled.div`
  color: white;
  font-size: 28px;
  font-weight: bold;
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    color: #e50914;
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: #e50914;
    }
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #e50914;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(20, 20, 20, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 40px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #e50914;
  }
`;

const SearchInput = styled.input`
  width: 80%;
  max-width: 600px;
  padding: 18px 24px;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #222;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  &::placeholder {
    color: #aaa;
  }
`;
