import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";


const LetterBtn = (props) => {

  

  return(
  
    <SBtnInner onClick={props.setFun}>
     {props.children}
    </SBtnInner>

  )
};

const SBtnInner = styled.p`
  display: inline-block;
  font-family: 'Volkhov';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  letter-spacing: -0.02em;
  color: #000000;
  padding: 0px 20px;
  margin: 0px;
  text-align: center;

  position: relative;

  &:hover{
    color: ${baseColor};
    cursor: pointer;

    @media (min-width: 481px) {
      &::after {
        transform: scale(1, 1);
      }
    }
  }
    &::after {
      content: '';
      /*絶対配置で線の位置を決める*/
      position: absolute;
      bottom: -3px;
      left: 10%;
      /*線の形状*/
      width: 80%;
      height: 2px;
      background:${baseColor};
      /*アニメーションの指定*/
      transition: all .3s;
      transform: scale(0, 1);/*X方向0、Y方向1*/
      transform-origin: center top;/*上部中央基点*/
    }

    @media (max-width: 481px) {
     font-weight: bold;
     width: 100%;
     line-height: 35px;
    padding: 0 1px 0px 4px;
    border-bottom: solid 1px;
    :hover{
      background-color: #FFA500;
      color: white;
    }
  }

`;




export default LetterBtn;