import React from "react";
import styled from 'styled-components';
import SpeechBallon from "../Atoms/SpeechBalloon";
import SpeechCount from "../Atoms/SpeechCount";


const SpeechCountWrap = () => {
  return(
    <SSpeechCountWrap>
      <SBalloonPosition>
        <SpeechBallon />
      </SBalloonPosition>
      <SCountPosition>
        <SpeechCount>999</SpeechCount>
      </SCountPosition>
    </SSpeechCountWrap>
  )
};

const SSpeechCountWrap = styled.div`
  display: flex;

`;



const SBalloonPosition = styled.div`
  
`;

const SCountPosition = styled.div`
  /* background: brown; */
  height: 15px;
  padding-left:5px;
  padding-top: 8px;
  
`;



export default SpeechCountWrap;