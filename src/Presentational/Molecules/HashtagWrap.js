import React from "react";
import styled from 'styled-components';
import Hashtag from "../Atoms/Hashtag";


const HashtagWrap = (props) => {

  return(
    <SHashtagWrap>
      <Hashtag>{props.agendaContents.tag1}</Hashtag>
      <Hashtag>{props.agendaContents.tag2}</Hashtag>
      <Hashtag>{props.agendaContents.tag3}</Hashtag>
      <Hashtag>{props.agendaContents.tag4}</Hashtag>
    </SHashtagWrap>
  )
};

const SHashtagWrap = styled.div`
  display: flex;
  column-gap: 30px;
  padding: 20px 60px 0px 60px;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;


export default HashtagWrap;