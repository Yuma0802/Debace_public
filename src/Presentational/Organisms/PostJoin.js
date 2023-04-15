import React,{useState} from "react";
import styled from 'styled-components';
import { useForm} from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";

import { setNL } from "../../Helpers/NewLine";
import { baseColor } from "../../assets/styles/BaseColor";
import CommonBtn from "../Atoms/CommonBtn";
import Position from "../Molecules/Position";
import ErrorMsg from "../Atoms/ErrorMsg";


const PostJoin = (props) => {
  const [display,setDisplay] = useState(0);
  const [val, setVal] = useState('A');
  const [text,setText] = useState(null);

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });
  

  const handleChange = e => setVal(e.target.value);


  const pushFirstBtn = () => {
    if(props.contents.positionA !== null){
          setDisplay(1)

        }
    else if(props.contents.positionA === null){
      setDisplay(2)
      setVal(null)
    }
  }

  const pushNextBtn = () => {
    setDisplay(2)
  }
  const pushBackBtn = () => {
    setDisplay(1)
  }

  const onSubmit = (data) => {

    props.joinFun(val , setNL(data.policy))
  }

  return(
    <>
      {
        (() => {
          if(display === 0){
            return (
              <SPostJoinFirstWrap>
                <SJoinFirstBtn>
                  <CommonBtn text="議論に参加" clickedFn={pushFirstBtn}/>
                </SJoinFirstBtn>
              </SPostJoinFirstWrap>
            )
          }
          if(display === 1){
            return(
            <SPJSelectPositionWrap>
              <SSPTop>
              <TSPexp>自分の立場を選択</TSPexp>
              <BPostSendBtn onClick={pushNextBtn}>次へ</BPostSendBtn>
              </SSPTop>
              <form id="selectPosition">
              <SSPField>
                  <SLPosition>
                    <input type="radio" name="position" value="A"  onChange={handleChange} checked={val === 'A'}/>
                    <Position num='A' text={props.contents.positionA}/>
                  </SLPosition>
                  <SLPosition>
                    <input type="radio" name="position" value="B" onChange={handleChange} checked={val === 'B'}/>
                    <Position num='B' text={props.contents.positionB}/>
                  </SLPosition>

                  {props.contents.positionC !== null &&
                    <SLPosition>
                      <input type="radio" name="position" value="C" onChange={handleChange} checked={val === 'C'}/>
                      <Position num='C' text={props.contents.positionC}/>
                    </SLPosition>
                  }
                  {props.contents.positionD !== null &&
                    <SLPosition>
                      <input type="radio" name="position" value="D" onChange={handleChange} checked={val === 'D'}/>
                      <Position num='D' text={props.contents.positionD}/>
                    </SLPosition>
                  }
              </SSPField>
              </form>
            </SPJSelectPositionWrap>
            )  
          }
          if(display === 2){
            return(
              <SInputPolicyForm onSubmit={handleSubmit(onSubmit)}>
                <SSPTop>
                  <TSPexp>議題にする自分の立場を入力</TSPexp>
                  {errors?.policy?.type === "required" && 
                  <ErrorMsg>※入力必須 </ErrorMsg>
                  }
                  {/* {errors?.policy?.type === "minLength" && 
                  <ErrorMsg>※50文字以上入力してください </ErrorMsg>
                  } */}
                  {errors?.policy?.type === "maxLength" && 
                      <ErrorMsg>※2000字以内で入力してください </ErrorMsg>
                  }
                  <SBtnWrap>
                  {props.contents.positionA !== null &&
                    <BackBtn onClick={pushBackBtn}>戻る</BackBtn>
                    }
                    <BPostSendBtn>送信</BPostSendBtn>
                  </SBtnWrap>
                </SSPTop>
                <TextareaAutosize 
                    minRows={2}
                    maxRows={6}
                    //placeholder="50文字以上"
                    style={{
                      width:"100%",
                      outline:"none",
                      borderRadius: "0 0 10px 10px",
                      border: "0.2px solid #f5f5f5",
                      resize: "none"     
                    }}
                    {...register("policy", { required: true, maxLength: 2000 })}
                  />

              </SInputPolicyForm>
            )
          }
        })()
      }
    </>


    


  )
}

//ボタン
const BPostSendBtn = styled.button`
  height: 24px;
  width: 46px;
  border: none;
  border-radius: 5px;
  color: #f5f5f5;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background-color: ${baseColor};
  /* background: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  white-space: nowrap;
  &:hover { 
    opacity: 1;
    cursor: pointer;
   
  }
`;

const BackBtn = styled.div`
  height: 24px;
  width: 46px;
  border: none;
  border-radius: 5px;
  color: #f5f5f5;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background-color: ${baseColor};
  /* background: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  &:hover { 
    opacity: 1;
    cursor: pointer;
    
  }

`;

const SPostJoinFirstWrap = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 60px;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  background: #e6e6e6;
  justify-content: center;
  @media screen and (max-width: 480px) {
   width: 80%;
   margin: 0 auto;
  }
`

const SJoinFirstBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const SPJSelectPositionWrap = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  background: #e6e6e6;
  justify-content: center;
`
const SSPTop = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 3px 5px 0px 5px;
  //column-gap: 10px;
  border-radius: 10px 10px 0px 0px;
  //background: ${baseColor};
  /* background: #E5E5E5; */
  background: #e6e6e6;
`

const TSPexp = styled.p`
  margin: 0px;
  /* padding-left: 10px; */
  @media screen and (max-width: 480px) {
   font-size: 13px;
   padding-top: 3px;
  }
`

const SSPField = styled.div`
  display: flex;
  flex-flow: column;
  background-color: white;
  padding-left: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
  row-gap: 5px;
`

const SLPosition = styled.label`
  display: flex;
  column-gap: 10px;
  :hover{
    cursor: pointer;
  }
`;

const SInputPolicyForm = styled.form`

`

const SBtnWrap = styled.div`
  display: flex;
  column-gap: 10px;
`

export default PostJoin;