import React from "react";
import styled from 'styled-components';
import MenuBlock from "../Molecules/MenuBlock";
import Logo from "../Atoms/Logo";
import Title from "../Atoms/Title";
import { useNavigate } from "react-router-dom";

const Header = (props) =>{
  //react-router
  const navigate = useNavigate()

  const onFun = () => {
    navigate("/")
  }

  return (

    <SHeaderWrap>
      <StitleWrap onClick={onFun}>
        <Logo />
        <Title />
      </StitleWrap>
      <MenuBlock userInfo={props.userInfo}/>
    </SHeaderWrap>  
  )

}

const SHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.33);
  border-bottom: 1px solid #C4C4C4;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  align-items: center;
  padding: 3px 0px 3px 0px;
  position: fixed;
  background-color: white;
  z-index: 10;

`;

const StitleWrap = styled.div`
  display: flex;
  padding-left: 15px;
  padding-top: 5px;
  &:hover{
    cursor: pointer;
  }
`;

export default Header;