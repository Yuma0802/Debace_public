import React from "react";
import styled from 'styled-components';

const DebateBoxTitle = () => {


  return(
    <Stitle>ウィル・スミスが授賞式でとった行動の是非について</Stitle>
  )
};

const Stitle = styled.p`
  padding-top: 15px;
  /* margin: 0px; */

  font-family: 'Noto Serif JP';
  font-style: normal;
  
  font-size: 15px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;

`;


export default DebateBoxTitle;