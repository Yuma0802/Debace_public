import React, { useEffect,useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";
import { expToRank } from "../Helpers/RankOperation";

//firebase import
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import {getFirestore,collection, query, where,getDocs, doc, setDoc, addDoc } from "firebase/firestore";

const UserControl = () => {
  //userContextを呼び出す
  const {userInfo,setUserInfo} = useContext(UserContext)

  const [firstFlag, setFirstFlag] = useState(false)

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();



  useEffect(() => { (async() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user.uid); // ユーザーIDをコンソールに出力
        //ユーザー情報取得
        const usersRef = collection(db,"users");
        const q = query(usersRef,where("primaryId","==",user.uid))

        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
          //初回会員登録処理
          const uid = await doc(usersRef).id()




        }else{
          querySnapshot.forEach((doc) => {
            setUserInfo({
              uid: doc.id,
              name: doc.data().name,
              rank: expToRank(doc.data().exp),
              joined: doc.data().joined,
              made: doc.data().made,
              profile:doc.data().profile,
              createdAt: doc.data().createdAt
            })
          })

        }
        

      } else {
        console.log('ユーザーはログインしていません');

      }
    });
    return unsubscribe;
  })() }, []);

  const onConfirm = () => {
    const user = auth.currentUser;
    console.log(user.uid)
  }



  return(
    <>
      <button onClick={onConfirm}>確認</button>
    </>
  )
}


export default UserControl;