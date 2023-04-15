import React from "react";
import styled from 'styled-components';
import CommonBtn from "../Presentational/Atoms/CommonBtn";


const InfoBoard = () => {

  return(

    <SInfoBoard>
      <SFinishTimeWrap>
        <SFinishTime>
          討論終了時間
        </SFinishTime>
        <STimeDiv>
          <SDaT>4/7&ensp;23:59</SDaT>
        </STimeDiv>
      </SFinishTimeWrap>

      <CommonBtn text="書き込む"/>
    
    </SInfoBoard>

  );
};


const SInfoBoard = styled.div`
  width: 220px;
  background: rgba(219, 219, 219, 0.69);
  border: 1px solid #ADADAD;

  text-align: center;
`;


const SFinishTimeWrap = styled.div`
  margin-top: 10px;
`;

  const SFinishTime = styled.p`
    margin: 0px;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 200;
    font-size: 16px;
    line-height: 21px;

    letter-spacing: -0.02em;

    color: #000000;
  `;

  const STimeDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
  `;

  const SDaT = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.02em;
    text-decoration-line: underline;

    color: #000000;
  `;




export default InfoBoard;