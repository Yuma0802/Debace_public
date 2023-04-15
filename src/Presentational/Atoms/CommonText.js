import React from "react";
import styled from 'styled-components';

const CommonText = (props) => {
  return(
    <SCommonText>
      {props.text}
    </SCommonText>
  )
};

const SCommonText = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: -0.02em;

  color: #000000;

  margin: 0px;
  padding:10px 0px;

`;

export default CommonText;