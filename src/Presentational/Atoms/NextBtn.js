import React from "react";
import styled from 'styled-components';

const NextBtn = (props) => {

  return (
    <SBtnWrap onClick={props.fun}>

      <SBtnWrapIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </SBtnWrapIcon>
      <SBtnWrapIconMobile>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
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
  border-radius: 40px;
  margin-top: 140px;
  padding-top: 10px;
  
  @media (max-width: 480px) {
    display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width:50px;
  margin: 0 auto; /* center x-axis */
  background-color: #d3d3d3;
  border-radius: 30px;
  padding-top: 0;
  }
`;

const SBtnWrapIcon = styled.svg`
  width: 40px;
  height: 40px;
  margin-left: 14px;
  margin-bottom: 7px;
  @media (max-width: 480px) {
  display: none;
  }
`;

const SBtnWrapIconMobile = styled.svg`
@media (max-width: 480px) {
  height: 40px;
  width: 40px;
  color: #000000;
  margin-top: 5px;
  }
  @media (min-width: 481px){

    display: none;
  }
`;




export default NextBtn;