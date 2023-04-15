import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";

const SubBtn = (props) => {

  return <SCommonBtn onClick={props.clickedFn}>{props.text}</SCommonBtn>;
};

const SCommonBtn = styled.button`
  height: 32px;
  width: 140px;
  /* margin: 0px; */

  padding-top: 5px;
  font-family: "Volkhov";
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 1.5px;
  font-feature-settings: "kern" off;
  color: ${baseColor};
  border: 1px solid ${baseColor};
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;

  display: inline-block;
  background-color: #ffffff;
  text-align: center;
  //box-shadow: 0px 4px 0px 0px #DB8D00;
  transition: 0.2s;

   &:hover { 
    cursor: pointer;
    background-color: #FFCA68;
  } 
`;

export default SubBtn;