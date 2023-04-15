import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";


const CommonInfo = (props) =>{


  //色変更
  let letterCollor = "black";

  if(props.color === true){
    letterCollor = baseColor;

  }
  

  //style///////////////////////////
  const SInfoContents = styled.p`
    margin: 0px;
    color: ${letterCollor};
    font-family: 'Noto Serif JP';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.02em;
  `;

  //////////////////////style///////


  return(
    <SInfoWrap>
      <SInfoType>{props.type}</SInfoType>
      <SColon>:</SColon>
      <SInfoContents >{props.contents}</SInfoContents>
    </SInfoWrap>
  );
};




const SInfoWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  padding: 10px 0px 10px 0px;
`;

const SInfoType = styled.p`
  margin: 0px;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.02em;
`;

const SColon = styled.p`
  margin: 0px;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.02em;
`;




export default CommonInfo;