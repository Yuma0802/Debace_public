import React from "react";
import styled from 'styled-components';
import changeBtnIcon from"../../assets/images/iconmonstr-connection-8.svg";
const ChangeBtn = () =>{

  return(
    <SChangeBtnWrap>
      <SChangeBtnIcon />
      <ChangeBtnMount>1</ChangeBtnMount>
    </SChangeBtnWrap>
  );
};


const SChangeBtnWrap = styled.div`
  display: flex;
  column-gap: 5px;
`;

const SChangeBtnIcon = styled.img.attrs({
  src: `${changeBtnIcon}`,
  alt: 'ChangeBtn'
})`
  width: 20px;
  height: 20px;
  padding: 0px 2px;
  
`;

const ChangeBtnMount = styled.p`
  margin: 0px;
  width: 20px;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.02em;

  color: #000000;
`;

export default ChangeBtn;