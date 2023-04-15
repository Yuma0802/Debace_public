import React from "react";
import styled from 'styled-components';

const SpeechCount = (props) => {
  return(
    <SSpeechCount>{props.children}</SSpeechCount>
  )
};

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

export default SpeechCount;