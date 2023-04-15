import React, {useState} from "react";
import styled from 'styled-components';
import { useForm} from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";
import { baseColor } from "../../assets/styles/BaseColor";
import CommonBtn from "../Atoms/CommonBtn";
import Position from "../Molecules/Position";
import ErrorMsg from "../Atoms/ErrorMsg";

const CreateDebateFirsstOpinion = (props) => {
  const [val, setVal] = useState('A');

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const handleChange = e => setVal(e.target.value);

  return (
    <SFirstOpinionWrap>
      <TFirstOpinion>作成した議論に対する自分の立場と最初の意見を入力してください</TFirstOpinion>
      <FFirstOpinion>
        {
          props.contents.positionA !== null && (
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
          )
        }

          <SPolicyWrap>
            <TPolicy>議題に対する自分の立場を文章で入力</TPolicy>
            <TextareaAutosize 
                minRows={4}
                placeholder="50文字以上"
                style={{
                  width:"100%",
                  outline:"none",
                  borderRadius: "0 0 10px 10px",
                  border: "0.2px solid #f5f5f5",
                  resize: "none"     
                }}
                {...register("policy", { required: true, maxLength: 2000,minLength:50 })}
              />
          </SPolicyWrap>

          <SOpinionWrap>
          <TPolicy>自分の意見を入力</TPolicy>
          <TextareaAutosize 
              minRows={4}
              style={{
                width:"100%",
                outline:"none",
                borderRadius: "0 0 10px 10px",
                border: "0.2px solid #f5f5f5",
                resize: "none"     
              }}
              {...register("policy", { required: true, maxLength: 2000})}
            />
          </SOpinionWrap>
        <CommonBtn text="送信"/>
      </FFirstOpinion>
    </SFirstOpinionWrap>
  )
};

const SFirstOpinionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TFirstOpinion = styled.p`
  margin: 0px;
`;

const FFirstOpinion = styled.form`

`;

const SSPField = styled.div`
  display: flex;
  flex-flow: column;
  background-color: white;
  padding-left: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
  row-gap: 5px;
  @media (max-width: 480px) {   
       width: 100%;
      }
`;

const SLPosition = styled.label`
  display: flex;
  column-gap: 10px;
  :hover{
    cursor: pointer;
  }
`;

const SPolicyWrap = styled.wrap`
  display: flex;
  flex-direction: column;
  column-gap: 10px;
`;

const TPolicy = styled.p`
  margin: 1px;
`;

const SOpinionWrap = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 10px;
`;


export default CreateDebateFirsstOpinion;