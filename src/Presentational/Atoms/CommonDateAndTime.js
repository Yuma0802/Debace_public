import React from "react";
import styled from 'styled-components';
import { getNowDate, getNowTime } from "../../Helpers/DateOperation";

const CommonDateAndTime = (props) => {

  return (

    <SDaTWrap>
      <SYear>{props.date.getFullYear()}</SYear>
      <SDate>{getNowDate(props.date,"md")}</SDate>
      <STime>{getNowTime(props.date)}</STime>
    </SDaTWrap>
  );
};


const SDaTWrap = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-around;
`;

const SYear = styled.p`
  font-family: 'Arial';
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  margin: 0px;

  padding-right: 3px;

  color: #000000;
`;

const SDate = styled.p`
  font-family: 'Arial';
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  margin: 0px;
  padding-right: 3px;

  color: #000000;
`;

const STime = styled.p`
  font-family: 'Arial';
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  margin: 0px;
  color: #000000;
`;




export default CommonDateAndTime;