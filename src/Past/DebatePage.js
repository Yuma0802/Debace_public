import React from "react";
import styled from 'styled-components';
// import Agenda from "../Presentational/Organisms/Agenda";
import Header from '../Presentational/Organisms/Header';
import InfoBoard from "../Presentational/Organisms/InfoBoard";
import Speech from "../Presentational/Organisms/Speech";


const DebatePage = () => {

  return(
    <>
      <Header />
      <SDPWrap>
        <InfoBoard />
        <SDebate >
          {/* <Agenda /> */}
 opinionn          <Speech />
          <Speech />
          <Speech />
          <Speech />
          <Speech />
        </SDebate>
      </SDPWrap>
    </>
  )
};

const SDPWrap = styled.div`
  display: flex;
`;

const SDebate = styled.div`
  width: 950px;
`;

export default DebatePage;