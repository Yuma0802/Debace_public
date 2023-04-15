import React, { useState } from "react";
import styled from 'styled-components';

import { baseColor } from "../assets/styles/BaseColor";
import { useForm} from 'react-hook-form';
import CommonBtn from "../Presentational/Atoms/CommonBtn";


const GiveOpinion = (props) => {
  //useFormを呼び出して使いたいメソッドを書く
  const {register, handleSubmit, watch, reset, errors, getValues} = useForm()
  //isConfirmationVisibleにstateを持たせて、入力内容確認画面の表示・非表示をコントロール
  //isConfirmationVisibleの初期値はfalseで入力内容確認画面は非表示に
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  //入力内容確認画面の閉じるボタンを押した時非表示にする関数を宣言
  const hideConfirmation = () => setIsConfirmationVisible(false)
  //submitボタンを押した時、入力内容確認画面を表示させる
  const onSubmitData = () => setIsConfirmationVisible(true)

  return(
    
    <SGOWrap num='A'>
      {

      <>
        <TGO>あなたの意見を書き込む</TGO>
        <SSecond>
          <SPosition>
            <LPosition>立場：</LPosition>
            <CPosition>A</CPosition>
          </SPosition>
          <SReply>
            <LReply>返信先</LReply>
            <CReply />
          </SReply>
        </SSecond>
        <GOContents />
        <SBtnWrap>
          <CommonBtn text='確認'/>
        </SBtnWrap>
                </>
      }
              

    </SGOWrap>
  )
};


const SGOWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 650px;
  //background: #FFFFFF;
  border: 1px solid #B7B7B7;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);

  background-color: ${(props) => (props.num === 'A' && '#FF8300')};
  background-color: ${(props) => (props.num === 'B' && '#FFCA68')};
  background-color: ${(props) => (props.num === 'C' && '#FFF3DC')};
  background-color: ${(props) => (props.num === 'D' && '#E5E5E5')};
`;

const TGO = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  letter-spacing: -0.02em;

  color: #000000;
  padding: 20px;
  
`;

const SSecond = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 50px 0px 50px;
`;

const SPosition = styled.div`
  display: flex;
  column-gap: 5px;
`;

const LPosition = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;

  color: #000000;
`;

const CPosition = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  letter-spacing: -0.02em;

  color: #000000;
`;

const SReply = styled.div`
  display: flex;
  column-gap: 15px;
`;

const LReply = styled.div`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;

  color: #000000;
`;

const CReply = styled.input.attrs({

})`
  border: solid 0.05px;
  outline: none;
  height: 22px;
  width:60px;
  background-color: #FFFEF6;
`;
const GOContents = styled.textarea.attrs({
  type:'textarea'
})`
  border: solid 0.05px;
  outline: none;
  width: 75%;
  height: 150px;
  margin-top: 30px;
  margin-left: 12.5%;
  margin-right: 12.5%;
  background-color: #FFFEF6;

`;

const SBtnWrap = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
`;

export default GiveOpinion;