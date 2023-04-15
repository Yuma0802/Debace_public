import React,{useEffect, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Atoms/Loader";

const AlertBox = (props) => {
  //router
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  //alertParm
  const parm = searchParams.get('parm')

  //state
  const [showFlag, setShowFlag] = useState(false)
  const [title, setTitle] = useState(null)
  const [text, setText] = useState(null)
  const [check, setCheck] = useState(null)
  
  useEffect(() => {
    if(parm === "toLogin"){
      setTitle("お願い")
      setText("ログインしてください。")
      setCheck("ログイン")
    }
    if(parm === "noDebate"){
      setTitle("注意")
      setText("このディベートは表示できません。")
      setCheck("ホームへ戻る")
    }
    if(parm === "noUser"){
      setTitle("注意")
      setText("そのユーザーは表示できません。")
      setCheck("ホームへ戻る")
    }
    if(parm === "Smade"){
      setTitle("成功")
      setText("議論の作成に成功しました。")
      setCheck("ホームへ戻る")
    }
    if(parm === "Fmade"){
      setTitle("失敗")
      setText("失敗しました、やりなおしてください。")
      setCheck("議論作成へ戻る")
    }
    if(parm === "succAM"){
      setTitle("成功")
      setText("アカウントの作成に成功しました。")
      setCheck("My pageへ")
    }
    if(parm === "succAE"){
      setTitle("成功")
      setText("アカウント情報の変更に成功しました。")
      setCheck("My pageへ")
    }
    if(parm === "logout"){
      setTitle("ログアウト")
      setText("ログアウトしました。")
      setCheck("ホームへ戻る")
    }
    if(parm === "login"){
      setTitle("ログイン")
      setText("ログインしました。")
      setCheck("ホームへ戻る")
    }
    if(parm === "Flogin"){
      setTitle("失敗")
      setText("ログインに失敗ししました。")
      setCheck("戻る")
    }

    if(props.parm === "404"){
      setTitle("404 Not Found")
      setText("現在このページは存在していません。")
      setCheck("ホームへ戻る")
    }

  },[])

  useEffect(() => {
    if(title !== null){
      if(text !== null){
        if(check !== null){
          setShowFlag(true)
        }
      }
    }
  },[title,text,check])

  const onFun = () => {
    if(parm === "toLogin"){ navigate("/login/")}
    if(parm === "noDebate"){ navigate("/")}
    if(parm === "noUser"){ navigate("/")}
    if(parm === "Smade"){ navigate("/")}
    if(parm === "Fmade"){ navigate("/create")}
    if(parm === "succAM"){ navigate(`/mypage?uid=${props.userInfo.uid}`)}
    if(parm === "succAE"){ navigate(`/mypage?uid=${props.userInfo.uid}`)}
    if(parm === "logout"){ navigate("/")}
    if(parm === "login"){ navigate("/")}
    if(parm === "Flogin"){ navigate("/login/")}
    if(props.parm === "404"){ navigate("/")}
  }
  
  return(
    <>
    {
     showFlag ? (
      <SAlertBox>
        <SAlertBoxTop>
          <SAlertBoxTitle>{title}</SAlertBoxTitle>
        </SAlertBoxTop>
        <SAlertBoxTextWrap>
          <SAlertBoxText>{text}</SAlertBoxText>
        </SAlertBoxTextWrap>
        <SAlertBoxCheckBtnWrap>
          <SAlertBoxCheckBtn onClick={onFun}>{check}</SAlertBoxCheckBtn>
        </SAlertBoxCheckBtnWrap>
      </SAlertBox>
     ) : <Loader />
    }
    </>
  )
};  

const SAlertBox = styled.div`
  position: fixed;
  width: 90%;
  max-width: 400px;
  height: auto;
  transform: translate(-50%, -50%);
  text-align: center;
  background: white;
  border-radius: 5px;
  border: 5px solid #FFA500;
  margin: 0 auto;
  top: 50%;
  left: 50%;

  @media only screen and (min-width: 768px) {
    width: 60%;
    height: 250px;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SAlertBoxTop = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const SAlertBoxTextWrap = styled.div`
  padding: 20px 30px;
`;

const SAlertBoxTitle = styled.p`
  width: 85%;
  height: 37px;
  font-family: "Volkhov";
  font-weight: 600;
  font-size: 32px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #000000;
  border-bottom: 1px solid;
  border-bottom-width: 0.5px;
  text-align: center; /* 中央揃えにする */
`;



const SAlertBoxText = styled.p`
  width: 100%;
  font-family: "Volkhov";
  font-weight: bold;
  font-size: 17px;
  line-height: 1.5; /* 行間を調整 */
  letter-spacing: -0.02em;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all; /* 長い単語を折り返す */
  white-space: pre-line; /* 改行を保持する */
`;


const SAlertBoxCheckBtnWrap = styled.div`
  padding-bottom: 10px;
`;

const SAlertBoxCheckBtn = styled.button`
  width: 150px;
  height: 40px;
  border: none;
  outline: none;
  box-shadow: 0px 4px 0px 0px #db8d00;
  transition: 0.2s;
  background: #3a3a3a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-family: "Volkhov";
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.3em;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
   
   width: 90%;
  }
`;

export default AlertBox;
