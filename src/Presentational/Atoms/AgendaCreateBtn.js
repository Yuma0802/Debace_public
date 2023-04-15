import React from "react";
import styled from "styled-components";
import DebateBox from "../Organisms/DebateBox";
import SlidersIcon from "./SlidersIcon";

const AgendaCreateBtn = () => {
  return (
    <SAgendaCreateBtnAllWrap>
      <SAgendaCreateBtnWrap>
      <SAgendaCreateBtn>議題作成</SAgendaCreateBtn>
      </SAgendaCreateBtnWrap>
      <SlidersIcon />
    </SAgendaCreateBtnAllWrap>
  );
};

const SAgendaCreateBtnAllWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // 左寄せにする
  width: 100%;
  max-width: 1200px;
  padding-top: 35px;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 1200px) {
    padding-left: 100px;
    padding-right: 0;
  }
`;

const SAgendaCreateBtnWrap = styled.div`
  padding-right: 50px;
`;

const SAgendaCreateBtn = styled.button`
  height: 40px;
  width: 150px;
  background-color: #ffa500;
  color: white;
  font-size: 22px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  
`;

export default AgendaCreateBtn;
