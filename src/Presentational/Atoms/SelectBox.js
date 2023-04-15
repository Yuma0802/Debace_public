import React, { useEffect } from "react";
import styled from 'styled-components';

const SelectBox = (props) => {



  const onFun = () => {
    props.categoryFun(props.children)
  }  


  return(
    <SSelectWrap onClick={onFun} mine={props.children} now={props.selected}> 
      <SSelectWard>{props.children}</SSelectWard>
    </SSelectWrap>
  )
};

const SSelectWrap = styled.div`
  height: 32px;
  width: 130px;
  display:inline-block;
  background-color: #FFA500;
  background-color: ${(props) => (props.mine === props.now && '#ff8000')};

  border-radius: 2px;
  text-align: center;
  border-right: solid 0.1px #FFFFFF;
  
  &:first-child{
    border-left: solid 0.1px #FFFFFF;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const SSelectWard = styled.p`
  margin: 0px;
  padding-top: 5px;
  font-weight: bold;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: white;
  &:hover {
    /* color: gray; */
  }
  @media (max-width: 520px) {
  font-size: 15px;
  font-weight: bold;
}

`;

export default SelectBox;