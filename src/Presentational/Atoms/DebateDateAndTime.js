import React from "react";
import styled from 'styled-components';

const DebateDateAndTime = (props) => {

  return (

    <SDaTWrap>
      <SYear>{props.year}</SYear>
      <SDate>{props.date}</SDate>
      <STime>{props.time}</STime>
    </SDaTWrap>
  );
};


const SDaTWrap = styled.div`
  width: 140px;
  display: flex;
  justify-content: space-around;
`;

const SYear = styled.p`
  font-family: 'MS Gothic';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 0px;

  padding-right: 3px;

  color: #000000;
`;

const SDate = styled.p`
  font-family: 'MS Gothic';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 0px;
  padding-right: 3px;

  color: #000000;
`;

const STime = styled.p`
  font-family: 'MS Gothic';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 0px;
  color: #000000;
`;




export default DebateDateAndTime;