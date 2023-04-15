import React from "react";
import styled from 'styled-components';

const PostReplyIcon = (props) => {
    return (
        <SPostReplyIconWrap>
            <SPostReplyIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                </svg>
                <SPopupWarp>
                <SPopup>
                    <SPopupItem>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" />
                        </svg>
                    </SPopupItem>
                    <SPopupItemSndWrap>
                    <SPopupItemSnd>天然水</SPopupItemSnd>
                    </SPopupItemSndWrap>
                    <SPopupItemTrd>最近はコロナ禍で外出自粛が続き、家で過ごす時間が増えました。そのため、自宅での趣味や読書、映画鑑賞などの時間が増え、新たな趣味を見つけたり、興味を持ったことに取り組んだりする人も多いようです。また、リモートワークが一般的になったことで、通勤時間が省けるため、家庭と仕事の両立がしやすくなったという意見もあります。しかし、オンライン上でのコミュニケーションやリモートワークによるストレスも指摘されており、新しい生活様式にはまだ慣れない部分もあるようです。</SPopupItemTrd><br/>
                </SPopup>
                </SPopupWarp>
            </SPostReplyIcon>
        </SPostReplyIconWrap>
    );
};

const SPostReplyIconWrap = styled.div`
  position: relative;
  padding-top: 7px;
  padding-left: 20px;
`;

const SPostReplyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  color: orange;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const SPopupWarp = styled.div`
padding-top: 300px;

`;

const SPopup = styled.div`
  position: absolute;
  top: 50px;
  left: calc(-160% - 10px); // adjust the value to move the component
  border: solid 3px;
  border-color: orange;
  background-color: #fff;
  color: black;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${SPostReplyIcon}:hover & {
    opacity: 1;
  }
`;

const SPopupItem = styled.div`
  display: inline-block;
  color: orange;
  width: 30px;
  height: 30px;

`;

const SPopupItemSndWrap = styled.div`
   display: inline-block;
   color: orange;
   padding-left: 20px; 
   padding-top: 20px;
   padding-bottom: 10px;
`;

const SPopupItemSnd = styled.p`
  color: black;
  font-size: 23px;
  font-weight: bold;
 
`;


const SPopupItemTrd = styled.div`
  padding: 5px;
  width: 300px;
  border-top: 1px solid orange;
`;

export default PostReplyIcon;
