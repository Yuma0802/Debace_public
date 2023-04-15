import React from "react";
import styled from 'styled-components';
import CreateDebateContainer from "../Container/CreateDebateContainer";



const CreateDebatePage = (props) => {

  return(
    <>
      <SWrap>
        <CreateDebateContainer userInfo={props.userInfo}/>
      </SWrap>
    </>
  )
};

const SWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;


export default CreateDebatePage;