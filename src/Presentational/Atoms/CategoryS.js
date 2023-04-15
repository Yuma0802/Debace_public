import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";

const CategoryS = (props) => {


  return(
    // <SCategory>テクノロジー</SCategory>
    <SCategory>{props.children}</SCategory>
  )
};

const SCategory = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 25px;
  border: solid 1px #f4a460;
  border-radius: 5px;
  color: #f4a460;
  text-align: center;
  padding: 2px 15px;
  padding-top: 5px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
    font-size: 18px;
    margin-top: 6px;
  }
`;


export default CategoryS;