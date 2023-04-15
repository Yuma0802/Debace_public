import React from "react";
import styled from "styled-components";
import Title from "../Presentational/Atoms/Title";
import Logo from "../Presentational/Atoms/Logo";
import { useNavigate } from "react-router-dom";

const TitleS = () => {
  //react-router
  const navigate = useNavigate()

  const onFun = () => {
    navigate("/")
  }

  return(
    <StitleWrap>
      <Logo />
      <Title />
    </StitleWrap>
    
  )
}

const StitleWrap = styled.div`
  display: flex;
  padding-left: 15px;
  padding-top: 5px;
  &:hover{
    cursor: pointer;
  }
`;

export default TitleS;