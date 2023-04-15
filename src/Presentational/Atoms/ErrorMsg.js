import React from "react";
import styled from 'styled-components';

const ErrorMsg = (props) => {

  return(
    <ErrorMsgWrap>{props.children}</ErrorMsgWrap>
  )
};

const ErrorMsgWrap = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: red;
`;

export default ErrorMsg;