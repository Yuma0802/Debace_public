import React from "react";
import styled from 'styled-components';
import DebateBoxDate from "../Atoms/DebateBoxDate";
import DebateBoxBottom from "../Molecules/DebateBoxBottom";
import { useNavigate } from "react-router-dom";
import CatImg from "../Atoms/CatImg";


const DebateBox = (props) => {
  //react-router
  const navigate = useNavigate()

  const onFun = () => {
    navigate(`/debate?did=${props.contents.did}&page=1`)
  }


  return(
    <SDebateBox >
      <div onClick={onFun}>
      <CatImg cat={props.contents.category} />
      {/* <IntroImg cat={props.contents.category}/> */}
      <Stitle>{props.contents.title}</Stitle>
      <DebateBoxDate 
        start={props.contents.startTime.toDate()}
        finish={props.contents.finishTime.toDate()}
      />
      </div>
      <DebateBoxBottom
        contents={props.contents}
      />
    </SDebateBox>
  )
};

const SDebateBox = styled.div`
  position: relative;
  width: 204px;
  height: 240px;
  margin-top: 50px;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25),
              2px 2px 4px rgba(0, 0, 0, 0.25),
              0px -2px 4px rgba(0, 0, 0, 0.25);
  
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    margin-bottom: 30px;
    margin-top: 10px;
    width: 340px;
    height: 385px;
  }
`;


const Stitle = styled.p`
  padding: 10px 10px 46px 10px;
  margin: 0px;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-size: 15px;
  line-height: 1.5;
  height: 2.4em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 480px) {
    font-size: 17px;
    line-height: 1.4;
    margin-bottom: 25px;
  }
`;




export default DebateBox;