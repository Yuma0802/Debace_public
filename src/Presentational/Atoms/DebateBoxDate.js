import React from "react";
import styled from 'styled-components';
import { getNowDate, getNowTime } from "../../Helpers/DateOperation";

const DebateBoxDate = (props) => {


  return(

    <SDateWrap>
      <SStartWrap>
        <SStartDay>{getNowDate(props.start,'md')}</SStartDay>
        <SStartTime>{getNowTime(props.start,'hm')}</SStartTime>
      </SStartWrap>

      <SWave>～</SWave>

      <SFinishWrap>
        <SFinishDay>{getNowDate(props.finish,'md')}</SFinishDay>
        <SFinishTime>{getNowTime(props.finish,'hm')}</SFinishTime>
      </SFinishWrap>
    </SDateWrap>
  )
};


const SDateWrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 3px;
`;

//討論開始時間
const SStartWrap = styled.div`
  display: flex;
`;

const SStartDay = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;

  padding-right:3px;
  

  color: #000000;
  @media (max-width: 480px) {
    font-size: 22px;
    font-weight: normal;
  }
`;
const SStartTime = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
  @media (max-width: 480px) {
    font-size: 22px;
    font-weight: normal;
  }

`;


//真ん中の波線

const SWave = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
  @media (max-width: 480px) {
    font-size: 22px;
    font-weight: normal;
  }

`;

//討論終了時間

const SFinishWrap = styled.div`
  display: flex;
`;

const SFinishDay = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;

  padding-right:3px;

  color: #000000;
  @media (max-width: 480px) {
    font-size: 22px;
    font-weight: normal;
  }
`;
const SFinishTime = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-size: 12px;
  font-weight: bold;
 
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
  @media (max-width: 480px) {
    font-size: 22px;
    font-weight: normal;
  }

`;




export default DebateBoxDate;