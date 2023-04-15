import React from "react";
import styled from 'styled-components';
import AgendaShare from "../Atoms/AgendaShare";
import BookMark from "../Atoms/BookMark";
import AgendaGenre from "./AgendaGenre";
import AgendaNumOfPeople from "./AgendaNumOfPeaple";
import AgendaNumOfSpeech from "./AgendaNumOfSpeech";


const AgendaBottom = (props) => {

  return (
    <SAgendaBottom>
      <AgendaGenre category={props.agendaContents.category} />
      <AgendaNumOfPeople num={props.agendaContents.participant_sum} />
      <AgendaNumOfSpeech num={props.agendaContents.opinion_sum} />
      <SAgendaRight>
        <BookMark contents={props.agendaContents} userInfo={props.userInfo} />
        <AgendaShare title={props.agendaContents.title}/>
      </SAgendaRight>
    </SAgendaBottom>
  );
};

const SAgendaBottom = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #B5B5B5;
  padding: 10px 60px 0px 60px;
  
  @media screen and (max-width: 480px) {
    flex-direction: column;
    margin-left: 0%;
    padding: 10px 60px 0 60px;
  }
`;

const SAgendaRight = styled.div`
  display: flex;
  align-items: center;
  width: 65px;
 justify-content: space-between; 
 @media screen and (max-width: 480px) {
    padding-top: 10px;
  }
`;

export default AgendaBottom;
