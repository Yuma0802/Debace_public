import React from "react";
import styled from 'styled-components';
import speechIcon from "../../assets/images/speech_icon.svg";
import CommonInfo from "../Atoms/CommonInfo";

const AgendaNumOfSpeech = (props) => {

  return(
    <SNOSWrap>
      <SNOSIcon />
      <CommonInfo 
        type="書き込み数"
        contents={props.num}
      />
    </SNOSWrap>
  );
};


const SNOSWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const SNOSIcon = styled.img.attrs({
  src: `${speechIcon}`,
  alt: 'ふきだし'
})`
  width: 24px;
  height: 21px;
  padding: 0px 2px;
  
`;

export default AgendaNumOfSpeech;