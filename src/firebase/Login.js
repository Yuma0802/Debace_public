import { useState } from 'react';
import styled from 'styled-components';
import { signinWithEmailAndPassword} from './authLogin';
import Footer from '../Presentational/Organisms/Footer';
import { Link, useNavigate } from 'react-router-dom';

const SCreateAcoountBox = styled.div`
  box-sizing: border-box;
  padding-top: 30px;
  position: fixed;
  width: 400px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin: auto;
  background: whitesmoke;
  border-radius: 40px;

 

  @media (max-width: 480px) {
    width: 300px;
    height: 600px;
    border-radius: 20px;
    background: none;
    top: 63%;
  }

  @media (min-height: 800px) {
   top: 50%;

  }
`;


const SLoginBoxTitle = styled.p`
  width: 100%;
  height: 37px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 37px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
  font-weight: bold;

  @media (max-width: 480px) {
    font-family: 'Courier New', Courier, monospace;
    font-size: 30px;
    line-height: 40px;
    padding-bottom: 70px;
    width: 60%;
    position: relative;
    left: 50%;
    top: 5%;
    transform: translate(-50%, -50%);
  }

  /* @media (min-height: 800px) {
   padding-bottom: 120px;

  } */
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
    border: none;
  outline: none;
  text-align: left;
  padding-left: 10px;
  width: 318px;
  height: 43px;
  margin-top: 25px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  @media (max-width: 480px) {
    margin-top: 15px;
    width: 270px;
    height: 35px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const SLoginBoxNew = styled.p`
  width: 400px;
  height: 24px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  padding-left: 200px;
  padding-top: 20px;
  color: #44bcff;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
   width: 300px;
   height: 35px;
   font-size: 15px;
   padding-left: 98px;
   padding-top: 20px;
  }
`;

const SLoginBoxReset = styled.p`


  width: 400px;
  height: 24px;

  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  padding-left: 187px;
  padding-top: 10px;
  color: #44bcff;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
   width: 300px;
   height: 0px;
   font-size: 15px;
   padding-left: 110px;
   padding-top: 0px;
  }
`;

const SLoginBoxBtnWrap = styled.div`
     padding-top: 10px;
     @media (max-width: 480px) {
   padding-top: 80px;
   
  }
`;

const SLoginBoxBtn = styled.button`
   width: 197px;
  height: 43px;
 
  
  border: none;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  box-shadow: 0px 4px 0px 0px #db8d00;
  transition: 0.2s;

  background: #3a3a3a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-family: "Volkhov";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: -0.02em;

  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
   
   
  }
`;



const Login = () => {
  const navigate = useNavigate()

  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignin = async (event) => {
    try{
      event.preventDefault();
      const user = await signinWithEmailAndPassword(signinEmail, signinPassword);
      console.log(user)
      if(user){
        navigate('/navi?parm=login')
      }else{
        navigate('/navi?parm=Flogin')
      }
    }catch(e){
      alert('エラーが発生しました。やり直してください。')
    }
    
  };

  const SFoot = styled.footer`
  display: flex;
  background-color: aqua;
  position: fixed;
  bottom: 0;
  width: 100%;

`;


  const toRegister = () => {
    navigate('/register/')
  }

  
  
  return (
  <>
    <SCreateAcoountBox>

      <SLoginBoxTitle>{"ログイン  Login"}</SLoginBoxTitle>
        <Form onSubmit={handleSignin}>
          <Input
            type="text"
            placeholder="メールアドレス"
            value={signinEmail}
            onChange={(event) => setSigninEmail(event.target.value)}
            />
          <Input
            type="password"
            placeholder="パスワード"
            value={signinPassword}
            onChange={(event) => setSigninPassword(event.target.value)}
            />
            <SLoginBoxNew onClick={toRegister}>
              {"アカウントを作成する"}
            </SLoginBoxNew>
            {/* <SLoginBoxReset>{"パスワードを忘れた場合"}</SLoginBoxReset> */}
            <SLoginBoxBtnWrap>
              <SLoginBoxBtn type="submit">ログイン</SLoginBoxBtn>
            </SLoginBoxBtnWrap>
        </Form>
    
      </SCreateAcoountBox>
      <SFoot>

      <Footer />
    </SFoot>
    </>
  );
};

export default Login;


