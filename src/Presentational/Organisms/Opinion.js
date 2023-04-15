import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";
import MultiBody from "../../Helpers/MultiBody";
import { exNl} from "../../Helpers/NewLine";
import { rankToColor } from "../../Helpers/RankOperation";
import CommonDateAndTime from "../Atoms/CommonDateAndTime";
import GoodBtnOperate from "../Atoms/GoodBtnOperate";
import Report from "../Atoms/Report";



const Opinion = (props) => {
  const navigate = useNavigate()


  const [hovered, setHovered] = React.useState(false);
  const [showReply, setShowReply] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)

  const replyFun = () => {
    setShowReply(!showReply)
  }
  const policyFun = () => {
    setShowPolicy(!showPolicy)
  }

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const onFun = () => {
    navigate(`/mypage?uid=${props.contents.uid}`)
  }

  const toContact = () => {
    navigate('/contact/')
  }

  return (
    <SSpeechWrap>
      <SSpeechTop>
        <SSpeachTopLeft>
          <BaseNum>{props.contents.id}</BaseNum>

          <div onClick={policyFun}>
          <UserNameSet
            rank={props.contents.rank}
            id={props.contents.uid}
          >
            <SRankItem rank={props.contents.rank}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-circle-fill"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
            </SRankItem>
            {props.contents.name}
            {showPolicy && (
              <SPopupWarp>
                <SPopup>
                  <SPopupItem rank={props.contents.rank}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </SPopupItem>
                  <SPopupItemSndWrap onClick={onFun} >
                    <SPopupItemSnd>{props.contents.name}</SPopupItemSnd>
                  </SPopupItemSndWrap>
                  <SPopupItemTrd>
                    <MultiBody>
                      {props.contents.policy}
                    </MultiBody>
                  </SPopupItemTrd>
                </SPopup>
              </SPopupWarp>
            )}
          </UserNameSet>  
          </div>
          <SOpinionPos>
            {props.contents.position !== null &&
              `立場\u00A0:\u00A0${props.contents.position}`}
          </SOpinionPos>
            {props.contents.to_reply != null &&
              <SReply to_reply={props.contents.to_reply} onClick={replyFun} >
                {`返信先\u00A0:\u00A0${props.contents.to_reply}`}
                {showReply && (
                  <SPopupWarp>
                    <SPopupForReply>
                      <SPopupItemSnd>
                        {props.contents.to_reply}
                        &nbsp;
                        {props.contents.replyName}
                      </SPopupItemSnd>
                        {exNl(props.contents.replyBody)}
                    </SPopupForReply>
                  </SPopupWarp>
                )}
              </SReply>
            }

        </SSpeachTopLeft>
        <SCommonDateAndTime>

          <CommonDateAndTime date={props.contents.createdAt} />
        </SCommonDateAndTime>
      </SSpeechTop>

      <SSpeechContents>
        <MultiBody>
          {props.contents.body}
        </MultiBody>
      </SSpeechContents>

      <SSpeechBottom>
        <GoodBtnOperate
          contents={props.contents}
          goodList={props.goodBadList}
          setFun={props.onGood}
        />

        <Report onFun={toContact} />
      </SSpeechBottom>
    </SSpeechWrap>
  );
};

const UserNameSet = styled.div`
  cursor: pointer;
  position: relative; 
`;

const SPopup = styled.div`
  position: absolute;
  top: calc(100% + 10px); 
  left: -10px; 
  border: solid 3px;
  border-color: #ffa500;
  background-color: #fff;
  color: black;
  padding: 10px 20px;
  font-size: 12px;
  border-radius: 1px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
  opacity: 1;
`;

const SPopupWarp = styled.div`
  position: relative; 
`;


const SRankItem = styled.div`
  display: inline-block;
  color: orange;
  width: 20px;
  height: 20px;
  color: ${(props) => (rankToColor(props.rank))};
   padding-bottom: 4px;
  margin-right: 6px;
`;

const SPopupItem = styled.div`
  display: inline-block;
  color: orange;
  width: 20px;
  height: 20px;
  color: ${(props) => (rankToColor(props.rank))};
`;

const SPopupItemSndWrap = styled.div`
   display: inline-block;
   color: orange;
   padding-left: 20px; 
   padding-top: 5px;
   padding-bottom: 1px;
`;

const SPopupItemSnd = styled.p`
  color: black;
  font-size: 15px;
  font-weight: bold;
  
`;


const SPopupItemTrd = styled.div`
  padding: 5px;
  width: 300px;
  border-top: 1px solid orange;
`;




const SSpeechWrap = styled.div`
  width: 1000px;
  padding-top: 20px;
  margin: auto;
  border-bottom: 1px solid #B5B5B5;
  @media screen and (max-width: 714px) {
    width: 90%;
  }
`;

const SSpeechTop = styled.div`
  display: flex;
  padding-right: 30px;
  justify-content: space-between;
  @media screen and (max-width: 480px) {
     display: block;
     /* background-color: aqua; */
     flex-wrap: wrap;
     
  }
  
`;

const SSpeachTopLeft = styled.div`
  display: flex;
  column-gap: 20px;
  @media screen and (max-width: 480px) {
    flex-wrap: wrap; 
  
  }
`;

const BaseNum = styled.p`
  margin: 0px;
  width: 20px;
  margin-left: 10px;
  text-align: center;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.02em;
  color: #000000;
 
`;

const SOpinionPos = styled.p`
  font-family: 'Arial';
  font-size: 14px;
  padding-top: 2px;

  @media screen and (max-width: 480px) {
    display: flex; 
    /* flex-wrap: wrap; */
    /* justify-content: center; */
    /* align-items: center; */
    /* text-align: center; */
    padding-top: 21px;
    width: 60%;
    padding-left: 15px;
    margin-bottom: -10px;
    /* margin-bottom: 5px;  */
  }
  @media screen and (max-width: 370px) {
    display: flex; 
    /* flex-wrap: wrap; */
    /* justify-content: center; */
    /* align-items: center; */
    /* text-align: center; */
    padding-top: 20px;
    width: 70%;
    padding-left: 15px;
    margin-bottom: -10px;
    /* margin-bottom: 5px;  */
  }
`;

const SReply = styled.div`
  color: ${baseColor};
  cursor: ${props => props.to_reply ? "pointer" : "auto"};
  text-decoration: ${props => props.to_reply ? "underline" : "none"};
  ${props => props.to_reply &&
  `
    & > ${SPopupWarp} > ${SPopupForReply} {
      opacity: 1;
    }
  `}
  @media screen and (max-width: 480px) {
    /* display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    padding-bottom: 20px; */
    padding-top: 20px;
    margin-left: -120px;
  }
`;



const SSpeechContents = styled.p`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  margin: 0px;
  padding:10px 15px 17px 15px;
  /* background-color: pink; */
`;


const SSpeechBottom = styled.div`
 display: flex;
 column-gap: 30px;
 padding-bottom: 5px;
 padding-left: 15px;
`;


const SPopupForReply = styled(SPopup)`
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  width: 300px;
`;

const SCommonDateAndTime = styled.div`
   padding-top: 5px;
 @media screen and (max-width: 480px) {
   padding-left: 66%;
   padding-bottom: 10px;
   padding-top: 15px;
  }
`;



export default Opinion;