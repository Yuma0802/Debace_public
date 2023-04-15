import React, { useState } from "react";
import styled from 'styled-components';
import { useForm} from 'react-hook-form';
import { baseColor } from "../../assets/styles/BaseColor";
import { getNowDate, getAfterNdays,getNowTime} from "../../Helpers/DateOperation";
import ErrorMsg from "../Atoms/ErrorMsg";
import { exNl, setNL } from "../../Helpers/NewLine";
import Footer from "./Footer";


const CreateDebateInputForm = (props) => {



  //現在時刻の取得
  const nowMD = getNowDate(new Date(),"md");
  //state設定
  const [positionNum, setPositionNum] = useState(2); //立場数
  const [reserveTime, setReserveTime] = useState(0); //予約投稿

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      title:props.preContents.title,
      body: exNl(props.preContents.body),
      positionA:props.preContents.positionA,
      positionB:props.preContents.positionB,
      positionC:props.preContents.positionC,
      positionD:props.preContents.positionD,
      category:props.preContents.category,
      tag1:props.preContents.tag1,
      tag2:props.preContents.tag2,
      tag3:props.preContents.tag3,
      tag4:props.preContents.tag4,
      reference:props.preContents.reference,
    }
  });



  

  //立場数の増減処理
  const plusPosition = () => {
    if(positionNum < 4){
      setPositionNum(positionNum + 1);
    }else{
      alert('立場は4つまで指定できます');
    }
  };

  const minusPosition = () => {
    if(positionNum > 2){
      setPositionNum(positionNum - 1);
    }else{
      alert('これ以上少なくできません');
    }
  };

  //予約投稿設定の表示処理

  const noneReserve = () => {
    setReserveTime(1);
  };

  const displayReserve = () => {
    setReserveTime(2);
  };

  //参考文献数増減処理
  // const plusReference = () => {
  //   if(referenceNum < 4){
  //     setReferenceNum(referenceNum + 1);
  //   }else{
  //     alert('参考文献は4つまで指定できます');
  //   }
  // };

  // const minusReference = () => {
  //   if(referenceNum > 1){
  //     setReferenceNum(referenceNum - 1);
  //   }else{
  //     alert('参考文献は空欄でも大丈夫です');
  //   }
  // };

  const onSubmit = (data) => {

    if(reserveTime === 0){
      alert('開始時刻を選択してください');
      return;
    }else{
      let startDandT = "";
      const now = new Date();
      const nowYear = now.getFullYear();

      if(reserveTime === 1){
        startDandT = new Date();
      }else if(reserveTime === 2){
        const preStartDT = data.startDate +" "+ data.startTime;
        startDandT = new Date(preStartDT);
        startDandT.setFullYear(nowYear);
      }else{
        alert('開始時刻を選択してください');
        return;
      }


      if(now > startDandT){
        alert('開始時刻を現在時刻より後に設定してください。');
        return;
      }



      let finishDandT = new Date(startDandT);

      switch(data.finishDate){
        case '当日':
          break;
        case '1日後':
          finishDandT.setDate(finishDandT.getDate() + 1);
          break;
        case '2日後':
          finishDandT.setDate(finishDandT.getDate() + 2);
          break;
        case '3日後':
          finishDandT.setDate(finishDandT.getDate() + 3);
          break;
        case '4日後':
          finishDandT.setDate(finishDandT.getDate() + 4);
          break;
        case '5日後':
          finishDandT.setDate(finishDandT.getDate() + 5);
          break;
        case '6日後':
          finishDandT.setDate(finishDandT.getDate() + 6);
          break;
        case '1週間後':
          finishDandT.setDate(finishDandT.getDate() + 7);
          break;
        case '2週間後':
          finishDandT.setDate(finishDandT.getDate() + 14);
          break;
        
        default:
          alert('日付指定の形式が誤りです。');
          return;
      } 

      let endTime = new Date(finishDandT)
      endTime.setDate(endTime.getDate() + 3)


      let splitTM = data.finishTime.split(":");

      finishDandT.setHours(splitTM[0]);
      finishDandT.setMinutes(splitTM[1]);

      let interval = finishDandT - startDandT;

      if(interval < 10800000){
        alert('開始時刻から終了時刻まで３時間以上用意してください。');
        return;
      }


      


      if(data.positionD === null || data.positionD ==='' ){
        data.positionD = null;

      }else{
        if(data.positionA === '' || data.positionA ===null){
          alert('立場Dを指定する場合、立場Aも指定してください。');
          return;
        }
        if(data.positionB === ''  || data.positionB ===null){
          alert('立場Dを指定する場合、立場Bも指定してください。');
          return;
        }
        if(data.positionC === ''  || data.positionC ===null){
          alert('立場Dを指定する場合、立場Cも指定してください。');
          return;
        }
      }

      if(data.positionC === null || data.positionC ===''){
        data.positionC = null;
      }else{
        if(data.positionA === '' || data.positionA ===null){
          alert('立場Cを指定する場合、立場Aも指定してください。');
          return;
        }
        if(data.positionB === '' || data.positionB ===null){
          alert('立場Cを指定する場合、立場Bも指定してください。');
          return;
        }
      }

      if(data.positionB ==='' || data.positionB ===null){
        data.positionB = null;
      }else{
        if(data.positionA === '' || data.positionA ===null){
          alert('立場Bを指定する場合、立場Aも指定してください。');
          return;
        }
      }

      if(data.positionA ==='' || data.positionA ===null){
        data.positionA = null;
      }else{
      if(data.positionB === '' || data.positionB ===null){
        alert('立場Aを指定する場合、立場Bも指定してください。');
        return;
      }
      }



      const convertNBody = setNL(data.body);
      const convertNReference = setNL(data.reference)

      props.saveInputContents(
        data.title,
        convertNBody,
        data.positionA,
        data.positionB,
        data.positionC,
        data.positionD,
        startDandT,
        finishDandT,
        endTime,
        data.category,
        data.tag1,
        data.tag2,
        data.tag3,
        data.tag4,
        convertNReference
      );

      props.displayFun(2);
      

      

      
    }
    


  }
  

  return(
  <>
  {/* <Header /> */}
    <SAllWrap>
      <STop>
        <TopWord>議題作成</TopWord>
      </STop>

      <SFormWrap>

        <SForm onSubmit={handleSubmit(onSubmit)}>
  
          <STitleWrap>
            <LTitle>議題名</LTitle>
            <SITitle>
              <ITitle  {...register("title", { required: true, maxLength: 50,minLength:5 })}/>
              {errors?.title?.type === "required" && 
                  <ErrorMsg>※入力必須です </ErrorMsg>
              }
              {errors?.title?.type === "maxLength" && 
                  <ErrorMsg>※50文字以内で入力してください </ErrorMsg>
              }
              {errors?.title?.type === "minLength" && 
                  <ErrorMsg>※5文字以上入力してください </ErrorMsg>
              }
            </SITitle>
          </STitleWrap>

          <SBody>
            <LBody>議題説明</LBody>
            <SIBody>
              <IBody {...register("body", { required: true, maxLength: 2000,minLength:10 })}/>
              {errors?.body?.type === "required" && 
                  <ErrorMsg>※入力必須です </ErrorMsg>
              }
              {errors?.body?.type === "maxLength" && 
                  <ErrorMsg>※2000字以内で入力してください </ErrorMsg>
              }
              {errors?.body?.type === "minLength" && 
                  <ErrorMsg>※10字以上で入力してください </ErrorMsg>
              }
            </SIBody>
            
          </SBody>


          <SPosition>
            <LPosition>立場設定</LPosition>
            <PositonField>
              <IPositonSet>
                <IPositonlabel>A</IPositonlabel>
                <SIPosition>
                  <IPosition {...register("positionA", { required: false, maxLength: 100 })} />
                  {errors?.positionA?.type === "maxLength" && 
                      <ErrorMsg>※100字以内で入力してください </ErrorMsg>
                  }
                </SIPosition>
              </IPositonSet>
              <IPositonSet>
                <IPositonlabel>B</IPositonlabel>
                <SIPosition>
                  <IPosition {...register("positionB", { required: false, maxLength: 100 })}/>
                  {errors?.positionB?.type === "maxLength" && 
                      <ErrorMsg>※100字以内で入力してください </ErrorMsg>
                  }
                </SIPosition>
              </IPositonSet>
              {positionNum > 2 &&
                <IPositonSet>
                  <IPositonlabel>C</IPositonlabel>
                  <SIPosition>
                    <IPosition {...register("positionC", { maxLength: 100 })}/>
                    {errors?.positionC?.type === "maxLength" && 
                      <ErrorMsg>※100字以内で入力してください </ErrorMsg>
                    }
                  </SIPosition>
                </IPositonSet>
              }
              {positionNum > 3 &&
                <IPositonSet>
                <IPositonlabel>D</IPositonlabel>
                <SIPosition>
                <IPosition {...register("positionD", { maxLength: 100 })}/>
                    {errors?.positionD?.type === "maxLength" && 
                      <ErrorMsg>※100字以内で入力してください </ErrorMsg>
                    }
                  </SIPosition>
              </IPositonSet>
              }
              
            </PositonField>
              <IPositionBtn>
                <IPositionPlus onClick={plusPosition}>+</IPositionPlus>
                <IPositionMinus onClick={minusPosition}>－</IPositionMinus>
              </IPositionBtn>            
          </SPosition>


          <SDandT>
            <LDandT>開始・終了時刻設定</LDandT>
            <SDandTField>
              <SStartWrap>
                <LStart>開始時刻</LStart>
                <SStartField>
                  
                  <SNowOrReserve>
                    <LNow reserveFlag={reserveTime} onClick={noneReserve} >すぐに開始</LNow>
                    <LReserve reserveFlag={reserveTime} onClick={displayReserve}>開始時間を選択</LReserve> 
                    {
                      reserveTime === 0 &&
                      <SMsg>
                        <Msg>※どちらか選択してください</Msg>
                      </SMsg>
                    }
                  </SNowOrReserve>


                  
                  {
                    reserveTime === 2 &&
                  <SStartSet>
                    <IStartDate {...register("startDate")}>
                      <OStartDate>{nowMD}</OStartDate>
                      <OStartDate>{getAfterNdays(1,'md')}</OStartDate>
                      <OStartDate>{getAfterNdays(2,'md')}</OStartDate>
                      <OStartDate>{getAfterNdays(3,'md')}</OStartDate>
                      <OStartDate>{getAfterNdays(4,'md')}</OStartDate>
                      <OStartDate>{getAfterNdays(5,'md')}</OStartDate>
                      <OStartDate>{getAfterNdays(6,'md')}</OStartDate>
                    </IStartDate>
                    <IStartTime  {...register("startTime", { required: true, pattern: /^([01][0-9]|2[0-3]):[0-5][0-9]$/})}/>
                    {errors?.startTime?.type === "required" && 
                      <ErrorMsg>※時間を入力してください。 </ErrorMsg>
                    }
                    {errors?.startTime?.type === "pattern" && 
                      <ErrorMsg>※01:09の形式で入力してください。 </ErrorMsg>
                    }
                  </SStartSet>
                  }

                </SStartField>
              </SStartWrap>

              <SFinishWrap>
                <LFinish>終了時刻</LFinish>
                <SFinishSet>
                  <IFinishDate {...register("finishDate")}>
                    <OFinishDate>当日</OFinishDate>
                    <OFinishDate>1日後</OFinishDate>
                    <OFinishDate>2日後</OFinishDate>
                    <OFinishDate>3日後</OFinishDate>
                    <OFinishDate>4日後</OFinishDate>
                    <OFinishDate>5日後</OFinishDate>
                    <OFinishDate>6日後</OFinishDate>
                    <OFinishDate>1週間後</OFinishDate>
                    <OFinishDate>2週間後</OFinishDate>
                  </IFinishDate>
                  <IFinishTime {...register("finishTime" , { required: true, pattern: /^([01][0-9]|2[0-3]):[0-5][0-9]$/})}/>
                  {errors?.finishTime?.type === "required" && 
                      <ErrorMsg>※時間を入力してください。 </ErrorMsg>
                    }
                  {errors?.finishTime?.type === "pattern" && 
                      <ErrorMsg>※01:01の形式で入力してください。 </ErrorMsg>
                    }
                </SFinishSet>
              </SFinishWrap>
            </SDandTField>
          </SDandT>


          <SCategory>
            <LCategory>カテゴリー選択</LCategory>
            <ICategory {...register("category")}>
              <OCategory>政治</OCategory>
              <OCategory>経済</OCategory>
              <OCategory>社会問題</OCategory>
              <OCategory>テクノロジー</OCategory>
              <OCategory>歴史</OCategory>
              <OCategory>学問</OCategory>
              <OCategory>エンタメ</OCategory>
              <OCategory>生活</OCategory>
              <OCategory>その他</OCategory>
            </ICategory>
          </SCategory>

          <STag>
            <LTag>タグを記入</LTag>
            <STagField>
              
              <ITag {...register("tag1", {maxLength: 20, pattern: /^#/})}/>
              <ITag {...register("tag2", {maxLength: 20, pattern: /^#/})}/>
              <ITag {...register("tag3", {maxLength: 20, pattern: /^#/})}/>
              <ITag {...register("tag4", {maxLength: 20, pattern: /^#/})}/>
              {
                (() => {
                    if(errors?.tag1?.type === "maxLength" || errors?.tag2?.type === "maxLength" || 
                    errors?.tag3?.type === "maxLength" || errors?.tag4?.type === "maxLength"){
                      return <ErrorMsg>※20文字以内</ErrorMsg>;
                    }
                  })()
              }
             

              {
                (() => {
                  if(errors?.tag1?.type === "pattern" || errors?.tag2?.type === "pattern" || 
                  errors?.tag3?.type === "pattern" || errors?.tag4?.type === "pattern"){
                    return <ErrorMsg>※文頭に半角#をつけて下さい。</ErrorMsg>;
                  }
                })()
              }
             
           
            </STagField>
          </STag>


          <SReference>
            <LReference>参考文献</LReference>
            <SReferenceField>
              <IReference {...register("reference",{maxLength:10000})}/>
              {errors?.reference?.type === "maxLength" && 
                <ErrorMsg>※1万文字以内で入力してください。 </ErrorMsg>
              }
            </SReferenceField>

          </SReference>

          <SSubmitDiv>
            <ConfirmBtn />
          </SSubmitDiv>

        </SForm>
          
      </SFormWrap>
    <Footer />
    </SAllWrap>
    

   
    </>
  );
};

const SFooer = styled.div`
width: 100%;
`;

const SAllWrap = styled.div`
  width: 1000px;
  border: 1px solid #C4C4C4;
  display: flex;
  flex-flow: column;
  row-gap: 0px;
  padding-top: 54px;
  @media (max-width: 480px) {
        display: block;
        width: 100%;
    }
`;

const STop = styled.div`
  width: 100%;
  height: 32px;
  background-color: ${baseColor};
  opacity: 0.7;
`;

const TopWord = styled.p`
  text-align: center;
  
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 29px;
  
  letter-spacing:1px;
  text-align: center;

  color: #FFFFFF;
`;

const SFormWrap = styled.div`
  width: 100%;
  background: rgba(231, 231, 231, 0.5);
`;

//入力フォーム全体
const SForm = styled.form`
  display: flex;
  flex-flow: column;
  row-gap: 30px;
  margin: 20px;
  padding: 15px;
  background: #FFFFFF;
  
`;

//議題名
const STitleWrap = styled.div`
  display: flex;
  @media (max-width: 480px) {
        display: block;
    }
`;

const LTitle = styled.p`
  width: 25%;
  padding-left: 5%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;

  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const SITitle = styled.div`
  width: 65%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const ITitle = styled.input.attrs({
  type:'text',
  placeholder:'50文字まで'
})`
  width: 100%;
  height: 31px;

  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  &:focus-visible {
  border-color: ${baseColor};
  box-shadow: 0 0 8px 0 ${baseColor};
  outline: none;
  @media screen and (max-width: 480px) {
    
  }
}
  

`;

//議題説明
const SBody = styled.div`
  display: flex;
  @media (max-width: 480px) {
        display: block;
    }
`;

const LBody = styled.p`
  width: 25%;
  
  padding-left: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }

`;

const SIBody = styled.div`
  width: 65%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const IBody = styled.textarea.attrs({
  
})`
  width: 100%;
  height: 130px;

  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  &:focus-visible {
  border-color: ${baseColor};
  box-shadow: 0 0 8px 0 ${baseColor};
  outline: none;
}
  
`;

//立場設定
const SPosition = styled.div`
  display: flex;
  @media (max-width: 480px) {
        display: block;
    }
`;

const LPosition = styled.p`
  width: 25%;
  
  padding-left: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

//立場設定->書き込み部分

const IPosition = styled.input.attrs({
  type:'text',
  id: 'position'
})`
  width: 100%;
  height: 31px;

  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  &:focus-visible {
  border-color: ${baseColor};
  box-shadow: 0 0 8px 0 ${baseColor};
  outline: none;
}
@media screen and (max-width: 480px) {
    width: 100%;
    margin-left: 10px; 
  }
  
`;

const SIPosition = styled.div`
  width: 100%;
`;

const PositonField = styled.div`
  width: 60%;
  @media screen and (max-width: 480px) {
    width: 90%;
  }
`;

const IPositonSet = styled.div`
  display: flex;
  width: 100%;

  
`;

const IPositonlabel = styled.label.attrs({
  id: 'position'
})`
  width: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 29px;
  color: #000000;

`;

const IPositionBtn = styled.div`
 display: flex;
 margin-left: 3%;
 @media screen and (max-width: 480px) {
    margin-top: 5px;
  }
`;


const IPositionPlus = styled.div`
   font-family: 'Roboto';
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 29px;
    padding-left: 4px;
    text-align: center;
    color: #000000;
    background-color: rgba(231, 231, 231, 0.5);
    width: 36px;
    height: 30px;
    border-radius:80% 0 0 80%/80% 0 0 80%;
    
    box-shadow: 0px 2px 1.5px rgba(0,0,0,0.3); 
    border-right: solid 1px #FFF;

    &:hover{
      cursor: pointer;
    }

    &:active {
      -webkit-transform: translate(0,2px);
      -moz-transform: translate(0,2px);
      transform: translate(0,2px);
      border-bottom:none;
      box-shadow: none;
	  }

`;
const IPositionMinus = styled.div`
   font-family: 'Roboto';
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 29px;
    padding-left: 4px;
    text-align: center;
    color: #000000;
    background-color: rgba(231, 231, 231, 0.5);
    width: 36px;
    height: 30px;
    border-radius:0 80% 80% 0%/0 80% 80% 0;
    box-shadow: 1px 2px 1.5px rgba(0,0,0,0.3); 
    &:hover{
      cursor: pointer;
    }

    &:active {
      -webkit-transform: translate(0,2px);
      -moz-transform: translate(0,2px);
      transform: translate(0,2px);
      border-bottom:none;
      box-shadow: none;
	  }


`;



//開始終了時刻

const nowTime = getNowTime(new Date(),"hm");

const SDandT = styled.div`
  display: flex; 
  @media (max-width: 480px) {
        display: block;
    }
`;

const LDandT = styled.p`
  width: 25%;
    
  padding-left: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const SDandTField =styled.div`
  width: 100%; 
  display: flex;
  flex-flow: column;
  row-gap: 20px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

//開始終了時刻 -> 開始時刻設定
  const SStartWrap = styled.div`
    display:flex;
    
    width:100%;
    @media screen and (max-width: 480px) {
    display: block;
  }
  `;

  const LStart = styled.p`
    width: 25%;
    
    padding-left: 5%;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 29px;
    color: #000000;
    @media (max-width: 480px) {   
        width: 100%;
    }
  `;

  const SStartField = styled.div`
    display: flex;
    flex-flow: column;
    row-gap: 20px;
    width: 100%;
  `;

//開始終了時刻 -> 開始時刻設定 -> すぐ開始か開始予約かを選択

  const SNowOrReserve = styled.div`
   display: flex;
   width: 80%;
   column-gap: 3%;
  `;


    const LNow = styled.div`

      width: 90px;
      text-align: center;

      background-color: rgba(231, 231, 231, 0.5);
      border: solid 0.1px black;
      padding: 5px ;
      box-shadow: 1px 2px 1.5px rgba(0,0,0,0.3); 
      border-radius: 4px;
      height: 27px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 300;
      font-size: 10px;
      color: #000000;

      &:hover{
        cursor: pointer;
      }

      //押されたときのアクション
      background-color: ${(props) => (props.reserveFlag === 1 && baseColor)};
      -webkit-transform: ${(props) => (props.reserveFlag === 1 && 'translate(0,2px)')};
      -moz-transform: ${(props) => (props.reserveFlag === 1 && 'translate(0,2px)')};
      transform: ${(props) => (props.reserveFlag === 1 && 'translate(0,2px)')};
      box-shadow: ${(props) => (props.reserveFlag === 1 && 'none')};
      color: ${(props) => (props.reserveFlag === 1 && 'white')};

      @media (max-width: 480px) {   
        height: 25px;
        box-shadow: none;
    }
    `;

    const LReserve = styled.div`

      width: 90px;
      text-align: center;
      border: solid 0.1px black;
      background-color: rgba(231, 231, 231, 0.5);
      padding: 5px ;
      box-shadow: 1px 2px 1.5px rgba(0,0,0,0.3); 
      border-radius: 4px;
      height: 27px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 300;
      font-size: 10px;
      color: #000000;

      

      &:hover{
        cursor: pointer;
      }

      //押されたときのアクション
      background-color: ${(props) => (props.reserveFlag === 2 && baseColor)};
      -webkit-transform: ${(props) => (props.reserveFlag === 2 && 'translate(0,2px)')};
      -moz-transform: ${(props) => (props.reserveFlag === 2 && 'translate(0,2px)')};
      transform: ${(props) => (props.reserveFlag === 2 && 'translate(0,2px)')};
      box-shadow: ${(props) => (props.reserveFlag === 2 && 'none')};
      color: ${(props) => (props.reserveFlag === 2 && 'white')};

      @media (max-width: 480px) {   
        height: 25px;
        -webkit-transform: ${(props) => (props.reserveFlag === 2 && 'translate(0,2px)')};
    }
    
    `;

 const SMsg = styled.p`
    @media (max-width: 480px) {   
        display: none;
    }
 `;

//開始終了時刻 -> 開始時刻設定 -> 入力部分
  const SStartSet = styled.div`
    display: flex;
    align-items: center;
    column-gap:3%;
    width:100%;
    @media (max-width: 480px) {
        display: block;   
       
    }
  `;  

  const IStartDate = styled.select.attrs({

  })`
    width: 23%;
    height:24px;
    padding: 1px;
    text-align: center;
    align-items: center;
    &:focus-visible {
      border-color: ${baseColor};
      box-shadow: 0 0 8px 0 ${baseColor};
      outline: none;
    }
    @media (max-width: 480px) {   
        height: 27px;
        margin-right: 5px;
        width: 35%;
    }
  `;

  const OStartDate = styled.option.attrs({

  })`
  
  `;

  const IStartTime = styled.input.attrs({
    type:'time'
  })`
    width: 23%;
    height: 24px;
    padding: 1px;
    border: solid 1px rgb(118, 118, 118);
    border-radius: 3px;
    text-align: center;
    align-items: center;
    &:focus-visible {
      border-color: ${baseColor};
      box-shadow: 0 0 8px 0 ${baseColor};
      outline: none;
    }
    @media (max-width: 480px) {   
        width: 35%;
    }
  `;

//開始終了時刻 -> 開始時刻設定

  const SFinishWrap = styled.div`
    display: flex;
    width:100%;
    @media screen and (max-width: 480px) {
    display: block;  
    
  }
  `;

  const LFinish = styled.p`
    width: 25%;
    
    padding-left: 5%;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 29px;
    color: #000000;
    @media screen and (max-width: 480px) {
    width: 100%;
  }
  `;

    //開始終了時刻 -> 開始時刻設定 -> 入力部分
    const SFinishSet = styled.div`
      display: flex;
      width:100%;
      align-items: center;
      column-gap:3%;
      @media (max-width: 480px) {
        display: block;   
    }
    `;

    const IFinishDate = styled.select.attrs({

    })`
      width: 15%;
      height:24px;
      padding: 1px;
      text-align: center;
      align-items: center;
      &:focus-visible {
        border-color: ${baseColor};
        box-shadow: 0 0 8px 0 ${baseColor};
        outline: none;
      }
      @media screen and (max-width: 480px) {
    width: 35%;
    height: 27px;
    margin-right: 5px;
  }
    `; 

    const  OFinishDate = styled.option.attrs({

    })`
    
    `;

    const IFinishTime = styled.input.attrs({
      type:'time'
    })`
      width: 15%;
      height: 24px;
      padding: 1px;
      border: solid 1px rgb(118, 118, 118);
      border-radius: 3px;
      text-align: center;
      align-items: center;
      &:focus-visible {
        border-color: ${baseColor};
        box-shadow: 0 0 8px 0 ${baseColor};
        outline: none;
      }
      @media screen and (max-width: 480px) {
      width: 35%;
      
  }
    `;

//カテゴリー
const SCategory = styled.div`
  display: flex;
  @media (max-width: 480px) {
        display: block;
    }
`;

const LCategory = styled.p`
  width: 25%;
    
  padding-left: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const ICategory = styled.select.attrs({

})`
  width: 15%;
  height:24px;
  padding: 1px;
  text-align: center;
  align-items: center;
  &:focus-visible {
    border-color: ${baseColor};
    box-shadow: 0 0 8px 0 ${baseColor};
    outline: none;
  }
  @media screen and (max-width: 480px) {
    width: 40%;
    
  }
`; 

const OCategory = styled.option.attrs({

})`

`;

//タグ
const STag = styled.div`
  display: flex;
  @media (max-width: 480px) {
        display: block;
    }
`;

const LTag = styled.p`
  width: 25%;
    
  padding-left: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const STagField = styled.div`
  display: flex;
  column-gap: 2%;
  @media (max-width: 480px) { 
       column-gap: 5%;
       padding-left: 10px;
       display: block;
      }
`;

const ITag = styled.input.attrs({
  type:'text',
})`
  width: 15%;
  height: 31px;

  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1.5px solid #ADADAD;

  color: #44BCFF;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 14px;

  /* border-color: ${(props) => (props.errorColor !== 0 && 'red')}; */

  &:focus-visible {
  border-color: ${baseColor};
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
}
@media screen and (max-width: 480px) {
    margin-left: 20px;
    width:  35%;
    height: 27%;
    
  }
  
`;

const HintTag = styled.p`

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #000000;
`;



//~~参考文献~~
const SReference = styled.div`
  display: flex;
  @media (max-width: 480px) {
        display: block;
    }
`;

const LReference = styled.p`
  width: 25%;
  
  padding-left: 5%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

//参考文献 -> 入力エリア
const SReferenceField = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column;
  row-gap: 30px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const IReference = styled.textarea.attrs({
  placeholder: "※任意です"
})`
  width: 100%;
  height: 90px;

  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  &:focus-visible {
  border-color: ${baseColor};
  box-shadow: 0 0 8px 0 ${baseColor};
  outline: none;
}
  
`;

const SReferenceSet = styled.div`
  width: 100%;
`;


  const LReferenceName = styled.label.attrs({
    id: 'referenceName'
  })`
    width: 20%;
  
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 450;
    font-size: 16px;
    color: #000000;
  
  `;

  const LReferenceUrl = styled.label.attrs({
    id: 'referenceUrl'
  })`
    width: 20%;
  
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 450;
    font-size: 16px;
    color: #000000;
  
  `;

  const SIReferenceName = styled.div`
    width: 100%;
  `;

  const IReferenceName = styled.input.attrs({
    type:'text',
    id: 'referenceName'
  })`
    width: 100%;
    height: 31px;

    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
    border-radius: 2px;

    &:focus-visible {
    border-color: ${baseColor};
    box-shadow: 0 0 8px 0 ${baseColor};
    outline: none;
  }
    

  `;

  const SIReferenceUrl = styled.div`
      width: 100%;
  `;

  const IReferenceUrl = styled.input.attrs({
    type:'text',
    id: 'referenceUrl'
  })`
    width: 100%;
    height: 31px;

    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
    border-radius: 2px;

    &:focus-visible {
    border-color: ${baseColor};
    box-shadow: 0 0 8px 0 ${baseColor};
    outline: none;
  }

  `;


//参考文献 -> 増減ボタン
const SReferenceBtn = styled.div`
 display: flex;
 margin-left: 3%;
`;

const IReferencePlus = styled.div`
font-family: 'Roboto';
 font-style: normal;
 font-weight: 450;
 font-size: 18px;
 line-height: 29px;
 padding-left: 4px;
 text-align: center;
 color: #000000;
 background-color: rgba(231, 231, 231, 0.5);
 width: 36px;
 height: 30px;
 border-radius:80% 0 0 80%/80% 0 0 80%;
 
 box-shadow: 0px 2px 1.5px rgba(0,0,0,0.3); 
 border-right: solid 1px #FFF;

 &:hover{
   cursor: pointer;
 }

 &:active {
   -webkit-transform: translate(0,2px);
   -moz-transform: translate(0,2px);
   transform: translate(0,2px);
   border-bottom:none;
   box-shadow: none;
 }

`;

const IReferenceMinus = styled.div`
font-family: 'Roboto';
 font-style: normal;
 font-weight: 450;
 font-size: 18px;
 line-height: 29px;
 padding-left: 4px;
 text-align: center;
 color: #000000;
 background-color: rgba(231, 231, 231, 0.5);
 width: 36px;
 height: 30px;
 border-radius:0 80% 80% 0%/0 80% 80% 0;
 box-shadow: 1px 2px 1.5px rgba(0,0,0,0.3); 
 &:hover{
   cursor: pointer;
 }

 &:active {
   -webkit-transform: translate(0,2px);
   -moz-transform: translate(0,2px);
   transform: translate(0,2px);
   border-bottom:none;
   box-shadow: none;
 }


`;

//送信ボタン
const SSubmitDiv = styled.div`
  text-align: center;
`;

//エラーメッセージ
// const ErrorMsg = styled.p`
//   font-family: 'Roboto';
//   font-style: normal;
//   font-weight: 300;
//   font-size: 14px;
//   color: red;
// `;
const Msg = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
`;

const ConfirmBtn = styled.input.attrs({
  type:'submit',
  value:'確認'
})`
  height: 32px;
  width: 140px;
  color: white;
  display:inline-block;
  background-color: ${baseColor};
  border:0px;
  
  text-align: center;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  
  &:hover {
    cursor: pointer;
  }

`;


export default CreateDebateInputForm;