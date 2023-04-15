import React from "react";
import styled from 'styled-components';

const PrevBtn = (props) => {

  return (
    <SBtnWrap onClick={props.fun}>
      <SBtnWrapIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
      </SBtnWrapIcon>
      <SBtnWrapIconMobile>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
        </svg>
      </SBtnWrapIconMobile>
    </SBtnWrap>
  )
};


const SBtnWrap = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width:60px;
  background-color: #d3d3d3;
  border-radius: 80px;
  margin-top: 140px;
  margin-left: -100px;
  @media (max-width: 480px) {
    display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width:50px;
  margin: 0 auto; /* center x-axis */
  background-color: #d3d3d3;
  border-radius: 30px;
  margin-bottom: 45px;
  }
`;

const SBtnWrapIcon = styled.svg`
  width: 50px;
  height: 50px;
  margin-left: 8px;
  margin-top: 10px;
  @media (max-width: 480px) {
  display: none;
  }
`;

const SBtnWrapIconMobile = styled.svg`
@media (max-width: 480px) {
  height: 40px;
  width: 40px;
  color: #000000;
  margin-bottom: 5px;
  }
  @media (min-width: 481px) {
  display: none;
  }
`;

const SIcon = styled.svg`
  height: 60px;
  width:60px;
`

export default PrevBtn;