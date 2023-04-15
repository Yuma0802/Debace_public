import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from "styled-components";
import loginBack from "../assets/images/loginBack.svg";
import CommonBtn from "../Presentational/Atoms/CommonBtn";
import Header from "../Presentational/Organisms/Header";

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

const CreateAccount = () => {
    
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
     
   

    const getUserName = (event) => {
        setUserName(
            event.target.value
        );
    }
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

    const register = async () => {
        //新規登録
        let firebaseFlag = true;

        await firebase.auth()
        .createUserWithEmailAndPassword(email, password) //新規登録
        .then(data => {
            data.user.sendEmailVerification() //新規登録したメアド宛にメールが送られる
            console.log('新規登録完了');
        })
        .catch((error) => {
            //エラー
            switch (error.code) {
            case 'auth/invalid-email':
                alert('メールアドレスの形式が違います。');
                firebaseFlag = false;
                break
            case 'auth/email-already-in-use':
                alert('このメールアドレスはすでに使われています。')
                firebaseFlag = false;
                break
            case 'auth/weak-password':
                alert('パスワードは6文字以上で入力してください。')
                firebaseFlag = false;
                break
            default:
                alert('エラーが起きました。しばらくしてから再度お試しください。')
                firebaseFlag = false;
                break
            }
        });

        if(firebaseFlag) {
            let uid;

            await firebase.auth().currentUser.updateProfile({
                displayName: userName
            }).then(() => {
                console.log('displayName設定完了');
            }).catch(error => console.log(error));

            await firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    uid = user.uid;
                    console.log('uid取得');
                } else {
                    alert('error');
                    return;
                }
            });

            await firebase.firestore().collection('user').add({
                name: userName,
                uid: uid
            }).then(() => {
                console.log('送信完了');
            }).catch(error => console.log(error));
    
            alert('アカウントを作成しました');
        }
    }

   
        return(
            <Box>
                <Header />
                <Card>
                    <IconBox>
                        <Img src={loginBack} />
                    </IconBox>
                    <InputText type="text" placeholder="ユーザー名" onChange={getUserName} />
                    <InputText type="text" placeholder="メールアドレス" onChange={getEmail} />
                    <InputText type="text" placeholder="パスワード" onChange={getPassword} />
                    <Mtb />
                    <CommonBtn text="登録" clickedFn={register} />
                    <A href="#">ログイン</A>
                </Card>
            </Box>
        );
    
}
export default CreateAccount;