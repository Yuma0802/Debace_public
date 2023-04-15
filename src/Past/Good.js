import React from "react";
import styled from 'styled-components';
import goodIcon from"../../assets/images/good_icon.svg";
const Good = () =>{

  return(
    <SGoodWrap>
      <GoodIcon />
      <GoodMount>1</GoodMount>
    </SGoodWrap>
  );
};


const SGoodWrap = styled.div`
  display: flex;
  column-gap: 5px;
`;

const GoodIcon = styled.img.attrs({
  src: `${goodIcon}`,
  alt: 'good'
})`
  width: 24px;
  height: 21px;
  padding: 0px 2px;
  
`;

const GoodMount = styled.p`
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

export default Good;