import React from "react";
import styled from 'styled-components';
import CategoryS from "../Atoms/CategoryS";
import Hashtag from "../Atoms/Hashtag";
import HashtagWrap from "./HashtagWrap";
import SpeechCountWrap from "./SpeechCountWrap";
import BookMark from "../Atoms/BookMark";
import ParticipantCount from "../Atoms/ParticipantCount";

const DebateBoxBottom = (props) => {

  return(
    <SDebateBoxBottomWrap>
      <SCategoryWrap>
        <CategoryS>{props.contents.category}</CategoryS>
      </SCategoryWrap>
      <SRightWrap>
        <SBookMarkWrap>
          <BookMark contents={props.contents} userInfo={props.contents.userInfo}/>
        </SBookMarkWrap>
        <SscwWrap>
          <ParticipantCount num={props.contents.participant_sum}/>
        </SscwWrap>
      </SRightWrap>
    </SDebateBoxBottomWrap>
  )
};

const SDebateBoxBottomWrap = styled.div`
  border-top: solid 1px black;
  margin-top: -20px;
  padding-top: 6px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  
`;

const SCategoryWrap = styled.div`
  padding-left: 10px;
  padding-top: 2px;
  @media (max-width: 480px) {
    padding-left: 30px;
   
  }
`;


const SRightWrap = styled.div`
  padding-right: 15px;
  padding-top: 8px;
  @media (max-width: 480px) {
    padding-right: 25px;
  padding-top: 10px;
  }
`;

const SBookMarkWrap =styled.div`
  display: inline-block;
  padding-right: 10px;
   @media (max-width: 480px) {
    padding-right: 25px;
    padding-top: 10px;
  }
`;

const SscwWrap = styled.div`
  display: inline-block;
`;

export default DebateBoxBottom;