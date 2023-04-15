import React from "react";
import styled from 'styled-components';
import Reference from "../Atoms/Reference";
import AgendaBottom from "../Molecules/AgendaBottom";
import AgendaContents from "../Molecules/AgendaContents";
import AgendaTop from "../Molecules/AgendaTop";
import HashtagWrap from "../Molecules/HashtagWrap";
import PositionsWrap from "../Molecules/PositionsWrap";


const Agenda = (props) => {

  return(
    <SAgendaWrap>
      <AgendaTop agendaContents={props.agendaContents}/>
      <AgendaContents body={props.agendaContents.body}/>
      <PositionsWrap agendaContents={props.agendaContents}/>
      {props.agendaContents.reference !== "" &&
        <Reference reference={props.agendaContents.reference}/>
      }      
      <HashtagWrap agendaContents={props.agendaContents}/>
      <AgendaBottom 
        agendaContents={props.agendaContents}
        userInfo={props.userInfo}
        />
    </SAgendaWrap>
  );
};

const SAgendaWrap = styled.div`
  max-width: 1150px;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;


export default Agenda;