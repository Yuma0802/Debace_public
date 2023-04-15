import React from "react";
import styled from 'styled-components';
import { lnToBr } from "../../Helpers/NewLine";
import MultiBody from "../../Helpers/MultiBody";



const AgendaContents = (props) =>{

  console.log(lnToBr(props.body));
  return(
    <SAgendaContents>
      <BodyWrap>
        <MultiBody>
        {props.body}
        </MultiBody>
      </BodyWrap>
        
    </SAgendaContents>
  )
};

const SAgendaContents = styled.div`
  padding: 0px 60px 15px 60px;
  @media screen and (max-width: 480px) {
    padding: 0 20px 0 20px;
  }
`;

const BodyWrap = styled.div`
  display: flex;
  flex-flow: column;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #000000;

  margin: 0px;
  padding:10px 0px;
  
  word-break: break-all;
  @media screen and (max-width: 480px) {
   font-size: 16px;
  }
`;

export default AgendaContents