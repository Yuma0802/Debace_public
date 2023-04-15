import React from "react";
import styled from "styled-components";

const CreateAccountBox = (props) => {
  return (
    <SCreateAcoountBox>
      <SCreateAcoountBoxTitle>{"会員登録"}</SCreateAcoountBoxTitle>
      <SCreateAcoountBoxSubTitle>{"Create  Account"}</SCreateAcoountBoxSubTitle>
      <SCreateAcoountBoxAcoount></SCreateAcoountBoxAcoount>
      <SCreateAcoountBoxAcoountIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          class="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
      </SCreateAcoountBoxAcoountIcon>

      <SCreateAcoountBoxEmail></SCreateAcoountBoxEmail>
      <SCreateAcoountBoxEmailIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          fill="currentColor"
          class="bi bi-envelope"
          viewBox="0 0 16 16"
        >
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
        </svg>
      </SCreateAcoountBoxEmailIcon>
      <SCreateAcoountBoxPass></SCreateAcoountBoxPass>
      <SCreateAcoountBoxPassIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-key"
          viewBox="0 0 16 16"
        >
          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </SCreateAcoountBoxPassIcon>
      <SCreateAcoountBoxLogin>{"ログインはこちらから"}</SCreateAcoountBoxLogin>

      <SCreateAcoountBoxBtn onClick={props.clickedFn}>
        {"次へ"}
      </SCreateAcoountBoxBtn>
    </SCreateAcoountBox>
  );
};

const SCreateAcoountBox = styled.div`
  box-sizing: border-box;

  position: fixed;
  width: 400px;
  height: 400px;
  left: 481px;
  top: 108px;
  text-align: center;
  margin: auto;

  background: whitesmoke;
  border-radius: 40px;
`;

const SCreateAcoountBoxTitle = styled.p`
  position: fixed;
  width: 251px;
  height: 37px;
  left: 560px;
  top: 129px;

  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 41px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
`;

const SCreateAcoountBoxSubTitle = styled.p`
  position: fixed;
  width: 251px;
  height: 37px;
  left: 560px;
  top: 170px;

  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 41px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
`;

const SCreateAcoountBoxAcoount = styled.input.attrs({
  type: "text",
  placeholder: "アカウント名",
})`
  position: fixed;
  width: 318px;
  height: 43px;
  left: 523px;
  top: 211px;
  border: none;
  outline: none;
  text-align: center;

  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
`;

const SCreateAcoountBoxAcoountIcon = styled.svg`
  position: fixed;
  margin: auto;
  left: 533px;
  top: 220px;
  width: 25px;
  height: 28px;
  object-fit: contain;

  /* background: #7b7b7b; */
`;

const SCreateAcoountBoxEmail = styled.input.attrs({
  type: "email",
  placeholder: "メールアドレス",
})`
  position: fixed;
  width: 318px;
  height: 43px;
  left: 523px;
  top: 276px;
  border: none;
  outline: none;
  text-align: center;

  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
`;

const SCreateAcoountBoxEmailIcon = styled.svg`
  position: fixed;
  margin: auto;
  left: 535px;
  top: 287px;
  width: 23px;
  height: 25px;
  object-fit: contain;

  /* background: #7b7b7b; */
`;

const SCreateAcoountBoxPass = styled.input.attrs({
  type: "password",
  placeholder: "パスワード",
})`
  position: fixed;
  width: 318px;
  height: 43px;
  left: 523px;
  top: 344px;
  border: none;
  outline: none;
  text-align: center;

  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
`;

const SCreateAcoountBoxPassIcon = styled.svg`
  position: fixed;
  margin: auto;
  left: 535px;
  top: 354px;
  /* transform: rotate(135deg); */
  width: 30px;
  height: 23px;
  object-fit: cover;
  /* background: gray; */
`;

const SCreateAcoountBoxLogin = styled.p`
  position: fixed;
  width: 141px;
  height: 24px;
  left: 705px;
  top: 395px;

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
`;

const SCreateAcoountBoxBtn = styled.button`
  position: fixed;
  width: 197px;
  height: 43px;
  left: 582px;
  top: 430px;

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

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    cursor: pointer;
  }
  &:active {
    margin-top: 4px;
    box-shadow: none;
  }
`;

export default CreateAccountBox;
