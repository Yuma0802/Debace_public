import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";
import { rankToColor } from "../../Helpers/RankOperation";


const UserNameSet = (props) => {
  
  const navigate = useNavigate()

  const onFun = () => {
    navigate(`/mypage?uid=${props.id}`)
  }

  return(
    <SUNSWrap onClick={onFun} >
      <SUserIcon rank={props.rank}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8" />
        </svg>
      </SUserIcon>
      <SUserName>{props.name}</SUserName>
    </SUNSWrap>
  );
};

const SUNSWrap = styled.div`
  display: flex;
  column-gap: 0px;
  //align-items:center;
`;

const SUserIcon = styled.svg`
  
  height: 30px;
  width: 30px;
  color: ${(props) => (rankToColor(props.rank))};
  //color: red;
  //border: 1px solid #1f1f1f;

`;

const SUserName = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-size: 18px;
  line-height: 18px;
  padding-top: 2px;
  color: #5A5A5A;
`;

export default UserNameSet;