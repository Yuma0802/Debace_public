import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import CommonBtn from "../Atoms/CommonBtn";

const NotLoginBottom = () => {
  const navigate = useNavigate()

  const onFun = () => {
    navigate('/login')
  }

  return (
    <>
    <SPostJoinFirstWrap>
      <SJoinFirstBtn>
        <CommonBtn text="ログイン" clickedFn={onFun}/>
      </SJoinFirstBtn>
    </SPostJoinFirstWrap>
    </>
  )
};

const SPostJoinFirstWrap = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 60px;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  background: #e6e6e6;
  justify-content: center;

`

const SJoinFirstBtn = styled.div`
  display: flex;
  justify-content: center;
`;

export default NotLoginBottom;