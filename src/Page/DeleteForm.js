import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Footer from "../Presentational/Organisms/Footer";
import firebase from 'firebase/compat/app';
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, query, where, getDocs,writeBatch} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";

const DeleteForm = () => {

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app); 

  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const confirmResult = window.confirm("本当に退会しますか？");

    const PID = await firebase.auth().currentUser.uid

    try{

      const usersRef = collection(db,"users");
      const q = query(usersRef,where("puid","==",PID))

      const querySnapshot = await getDocs(q);

      let ids = {}
      querySnapshot.forEach((doc) => {
        ids = {
          uid:doc.data().uid,
          infoId:doc.data().infoId
        }
      })

      const batch = writeBatch(db);

      batch.delete(doc(db,'users', ids.uid))
      batch.delete(doc(db,'users',ids.uid,'info',ids.infoId))

      await batch.commit()

      if (confirmResult) {
        firebase.auth().currentUser.delete()
          .then(() => {

            alert("退会が完了しました");
            setUsername("");
            setReason("");
          })
          .catch((error) => {
            console.log(error)
            alert(`エラーが発生しました。再度ログインをしてお試しください。`);
          });
      }

    }catch(e){
      console.log(e)
      alert(`エラーが発生しました。再度ログインをしてお試しください。`);
    }
  };

  const con = () => {
    console.log(firebase.auth().currentUser.uid)
  }

  
  return(
    <>
      <Form onSubmit={handleFormSubmit}>
      <Title>退会手続きフォーム</Title>
      <SubTitle>※送信するとデータが削除されます。</SubTitle>
        <Label>
          <Reason>

          アカウント名
          </Reason>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Label>
        <Label>
          <Reason>
          退会理由
          </Reason>
          <TextArea value={reason} onChange={(e) => setReason(e.target.value)} />
        </Label>
        <Button type="submit">退会する</Button>
      </Form>
      <Footer />
    </>
  );
};
  
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  height: 950px;
`;
  
const Title = styled.h1`

`;
const SubTitle = styled.p`
color: red;
font-size: bold;
padding-top: 10px;
`;

const Label = styled.label`


`;

const Reason = styled.div `
  padding-top: 50px;
`;
  
const Input = styled.input`
  height: 30px;
  width: 400px;
  &:hover {
    border: 2px solid orange;
  }
    &:focus {
    outline: none;
    border: 2px solid orange;
  }
  @media (max-width: 480px) {
    width: 300px;
  }
`;
  
const TextArea = styled.textarea`
  height: 150px;
  width: 400px;
  padding: 2px;
  &:hover {
    border: 2px solid orange;
  }
    &:focus {
    outline: none;
    border: 2px solid orange;
  }
  @media (max-width: 480px) {
    width: 300px;
  }
`;
  
const Button = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: bold;
  @media (max-width: 480px) {
    margin-top: 50px;
  }
`;

export default DeleteForm;
