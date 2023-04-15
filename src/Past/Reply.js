import React from "react";
import styled from 'styled-components';
import replyIcon from"../../assets/images/reply_icon.svg";
const Reply = () =>{

  return(
    <SReplyWrap>
      <ReplyIcon />
      <ReplyMount>1</ReplyMount>
    </SReplyWrap>
  );
};


const SReplyWrap = styled.div`
  display: flex;
  column-gap: 5px;
`;

const ReplyIcon = styled.img.attrs({
  src: `${replyIcon}`,
  alt: 'Reply'
})`
  width: 24px;
  height: 21px;
  padding: 0px 2px;
  
`;

const ReplyMount = styled.p`
  margin: 0px;
  width: 20px;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.02em;

  text-decoration-line: underline;

  color: #000000;
`;

export default Reply;