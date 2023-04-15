import React from "react";
import styled from 'styled-components';
import Position from "./Position";


const PositionsWrap = (props) => {

  return(
    <SPositionsWrap>
      {props.agendaContents.positionA !== null &&
      <Position num='A' text={props.agendaContents.positionA}/>
      }
      {props.agendaContents.positionA !== null &&
      <Position num='B' text={props.agendaContents.positionB}/>
      } 
      {props.agendaContents.positionC !== null &&
        <Position num='C' text={props.agendaContents.positionC}/>
      }
      {props.agendaContents.positionD !== null &&
        <Position num='D' text={props.agendaContents.positionD}/>
      }
    </SPositionsWrap>
  );
};

const SPositionsWrap = styled.div`
  display: flex;
  row-gap: 5px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 60px 5px 60px;
  @media screen and (max-width: 480px) {
    
  }
`;

export default PositionsWrap;
