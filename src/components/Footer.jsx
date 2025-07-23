import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <Link to="/faq">FAQ</Link>
          <Link to="/">Terms of Use</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Account</Link>
          <Link to="/">Help Center</Link>
          {/* <Link to="/">Cookie Preferences</Link> */}
          {/* <Link to="/">Ways to Watch</Link>
          <Link to="/">Media Center</Link>
          <Link to="/">Investor Relations</Link>
          <Link to="/">Jobs</Link>
          <Link to="/">Corporate Information</Link> */}
          <Link to="/contact">Contact Us</Link>
        </FooterLinks>
        <FooterText>© 2025 MOVFLIX India</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
const FooterContainer = styled.footer`
  background-color: #111;
  padding: 40px 20px;
  color: #757575;
  font-size: 14px;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 30px;

  a {
    color: #757575;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: #757575;
`;
