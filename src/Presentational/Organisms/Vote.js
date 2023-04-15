import React,{useState} from "react";
import styled from 'styled-components';
import { useForm} from 'react-hook-form';
import { baseColor } from "../../assets/styles/BaseColor";
import CommonBtn from "../Atoms/CommonBtn";


const Vote = (props) => {
  const [display,setDisplay] = useState(0);

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });


  const pushFirstBtn = () => {
    setDisplay(1)
  }

  const onSubmit = (data) => {
    if(data.opinionNum < props.contents.opinion_sum + 1){
      props.setFun(data.opinionNum)
      setDisplay(2)

    }else{
      alert("存在する意見番号を入力してください")
    }
    
  }
  const inValid = () => {
    if(errors?.opinionNum?.type === "pattern"){
      alert("半角数字で入力してください")
    }
  }
  

  return(
    <>
      {
        (() => {
          if(display === 0){
            return (
              <SPostJoinFirstWrap>
                <SJoinFirstBtn>
                  <CommonBtn text="投票する" clickedFn={pushFirstBtn}/>
                </SJoinFirstBtn>
              </SPostJoinFirstWrap>
            )
          }

          if(display === 1){
            return(
            <SPJSelectPositionWrap>
              <form onSubmit={handleSubmit(onSubmit,inValid)}>
              <SSPTop>
              <TSPexp>一番優れた議論をしていたと思う人の意見番号を入力</TSPexp>
              <BPostSendBtn>投票</BPostSendBtn>
              </SSPTop>
              
              <SSPField>
                <InputNum 
                {...register("opinionNum", { required: true,pattern:/^[0-9]+$/})}/>
              </SSPField>
              </form>
            </SPJSelectPositionWrap>
            )  
          }
          if(display === 2){
            return(
              <SPostJoinFirstWrap>
              <SJoinFirstBtn>
                <Sfinish>投票済み</Sfinish>
              </SJoinFirstBtn>
            </SPostJoinFirstWrap>
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


const SPostJoinFirstWrap = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 60px;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  background: #e6e6e6;
  justify-content: center;

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
  padding-left: 10px;
  @media screen and (max-width: 480px) {
   font-size: 10px;
   font-weight: bold;
   padding-top: 5px;
  }
`

const SSPField = styled.div`
  display: flex;
  justify-content: center;
  background-color: #d3d3d3;
  //padding-left: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
`

const InputNum = styled.input.attrs({
  // type: "number",
  placeholder: "例：1",
})`
text-align: center;
  display: flex;
  border: none;
  outline: none;
  height: 40px;
  width:25%;
  border-radius:2.5px;

  //margin-left: 15px;
  //font-size:12px;
  /* background: #d3d3d3; */
  //box-shadow: inset 0px 1px 1px #f5f5f5;
  -webkit-appearance: none !important;
  margin: 0 !important;
  -moz-appearance:textfield !important;
  
`;

const Sfinish = styled.button`
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
  color: #ffffff;
  border: none;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;

  display: inline-block;
  background-color: #FFCA68;
  text-align: center;
  //box-shadow: 0px 4px 0px 0px #DB8D00;

`;


export default Vote;