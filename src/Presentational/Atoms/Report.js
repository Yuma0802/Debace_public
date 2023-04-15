import React from "react";
import styled from 'styled-components';
import reportIcon from"../../assets/images/report_icon.svg";

const Report = (props) => {

  return(
    <SReportIcon onClick={props.onFun}/>
  )
};

const SReportIcon = styled.img.attrs({
  src: `${reportIcon}`,
  alt: '通報'
})`
  width: 24px;
  height: 21px;
  padding: 0px 2px;

  &:hover{
    cursor: pointer;
  }
  
`;

export default Report;