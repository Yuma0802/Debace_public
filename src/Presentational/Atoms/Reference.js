import React from "react";
import styled from 'styled-components';
import MultiBody from "../../Helpers/MultiBody";

const Reference = (props) => {
  return(
    <SReferenceWrap>
      <LReference>参考文献</LReference>
      <CReference>
        <MultiBody>
         {props.reference}
        </MultiBody>
      </CReference>
    </SReferenceWrap>
  )
};

const SReferenceWrap = styled.div`
 display: flex;
 //align-items: center;
 column-gap: 5px;
 padding: 20px 60px 5px 60px;
 width: 100%;
 @media screen and (max-width: 480px) {
    display: block;
  }
`;

const LReference = styled.p`
  margin: 0px;
  text-decoration: underline;
  width: 90px;
`;

const CReference = styled.div`
  display: flex;
  flex-flow: column;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  word-break: break-all;
  margin: 0px;
  padding:5px 0px;
`;
export default Reference;