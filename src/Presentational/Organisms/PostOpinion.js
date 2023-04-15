import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";
import TextareaAutosize from "react-textarea-autosize";
import { useForm} from 'react-hook-form';
import { setNL } from "../../Helpers/NewLine";

const PostOpinion = (props) => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit = (data) => {
    let replyVal = null
    if(data.reply !== ""){
      if(data.reply <= 501){
        replyVal = Number(data.reply)
        
      }else{
        alert("存在する意見にのみ返信できます")
        return
      }
    }
    let bodyVal = setNL(data.body)

    props.setFun(replyVal,bodyVal)

    reset();

  }

  const inValid = () => {
    if(errors?.body?.type === "maxLength"){
      alert("1つの意見は2000文字以内にまでです")
    }
    if(errors?.reply?.type === "pattern"){
      alert("半角数字で入力してください")
    }
    if(errors?.body?.type === "required"){
      alert("意見が入力されていません")
    }
  }


  return (
    <>
    <FSpeechWrapForm onSubmit={handleSubmit(onSubmit,inValid)}>

      <SSpeechTop>

        <STopMenu>
          <SReplyWrap>
            <SPostReplyIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
              <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
            </svg>
            </SPostReplyIcon>
            <SPostReplySend 
            {...register("reply", { required: false,pattern:/^[0-9]+$/})}
            />
          </SReplyWrap>
          {/* <SChangeIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          </SChangeIcon> */}
        </STopMenu>

        <SPostSendBtn>送信</SPostSendBtn>
      </SSpeechTop>

      {/* <SSpeechContents> */}
        {/* <SPostopinionText></SPostopinionText> */}
        <TextareaAutosize 
          minRows={2}
          maxRows={6}
          placeholder="意見を書き込む"
          style={{
            width:"100%",
            outline:"none",
            borderRadius: "0 0 10px 10px",
            border: "0.2px solid #f5f5f5",
            resize: "none"     
          }}
          {...register("body", { required: true, maxLength: 2000 })}
        />
      {/* </SSpeechContents> */}


    </FSpeechWrapForm>
</>
  );
};

const FSpeechWrapForm = styled.form`
  display: flex;
  flex-flow: column;
  width: 90%;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  margin: 0 auto; /* 追加 */
  @media screen and (max-width: 480px) {
   width: 90%;
  }
`;


const SSpeechTop = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px 3px 10px;
  //column-gap: 10px;
  border-radius: 10px 10px 0px 0px;
  //background: ${baseColor};
  /* background: #E5E5E5; */
  background: #e6e6e6;
`;

const STopMenu = styled.div`
  display: flex;
  column-gap: 15px;
`

const SReplyWrap = styled.div`
  display: flex;
  column-gap: 5px;
`

const SPostReplyIcon = styled.svg`
  display: flex;
  height: 24px;
  width: 24px;
  color: #131311;
  transform: scale(-1,1);
  padding-bottom: 2px;
  &:hover { 
    cursor: pointer;
    background-color: #CCCCCC;
  }
`;

const SPostReplySend = styled.input.attrs({
  // type: "number",
  placeholder: "返信先",
})`
  display: flex;
  border: none;
  outline: none;
  text-align: center;
  width: 100px;
  height: 24px;

  //margin-left: 15px;
 font-size:12px;
  /* background: #d3d3d3; */
  //box-shadow: inset 0px 1px 1px #f5f5f5;
  -webkit-appearance: none !important;
  margin: 0 !important;
  -moz-appearance:textfield !important;
  
`;

const SChangeIcon = styled.svg`
  display: flex;
  justify-content: center;
  height: 24px;
  width: 24px;
  color: #131311;
  padding-left: 2.5px;
  padding-top: 2px;
  &:hover { 
    cursor: pointer;
    background-color: #CCCCCC;
  }

` 

const SPostSendBtn = styled.button`
  height: 24px;
  font-size: 15px;
  color: #f5f5f5;
  //width: 27px;
  border: none;
  border-radius: 5px;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background-color: ${baseColor};
  /* background: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover { 
    cursor: pointer;
    background-color: #FFCA68;
  }

`;

const SSpeechContents = styled.div`
  width: 100%;
  //height: 75%;
  display: flex;
  //padding: 5px 5px 5px 5px;
  justify-content: center;
  border-radius: 0px 0px 10px 10px;
`;


const SPostopinionText = styled.textarea.attrs({
  placeholder: "意見を書き込む",
  rows:2
  
})`
  display: flex;
  
  width: 100%;
  //height: 60px;
  //padding: 10px;
  resize: none;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  border-radius: 0 0 10px 10px;
  border: 0.2px solid #f5f5f5;
  /* border-right: none;
  border-bottom: none;
  border-left: none; */

`;


export default PostOpinion;