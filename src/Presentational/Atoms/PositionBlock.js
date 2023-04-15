import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";


const PositionBlock = (props) => {


  return(
    <SPositionBlockWrap>
      <SPositionMark num={props.num}/>
      <SPositionSign>{props.num}</SPositionSign>
    </SPositionBlockWrap>

  );
};

// const getTagColor = props => {
//   switch(props.num){
//     case 'A':
//       return `color: ${baseColor};`;
//     case 'B':
//       return `color: #FFCA68;`;
//     case 'C':
//       return `color: #E5E5E5;`;
//     case 'D':
//       return `color: #FFF3DC;`;
//     default:
//       break;
//   }
// }

const SPositionBlockWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 7px;
`;

  const SPositionSign = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;

  letter-spacing: -0.02em;

  color: #000000;
  margin: 0px;
`;

const SPositionMark = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => (props.num === 'A' && '#FF5500')};
  background-color: ${(props) => (props.num === 'B' && '#FFCA68')};
  background-color: ${(props) => (props.num === 'C' && '#FFF3DC')};
  background-color: ${(props) => (props.num === 'D' && '#E5E5E5')};
`;




export default PositionBlock;