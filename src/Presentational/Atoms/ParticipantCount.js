import React from "react";
import styled from 'styled-components';
import SpeechBallon from "./SpeechBalloon";
import SpeechCount from "./SpeechCount";


const ParticipantCount = (props) => {
  return(
    <SSpeechCountWrap>
      <SBalloonPosition>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>
      </SBalloonPosition>
      <SCountPosition>
        <SSpeechCount>{props.num}</SSpeechCount>
      </SCountPosition>
    </SSpeechCountWrap>
  )
};

const SSpeechCountWrap = styled.div`
  display: flex;
  
`;



const SBalloonPosition = styled.svg`
  width: 20px;
  height: 20px;
  margin-top: 4
  
    px;
  &:hover {
    cursor: pointer;
  }
`;

const SCountPosition = styled.div`
  /* background: brown; */
  height: 15px;
  padding-left:5px;
  padding-top: 8px;
  
`;

const SSpeechCount = styled.p`
  font-family: 'Volkhov';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
`;




export default ParticipantCount;