import React, { useEffect } from "react";
import styled from 'styled-components';

//firebase import
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import {getFirestore,collection, query, where,getDocs, doc, updateDoc, addDoc, orderBy, limit, writeBatch, increment, runTransaction, Transaction } from "firebase/firestore";

const Test3 = () => {
  //現在時刻取得
  let now = new Date();

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();

  // useEffect(() => {(async() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     console.log(user.uid); // ユーザーIDをコンソールに出力
  //     //ユーザー情報取得
  //     const usersRef = collection(db,"users");
  //     const q = query(usersRef,where("puid","==",user.uid))

  //     const querySnapshot = await getDocs(q);
  //     console.log(querySnapshot)

  //     let joinList = ""
  //     querySnapshot.forEach((doc) => {
  //       joinList = doc.data().join
  //     })

  //     //===振り込み==============================
  //     const filteredObjects = joinList
  //     .filter(obj => obj.endTime.toDate() < now); // 現在時刻を超えるオブジェクトのフィルタリング
  //     console.log(filteredObjects);
      
  //     await runTransaction(db, async(transaction) => {
  //       await filteredObjects.forEach(async(e) => {
  //         const participantRef = doc(db,"debate", e.did,"participant",e.pid)
  //         const participantSnapshot = await transaction.get(participantRef)

  //         let plusExp = participantSnapshot.data().good
  //         if(plusExp > 100){
  //           plusExp = 100
  //         }

  //         const mineRef = doc(db,"users",UID)
  //         transaction.update(mineRef,{
  //           exp:increment(plusExp),
  //           join:arrayRemove(e)
  //         })

  //         setUserInfo({
  //           ...userInfo,
  //           exp: nowExp + plusExp 
  //         })
          
  //         console.log("振込完了")
  //         console.log(plusExp + nowExp)
  //       })

  //     })
      




  //   });
  //   return unsubscribe; // アンマウント時に購読解除する

  // })()},[])


  return (
  <>

  </>
  )
};

export default Test3;