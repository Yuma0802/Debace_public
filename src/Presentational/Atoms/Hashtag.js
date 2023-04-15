import React from "react";
import styled from 'styled-components';

const Hashtag = (props) => {

  return (
    <SHashtag>{props.children}</SHashtag>
  )
};

const SHashtag = styled.p`

  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.02em;
  text-decoration-line: underline;

  color: #2CC0FF;

  &:hover {
    cursor: pointer;
  }
  
`;


export default Hashtag;