import React, { useEffect,useContext, memo } from "react";
import { UserContext } from "./provider/UserProvider";
import DebatePageContainer from "../Container/DebatePageContainer";
import { expToRank } from "../Helpers/RankOperation";

//firebase import
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {collection, query, where,getDocs } from "firebase/firestore";
import CreateDebateContainer from "../Container/CreateDebateContainer";

const Temp = () => {
  //userContextを呼び出す
  const {userInfo,setUserInfo} = useContext(UserContext)

  //firebase設定
  const db = firebase.firestore();
  const tsPUid = "85CJxRXPbabjcbxt4nFkyhDYXGz2";

  useEffect(() => {
    (async() => {
      try{
        //ユーザー情報取得
        const usersRef = collection(db,"users");
        const q = query(usersRef,where("primaryId","==",tsPUid))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserInfo({
            uid: doc.id,
            name: doc.data().name,
            rank: expToRank(doc.data().exp),
            joined: doc.data().joined,
            made: doc.data().made,
            profile:doc.data().profile,
            createdAt: doc.data().createdAt
          });
        })
        console.log("ユーザー取得成功")

      }catch(e){
        console.log("ユーザー取得失敗",e)
      }

    })()
      
      
  },[])

  const c = () => console.log(userInfo);


  return(
    <>
      <DebatePageContainer />
      {/* <CreateDebateContainer /> */}
    </>
  )
}


export default Temp;