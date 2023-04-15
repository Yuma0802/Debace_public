import React from "react";
import styled from 'styled-components';


const DebateTitle = (props) => {

  return(
    <SDTitle>
      {props.title}      
    </SDTitle>
  );
};

const SDTitle = styled.h1`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 540;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 0px;

  color: #000000;
`;

export default DebateTitle;