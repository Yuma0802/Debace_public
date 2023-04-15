import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from "styled-components";
import Header from "../Presentational/Organisms/Header";
import loginBack from "../assets/images/loginBack.svg";
import CommonBtn from "../Presentational/Atoms/CommonBtn";

const Box = styled.div`
    
`;
const Card = styled.div`
    width: 50%;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
    text-align: center;
`;
const IconBox = styled.div`
    position: relative;
    margin: 0 auto 40px;
    width: 130px;
    height: 130px;
    border: solid 1px #ccc;
    border-radius: 50%;
    text-align: center;
`;
const Img = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 74px;
`;
const InputText = styled.input`
    margin: 20px auto 0;
    width: 60%;
    display: block;
    border: none;
    border-bottom: solid 1px #ccc;
    font-size: 14px;
    outline: none;
`;
const Mtb = styled.div`
    margin: 30px 0;
`;
const A = styled.a`
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 14px;
    color: #000000;
`;

const LoginPage = () => {
    
    const [email,setEmail] = useState(null);

    const [password, setPassword] = useState(null);

       
    

    const getEmail = (event) => {
        setEmail(
            event.target.value
        );
    }
    const getPassword = (event) => {
        setPassword(
            event.target.value
        );
    }

    const login = async () => {
        //ログイン
        await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location = '/';
        })
        .catch(error => {
            console.log(error);
            alert('ログインできませんでした');
        });
    }

    
        return(
            <Box>
                <Header />
                <Card>
                    <IconBox>
                        <Img src={loginBack} />
                    </IconBox>
                    <InputText type="text" placeholder="メールアドレス" onChange={getEmail} />
                    <InputText type="text" placeholder="パスワード" onChange={getPassword} />
                    <Mtb />
                    <CommonBtn text="ログイン" clickedFn={login} />
                    <A href="#">アカウントを新規作成</A>
                </Card>
            </Box>
        );
    
}
export default LoginPage;