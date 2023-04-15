import React from "react";
import styled from 'styled-components';
import ChangeBtn from "../Presentational/Atoms/ChangeBtn";
import CommonText from "../Presentational/Atoms/CommonText";
import Good from "../Presentational/Atoms/Good";
import PositionBlock from "../Presentational/Atoms/PositionBlock";
import Reply from "../Presentational/Atoms/Reply";
import Report from "../Presentational/Atoms/Report";
import UserNameSet from "../Presentational/Molecules/UserNameSet";

const Speech = () => {
  
  
  
  return(
    <SSpeechWrap>

      <SSpeechTop>
        <BaseNum>1</BaseNum>
        <UserNameSet />
        <PositionBlock />
      </SSpeechTop>

      <SSpeechContents>
        <CommonText 
          text="先日の行動について世界中で賛否の声が上がっております。私としてはいかなる状況においても暴力に訴えてはならないと考えており、手ではなく口で訴えるべきであったと考えております。皆さんはどうお考えですか？"
        />
      </SSpeechContents>

      <SSpeechBottom>
        <Good />
        <Report />
        <Reply />
        <ChangeBtn />
      </SSpeechBottom>
    </SSpeechWrap>
  );
};


const SSpeechWrap = styled.div`
  width: 680px;
  margin: auto;
  margin-bottom: 20px;
  border-bottom: 1px solid #B5B5B5;;
`;

const SSpeechTop = styled.div`
  display: flex;
  column-gap: 10px;
`;

const BaseNum = styled.p`
  margin: 0px;
  padding-top: 10px;
  width: 20px;
  text-align: center;

  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;

  letter-spacing: -0.02em;

  color: #000000;
`;

const SSpeechContents = styled.div`
  padding: 5px 30px 5px 30px;
`;

const SSpeechBottom = styled.div`
 display: flex;
 column-gap: 30px;
`;

export default Speech;