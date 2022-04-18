import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  font-size: 16px;
  line-height: 24px;
  padding: 4px;
  border-radius: 5px;
  background-color: #85c88a;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    background-color: #019267;
  }

  &:active {
    background-color: #019267;
  }
`;

const CustomButton = ({ children, ...otherProps }) => {
  return <ButtonContainer {...otherProps}>{children}</ButtonContainer>;
};

export default CustomButton;
