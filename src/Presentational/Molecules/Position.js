import React from "react";
import styled from 'styled-components';
import PositionBlock from "../Atoms/PositionBlock";

const Position = (props) => {

  return(
    <SPositionWrap>
      <PositionBlock num={props.num}/>
      <SPositionText>{props.text}</SPositionText>
    </SPositionWrap>
  );
};

const SPositionWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
  @media screen and (max-width: 480px) {
   padding-bottom: 15px;
  }
`;

const SPositionText = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  margin: 0px;
  @media screen and (max-width: 480px) {
   font-size : 15px;
  }
`;

export default Position;