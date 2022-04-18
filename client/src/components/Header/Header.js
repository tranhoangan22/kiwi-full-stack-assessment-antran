import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background-color: #effffd;
  padding: 12px 16px;
`;

const StyledLogo = styled.img`
  width: 200px;
  :hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <StyledHeader onClick={handleClick}>
      <StyledLogo
        src="https://we-are-hiring.cdn.personio.de/logos/189/social/d6a44328d5a5837c3d130feca49771a1.png"
        alt="kiwi-logo"
      />
    </StyledHeader>
  );
};

export default Header;
