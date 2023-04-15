import React from "react";
import styled from 'styled-components';

const InformationMessage = (props) => {

    return (
        <SInformationMessage>
       
            <SInformationMessageText>{props.text}</SInformationMessageText>


        </SInformationMessage>
    )
};

const SInformationMessage = styled.div`
  display: flex;
  padding: 12px;
  background-color:#ffffcc;
  color: #333;
  border-radius: 5px;
  height: 50px;
  text-align: center;
  align-items: center; 
  @media screen and (max-width: 480px) {
   height: 45px;
   padding: 5px;
  }
`;



const SInformationMessageText = styled.p`
  font-size: 18px;
  padding-top: 15px;
  text-align: center;
  display: flex;
  justify-content: center; 
  /* align-items: center;  */
  flex: 1;
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;


export default InformationMessage;
