import React from "react";
import styled from 'styled-components';

import CommonBtn from "../Atoms/CommonBtn";

const Voted = () => {

  return (
    <>
    <SPostJoinFirstWrap>
      <SJoinFirstBtn>
        <Sfinish>投票済み</Sfinish>
      </SJoinFirstBtn>
    </SPostJoinFirstWrap>
    </>
  )
};

const SPostJoinFirstWrap = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 60px;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  background: #e6e6e6;
  justify-content: center;

`

const SJoinFirstBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const Sfinish = styled.button`
  height: 32px;
  width: 140px;
  /* margin: 0px; */

  padding-top: 5px;
  font-family: "Volkhov";
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 1.5px;
  font-feature-settings: "kern" off;
  color: #ffffff;
  border: none;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;

  display: inline-block;
  background-color: #FFCA68;
  text-align: center;
  //box-shadow: 0px 4px 0px 0px #DB8D00;

`;

export default Voted;