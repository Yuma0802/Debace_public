import React,{ useState }from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";
import { getNowDate, getNowTime } from "../../Helpers/DateOperation";
import { useForm} from 'react-hook-form';
import Position from "../Molecules/Position";
import TextareaAutosize from "react-textarea-autosize";
import CommonBtn from "../Atoms/CommonBtn";
import ErrorMsg from "../Atoms/ErrorMsg";
import DebateDateAndTime from "../Atoms/DebateDateAndTime";
import Agenda from "./Agenda";

const CreateDebateConfirm = (props) => {


  const [val, setVal] = useState('A');

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });



  const handleChange = e => setVal(e.target.value);

  const onSubmit = (data) => {
    let position = val
    if(props.agendaContents.positionA === null){
      position = null
    }
    props.lastFun(data,position)
  }

  return(
    <>
    {/* <Header /> */}
    <SWrap>
      <STop>
        <LTop>プレビュー</LTop>
      </STop>
      <STime>
        <LFinish>討論終了時刻</LFinish>
        <SDWrap>
          <DebateDateAndTime 
            year={props.agendaContents.finishTime.getFullYear()}
            date={getNowDate(props.agendaContents.finishTime,'md')}
            time={getNowTime(props.agendaContents.finishTime,'hm')}            
          />
        </SDWrap>
      </STime>
      <SForm>
        <Agenda 
          agendaContents={props.agendaContents}
          userInfo={props.userInfo}
        />
      </SForm>

      <SFirstOpinionWrap>
      <TFirstOpinion>※作成した議論に対する自分の立場と最初の意見を入力してください。</TFirstOpinion>
      <FFirstOpinion onSubmit={handleSubmit(onSubmit)}>
        {
          props.agendaContents.positionA !== null && (
            <SSPField>
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
            </SSPField>
          )
        }

          <SPolicyWrap>
            <TPolicy>議題に対する自分の立場を文章で入力</TPolicy>
            {errors?.policy?.type === "required" && 
              <ErrorMsg>※入力必須です </ErrorMsg>
            }
            {errors?.policy?.type === "maxLength" && 
              <ErrorMsg>※2000字以内で入力してください </ErrorMsg>
            }
            <TextareaAutosize 
                minRows={4}
                style={{
                  width:"100%",
                  outline:"none",
                  border: "0.2px solid #131311",
                  resize: "none"     
                }}
                {...register("policy", { required: true, maxLength: 2000 })}
              />
          </SPolicyWrap>

          <SOpinionWrap>
          <TPolicy>議題に対する自分の意見を入力</TPolicy>
            {errors?.policy?.type === "required" && 
              <ErrorMsg>※入力必須です </ErrorMsg>
            }
            {errors?.policy?.type === "maxLength" && 
              <ErrorMsg>※2000字以内で入力してください </ErrorMsg>
            }
          <TextareaAutosize 
              minRows={4}
              style={{
                width:"100%",
                outline:"none",
                border: "0.2px solid #131311",
                resize: "none"     
              }}
              {...register("opinion", { required: true, maxLength: 2000})}
            />
          </SOpinionWrap>
      <SBtnWrap>
        <SSubBtn clickedFn={() => props.displayFun(1)}>編集する</SSubBtn>
        <CommonBtn text="投稿する" />
      </SBtnWrap>

      </FFirstOpinion>
    </SFirstOpinionWrap>

    </SWrap>
    {/* <Footer /> */}
    </>
  );
};


const SWrap = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 30px;
  padding: 15px;
  background: #FFFFFF;
  width: 100%;
 
`; 

const STop = styled.div`

`;

const LTop = styled.p`
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  letter-spacing:1px;
  text-align: center;
`;

const SForm = styled.div`

`;

const SBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10%;
`;


const STime = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: center;
`;

const LFinish = styled.p`

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  text-decoration: underline;

`;

const SDWrap = styled.div`

`;

const SFirstOpinionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  width: 100%;
`

const TFirstOpinion = styled.p`
  margin: 0px;
  
  @media (max-width: 480px) {   
       width: 80%;
      }
`;

const FFirstOpinion = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  width: 60%;
  @media (max-width: 480px) {   
       width: 100%;
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
`;

const SLPosition = styled.label`
  display: flex;
  column-gap: 10px;
  :hover{
    cursor: pointer;
  }
  @media (max-width: 480px) {   
       width: 90%;
      }
`;

const SPolicyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
  @media (max-width: 480px) {   
       width: 100%;
      }
`;

const TPolicy = styled.p`
  margin: 0px;
  
  
`

const SOpinionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
`
const SSubBtn = styled.div`
  height: 32px;
  width: 140px;
  /* margin: 0px; */

  padding-top: 5px;
  font-family: "Volkhov";
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 1.5px;
  font-feature-settings: "kern" off;
  color: ${baseColor};
  border: 1px solid ${baseColor};
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;

  display: inline-block;
  background-color: #ffffff;
  text-align: center;
  //box-shadow: 0px 4px 0px 0px #DB8D00;
  transition: 0.2s;

   &:hover { 
    cursor: pointer;
    background-color: #FFCA68;
  } 
`;

export default CreateDebateConfirm;