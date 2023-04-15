import { useState } from 'react';
import styled from 'styled-components';
import { signupWithEmailAndPassword } from './auth';
import Header from '../Presentational/Organisms/Header';
import Footer from '../Presentational/Organisms/Footer';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {

  const navigate = useNavigate()

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const toLogin = () => {
    navigate('/login/')
  }
  const toTerms = () => {
    navigate('/terms/')
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    if (signupPassword !== confirmPassword) {
      alert('パスワードが一致していません');
      return;
    }
    if (!checked) {
      alert('利用規約に同意してください');
      return;
    }
    const user = await signupWithEmailAndPassword(signupEmail, signupPassword);
    console.log('登録User情報 : ', user);
  };

  // handleCheckbox関数を変更
  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <SCreateAcoountBox>
        <SCreateAcoountBoxTitleWrap>

        <SCreateAcoountBoxTitle>{"会員登録"}</SCreateAcoountBoxTitle>
        <SCreateAcoountBoxSubTitle>{"Create Account"}</SCreateAcoountBoxSubTitle>
        </SCreateAcoountBoxTitleWrap>
        <Form onSubmit={handleSignup}>
          <CreateAccountForm>
            <Input
              type="email"
              placeholder="メールアドレス"
              value={signupEmail}
              onChange={(event) => setSignupEmail(event.target.value)}
            />
          </CreateAccountForm>
          <CreateAccountForm>
            <Input
              type="password"
              placeholder="パスワード"
              value={signupPassword}
              onChange={(event) => setSignupPassword(event.target.value)}
            />
          </CreateAccountForm>
          <CreateAccountForm>
            <Input
              type="password"
              placeholder="パスワード確認"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </CreateAccountForm>
          <SCreateAcoountBoxLogin onClick={toLogin} >{"ログインはこちらから"}</SCreateAcoountBoxLogin>
          <CreateAccountForm>
            <SCreateAcoountBoxTerms>
              <label htmlFor="terms-checkbox">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckbox}
                />
                <SLabel onClick={toTerms}>
                利用規約に同意する
                </SLabel>
              </label>
            </SCreateAcoountBoxTerms>
          </CreateAccountForm>
          <SCreateAcoountBoxBtnWrap>
            <SCreateAcoountBoxBtn type="submit">登録</SCreateAcoountBoxBtn>
          </SCreateAcoountBoxBtnWrap>
        </Form>
      </SCreateAcoountBox>
      <SFoot>

        <Footer />
      </SFoot>
    </>
  );
};

const SCreateAcoountBox = styled.div`
  box-sizing: border-box;

  position: fixed;
  width: 80%;
  max-width: 400px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: whitesmoke;
  border-radius: 40px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 中央寄せ
  @media (max-width: 480px) {
    
    display: flex;
    width: 300px;
    top: 50%;
    border-radius: 20px;
    background: none;
    
  }
`;

const SCreateAcoountBoxTitleWrap = styled.div`
@media (min-height: 800px) {
    padding-bottom: 50px;
  }
`;

const SCreateAcoountBoxTitle = styled.p`
  width: 400px;
  height: 37px;
  padding-top: 15px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
  @media (max-width: 480px) {
    font-size: 30px;
    font-weight: bold;
    padding-top: 30px;
  }
`;

const SCreateAcoountBoxSubTitle = styled.p`
  width: 400px;
  height: 37px;
  padding-top: 10px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
  @media (max-width: 480px) {
    font-size: 20px;
    line-height: 0;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    padding-top: 25px;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  @media (max-width: 480px) {
   padding: 0;
  }
`;

const CreateAccountForm = styled.div`
   padding-bottom: 10px;
   @media (max-width: 480px) {
   padding-bottom: 0;
  }
`;

const Input = styled.input`
  width: 318px;
  height: 43px;
  padding-left: 10px;
  border: none;
  outline: none;
  text-align: left;

  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  @media (max-width: 480px) {
    margin-top: 10px;
    width: 270px;
    height: 35px;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const SCreateAcoountBoxLogin = styled.p`

 width: 340px;
  height: 24px;
  padding-left: 200px;
  
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  &:hover {
    cursor: pointer;
  }
  color: #44bcff;
  @media (max-width: 480px) {
   width: 300px;
   height: 0px;
   font-size: 15px;
   padding-left: 120px;
   padding-top: 15px;
  }
`;

const SCreateAcoountBoxTerms = styled.p`

  width: 400px;
  height: 24px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  text-align: center;
  text-decoration-line: underline;
  

  &:hover {
    cursor: pointer;
  }

  color: #44bcff;
  input[type="checkbox"] {
    margin-right: 7px; 
  }
  @media (max-width: 480px) {
   width: 300px;
   height: 0px;
   font-size: 15px;
   padding-top: 50px;
   padding-bottom: 15px;
  }
`;

const SLabel = styled.label`

`;

const SCreateAcoountBoxBtnWrap = styled.div`
  position: relative;
  top: -25px;
  @media (max-width: 480px) {
   
   padding-top: 30px;
  }
`;

const SCreateAcoountBoxBtn = styled.button`
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
  padding-top: 7px;

  color: #ffffff;


  &:hover {
    cursor: pointer;
  }
`;

const SFoot = styled.footer`
  display: flex;
  background-color: aqua;
  position: fixed;
  bottom: 0;
  width: 100%;

`;



export default CreateAccount;