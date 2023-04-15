import React,{useEffect,useState} from "react";
import styled from 'styled-components';
import { baseColor } from "../assets/styles/BaseColor";
import { useForm} from 'react-hook-form';
//import { UserContext } from "./provider/UserProvider";
import TextareaAutosize from "react-textarea-autosize";
import ErrorMsg from "../Presentational/Atoms/ErrorMsg";
import CommonBtn from "../Presentational/Atoms/CommonBtn";

//firebase import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, doc, query, where, getDoc, getDocs,updateDoc, writeBatch, serverTimestamp} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";
import AlertBox from "../Presentational/Organisms/AlertBox";
import {useNavigate } from "react-router-dom";
import { exNl, setNL } from "../Helpers/NewLine";
import Footer from "../Presentational/Organisms/Footer";

const AccountEdit = (props) => {

  const navigate = useNavigate();

    //useState
    const [userD,setUserD] = useState({
      ...props.userInfo
    })
    const [displayFlag,setDisplayFlag] = useState(false)

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();

  //useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues:{
      name: userD.name,
      profile: exNl(userD.profile),
      favCat: userD.favCat
    }
  });

  useEffect(() => { (async() => {

    try{
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        
        if (user) {
          //ユーザー情報取得
          const usersRef = collection(db,"users");
          const q = query(usersRef,where("puid","==",user.uid))
          const querySnapshot = await getDocs(q);
          if(querySnapshot.empty){
            //初回会員登録処理
            setUserD({
              puid: user.uid,
              infoId:'NY',
              uid: "NY",
              name:"",
              profile:"",
              favCat: "政治"
            })

          }else{
            //会員情報の編集
            let ids = {}
            querySnapshot.forEach(doc => {
              ids = {
                uid:doc.data().uid,
                infoId:doc.data().infoId
              }
            })

            const infoDoc = doc(usersRef,ids.uid,'info',ids.infoId)

            const infoSnapshot = await getDoc(infoDoc)

            setUserD({
              puid: user.uid,
              infoId: ids.infoId,
              uid: infoSnapshot.data().uid,
              name: infoSnapshot.data().name,
              profile: infoSnapshot.data().profile,
              favCat: infoSnapshot.data().favCat
            })

          }
          

        } else {
          console.log('ユーザーはログインしていません')
          setDisplayFlag(false)
          userD({uid : "NL" })
          navigate('/navi?parm=toLogin')

        }
      });
      return unsubscribe;
    
    }catch(e){
      console.log(e)
      alert('エラーが発生しました。やり直してください。')
    }
  })() }, []);



  const onSubmit = async (data) => {
    
    try{

      if(userD.uid === "NY"){

        const batch = writeBatch(db)
        //user
        const userRef = collection(db, 'users')
        const userDoc = doc(userRef)
        const userId = userDoc.id
        //user/info
        const infoRef = collection(userDoc, 'info')
        const infoDoc = doc(infoRef)
        const infoId = infoDoc.id

        batch.set(userDoc,{
          puid: userD.puid,
          uid: userId,
          infoId:infoId
        })

        batch.set(infoDoc ,{
          uid: userId,
          name: data.name,
          exp:0,
          profile:setNL(data.profile),
          favorite:[],
          favCat: data.favCat,
          createdAt: serverTimestamp()
        })

        await batch.commit();
  
        props.uIF({
          puid: userD.puid,
          uid:userId,
          name:data.name,
          exp:0,
          rank:0,
          profile:setNL(data.profile),
          favorite:[],
          favCat: data.favCat,
          createdAt: new Date()
        })
  
        navigate('/navi?parm=succAM')
  
      }else{
        await updateDoc(doc(db,"users",userD.uid,'info',userD.infoId),{
          name:data.name,
          profile:setNL(data.profile),
          favCat: data.favCat,
        })
  
        props.uIF({
          ...props.userInfo,
          name:data.name,
          profile:setNL(data.profile),
          favCat: data.favCat,
        })
  
        navigate('/navi?parm=succAE')
  
      }

    }catch(e){
      console.log(e)
      alert("エラーが発生しました。やり直してください。")
    }

    

  }

  const onToLogin = () => {
    navigate('login')
  }

  return (
    <>
    <SAllWrap>
      <STop>
        <TopWord>アカウント情報登録/編集</TopWord>
      </STop>

      {
        // userD.uid !== "まだ" ? (
          <>
          {(() => {
            if(userD.uid === "NL"){
              return(
                <AlertWrap>
                  <AlertBox 
                    title="ログインしてください" 
                    text="アカウント情報の編集にはログインが必要です"
                    check="ログイン"
                    clickedFn ={onToLogin}
                    />
                </AlertWrap>
              )
            }else{
              return (
                <SFormWrap>
                <SForm onSubmit={handleSubmit(onSubmit)}>
                <STitleWrap>
                    <LTitle>アカウント名</LTitle>
                    <SITitle>
                      <ITitle  {...register("name", { required: true, maxLength: 20 })}/>
                      {errors?.name?.type === "required" && 
                        <ErrorMsg>※入力必須です </ErrorMsg>
                      }
                      {errors?.name?.type === "maxLength" && 
                        <ErrorMsg>※20文字以内で入力してください </ErrorMsg>
                      }
                    </SITitle>
                  </STitleWrap>
      
                  <SBody>
                    <LBody>プロフィール</LBody>
                    <SIBody>
                      <TextareaAutosize 
                          maxRows={4}
                          minRows={4}
                          placeholder='※必須ではありません'
                          style={{
                            width:"100%",
                            outline:"none",
                            borderRadius: "2px",
                            border: "1px solid #C4C4C4",
                            boxShadow: "inset 0px 2px 1px rgba(0, 0, 0, 0.25)",
                            resize: "none"     
                          }}
                          {...register("profile", { required: false, maxLength: 500 })}
                        />
                      {errors?.profile?.type === "maxLength" && 
                          <ErrorMsg>※500字以内で入力してください </ErrorMsg>
                      }
                    </SIBody>
                    
                  </SBody>

                  <SCategory>
                    <LCategory>お気に入りカテゴリー</LCategory>
                    <ICategory {...register("favCat")}>
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
      
                  <BtnWrap>
                    <CommonBtn text="登録" />
                  </BtnWrap>
                </SForm>
              </SFormWrap>
              )
            }
          })()}
          </>
        
      }


    </SAllWrap>
    <Footer />
    </>
  )
};

const SAllWrap = styled.div`
  width: 900px;
  border: 1px solid #C4C4C4;
  display: flex;
  flex-flow: column;
  row-gap: 0px;
  justify-content: center;
  height: 92vh;
  align-items: center;
  margin: auto;
  @media screen and (max-width: 700px) {
   width: 100%;
   height: 95vh;
  }
  @media screen and (max-width: 480px) {
   
  }
`;



const STop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${baseColor};
  opacity: 0.7;
`;

const TopWord = styled.p`
  text-align: center;
  padding-top: 13px;
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
  background: rgba(231, 231, 231);
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
  @media screen and (max-width: 480px) {
   display: block;
  }
`;

const LTitle = styled.p`
  width: 25%;
  padding-left: 2%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
   width: 100%;
   text-align: center;
  }
`;

const SITitle = styled.div`
  width: 50%;
  @media screen and (max-width: 480px) {
   margin: auto;
  }
`;

const ITitle = styled.input.attrs({
  type:'text',
})`
  width: 100%;
  height: 31px;

  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  &:focus-visible {
  outline: none;
}

`;

//議題説明
const SBody = styled.div`
  display: flex;
  @media screen and (max-width: 480px) {
   display: block;
  }
`;

const LBody = styled.p`
  width: 25%;
  padding-left: 2%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
   width: 100%;
   text-align: center;
  }
`;

const SIBody = styled.div`
  width: 65%;
  @media screen and (max-width: 480px) {
   margin: auto;
   width: 90%;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const AlertWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

//カテゴリー
const SCategory = styled.div`
  display: flex;
  @media screen and (max-width: 480px) {
   display: block;
  }
`;

const LCategory = styled.p`
  width: 40%;
    
  padding-left: 2%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 480px) {
   width: 100%;
   text-align: center;
  }
  
`;

const ICategory = styled.select.attrs({

})`
  width: 25%;
  height:24px;
  padding: 1px;
  text-align: center;
  align-items: center;
  &:hover {
    cursor:pointer;
  }
  &:focus-visible {
    //border-color: ${baseColor};
    //box-shadow: 0 0 8px 0 ${baseColor};
    outline: none;
    cursor:pointer;
  }
  @media screen and (max-width: 480px) {
    display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  }
`; 

const OCategory = styled.option.attrs({
  
})`
    &:hover {
    cursor:pointer;
  }
  
`;



export default AccountEdit;