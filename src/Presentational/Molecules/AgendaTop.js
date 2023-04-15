import React from "react";
import styled from 'styled-components';
import { getNowDate, getNowTime } from "../../Helpers/DateOperation";
import DebateDateAndTime from "../Atoms/DebateDateAndTime";
import DebateTitle from "../Atoms/DebateTitle";
import UserNameSet from "./UserNameSet";

const AgendaTop = (props) => {
  return(
    <SAgendaTopWrap>
      <SDaTWrap>
        <DebateDateAndTime 
          year={props.agendaContents.startTime.getFullYear()}
          date={getNowDate(props.agendaContents.startTime,'md')}
          time={getNowTime(props.agendaContents.startTime,'hm')}
        />      
        ～
        <DebateDateAndTime 
          year={props.agendaContents.finishTime.getFullYear()}
          date={getNowDate(props.agendaContents.finishTime,'md')}
          time={getNowTime(props.agendaContents.finishTime,'hm')}
        />      
      </SDaTWrap>
      <STitleWrap>
        <DebateTitle title={props.agendaContents.title}/>
      </STitleWrap>
      <SProposer>
        <SSakuseisha></SSakuseisha>
        <UserNameSet 
          name={props.agendaContents.hostName}
          rank={props.agendaContents.hostRank}
          id={props.agendaContents.hostId}
        />     
      </SProposer>
    </SAgendaTopWrap>
  );
};

const SAgendaTopWrap = styled.div`
  display: block;
`;

const SDaTWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 30px 60px 30px 60px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 50px 60px 40px 60px;
  }
`;



const STitleWrap = styled.div`
  display: block;
  padding: 0px 180px 30px 180px;

  @media screen and (max-width: 768px) {
    padding: 20px 20px 0px 20px;
  }
`;

const SProposer = styled.div`
  display: flex;
  column-gap: 20px;
  align-items:center;
  text-align: start; /* 左寄せ */
  justify-content: flex-start; /* 左寄せ */
  padding: 0px 60px 20px 40px;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
    padding: 20px 20px 0px 20px;
  }
  @media screen and (max-width: 480px) {
    padding-top: 10%;
    padding-bottom: 2%;
  }
`;


const SSakuseisha = styled.p`
  font-family: 'MS Mincho';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height */

  letter-spacing: -0.02em;
  margin: 0px;
  color: #5A5A5A;
  @media screen and (max-width: 480px) {
   padding-top : 4px;
   font-size: 10px;
   display: none;
  }
`;

export default AgendaTop;
