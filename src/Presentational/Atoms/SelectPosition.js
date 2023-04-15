import React, { useState } from "react";
import styled from 'styled-components';
import Position from "../Molecules/Position";
import CommonBtn from "./CommonBtn";
import SubBtn from "./SubBtn";
import { baseColor } from "../../assets/styles/BaseColor";

const SelectPosition = (props) => {
  
  const [val, setVal] = useState('A');
  const [display,setDisplay] = useState(1);

  const handleChange = e => setVal(e.target.value);

  const displayFun1 = () => {
    setDisplay(2);
  };
  const displayFun2 = () => {
    setDisplay(1);
  };

  // const dicision = () => {

  // }


  return(
    <SSPWrap>
      {(() => {
        if(display === 1){
          return(
            <div>
              <TSP>あなたの立場を選択</TSP>
              <SFormWrap>
                <form id="selectPosition">
                  <SLPosition>
                    <input type="radio" name="position" value="A"  onChange={handleChange} checked={val === 'A'}/>
                    <Position num='A' text={props.agendaContents.positionA}/>
                  </SLPosition>
                  <SLPosition>
                    <input type="radio" name="position" value="B" onChange={handleChange} checked={val === 'B'}/>
                    <Position num='B' text={props.agendaContents.positionB}/>
                  </SLPosition>
                  {props.agendaContents.positionC !== null &&
                    <SLPosition>
                      <input type="radio" name="position" value="C" onChange={handleChange} checked={val === 'C'}/>
                      <Position num='C' text={props.agendaContents.positionC}/>
                    </SLPosition>
                  }
                  {props.agendaContents.positionD !== null &&
                    <SLPosition>
                      <input type="radio" name="position" value="D" onChange={handleChange} checked={val === 'D'}/>
                      <Position num='D' text={props.agendaContents.positionD}/>
                    </SLPosition>
                  }
                </form>
              </SFormWrap>
              <SBtnWrap>
              <SubBtn backColor="#FFF" wordColor={baseColor} text="閉じる" clickedFn={displayFun1} />
                <CommonBtn text="確認" clickedFn={displayFun1}/>
              </SBtnWrap>
            </div> 
          )
        }else if(display === 2){
          return(
            <div>
              <TSP>確認</TSP>
              <SFormWrap>

                <PConfirm>あなたの立場はこちらでよろしいでしょうか</PConfirm>
                <SConfirmWrap>
                {
                  (() => {
                    if(val === 'A'){
                      return <Position num='A' text={props.agendaContents.positionA}/>;
                    }else if(val === 'B'){
                      return <Position num='B' text={props.agendaContents.positionB}/>;
                    }else if(val === 'C'){
                      return <Position numata='C' text={props.agendaContents.positionC}/>;
                    }else if(val === 'D'){
                      return <Position num='D' text={props.agendaContents.positionD}/>;
                    }
                  })()
                }
                </SConfirmWrap>
                <SAlertWrap>
                  <PAlert>※一度参加すると立場は一度までしか変更できません。</PAlert>
                </SAlertWrap>
              </SFormWrap>
    
              <SBtnWrap>
              <SubBtn backColor="#FFF" wordColor={baseColor} text="戻る" clickedFn={displayFun2} />
                <CommonBtn text="参加" clickedFn={() => props.joinFun(val)}/>
              </SBtnWrap>
          </div>
          )
        }
      })()
    }
      
    </SSPWrap>
  )
};

const SSPWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 650px;
  background: #FFFFFF;
  border: 1px solid #B7B7B7;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
`;



const TSP = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.02em;

  color: #000000;
  padding: 20px;
  
`;

const SFormWrap = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 10px;
  padding-left: 30px;
`;

const SLPosition = styled.label`
  display: flex;
  column-gap: 10px;
  cursor: pointer;
`;

const SBtnWrap = styled.div`
  text-align: center;
  padding: 20px;
`;

const PConfirm = styled.p`
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.02em;

  color: #000000;
  padding: 10px;
`;

const PAlert = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: red;
`;

const SConfirmWrap = styled.div`
  width: 70%;
  margin: auto;
`;

const SAlertWrap = styled.div`
  width: 70%;
  margin-left: 40%;
  padding: 5px 0px 0px 0px;
`;
export default SelectPosition;