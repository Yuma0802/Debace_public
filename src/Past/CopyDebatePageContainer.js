import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import Agenda from "../Presentational/Organisms/Agenda";
import InfoBoard from "../Presentational/Organisms/InfoBoard";
import Speech from "../Presentational/Organisms/Speech";
import Loader from "../Presentational/Atoms/Loader";
import GiveOpinion from "../Presentational/Organisms/GiveOpinion";
import { expToRank } from "../Helpers/RankOperation";
import SelectPosition from "../Presentational/Atoms/SelectPosition";
//firebase import
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { collection, doc, query, where, getDoc, getDocs, addDoc, updateDoc, runTransaction, serverTimestamp } from "firebase/firestore";



const DebatePageContainer = () => {
  //firebase設定
  const db = firebase.firestore();

  //state設定
  const [contents, setContents] = useState(null);
  const [user, setUser] = useState(null);
  const [participant, setParticipant] = useState(null);

  const [giveOpinionContent, setGiveOpinionContent] = useState(null);


  //仮置き
  const thisDebateID = 'blcUhfFkmNrK0h9GJwA1';
  const myId = '85CJxRXPbabjcbxt4nFkyhDYXGz2';

  useEffect(() => {
    (async() => {
      const thisDebateRef = doc(db,"debate",thisDebateID);
      
      //コレクションの取得
      const thisDebateSnapshot = await getDoc(thisDebateRef);
        setContents({
          title: thisDebateSnapshot.data().title,
          body: thisDebateSnapshot.data().body,
          positionA: thisDebateSnapshot.data().positionA,
          positionB: thisDebateSnapshot.data().positionB,
          positionC: thisDebateSnapshot.data().positionC,
          positionD: thisDebateSnapshot.data().positionD,
          startTime:thisDebateSnapshot.data().startTime.toDate(),
          finishTime:thisDebateSnapshot.data().finishTime.toDate(),
          category:thisDebateSnapshot.data().category,
          tag1:thisDebateSnapshot.data().tag1,
          tag2:thisDebateSnapshot.data().tag2,
          tag3:thisDebateSnapshot.data().tag3,
          tag4:thisDebateSnapshot.data().tag4,
          reference:thisDebateSnapshot.data().reference,
          hostName:thisDebateSnapshot.data().hostName,
          hostRank:thisDebateSnapshot.data().hostRank,
          hostId:thisDebateSnapshot.data().hostId
        });
      
      //ユーザー情報取得
      const userRef = doc(db,"users",myId);
      const userSnapshot = await getDoc(userRef);

        setUser({
          uid: myId,
          name: userSnapshot.data().name,
          rank: expToRank(userSnapshot.data().exp) 
        });
      
      //ユーザー参加状態の確認
      const participantRef = query(collection(db, "debate",thisDebateID,"participant"), where("uid", "==", myId))
      const participantSnapshot = await getDocs(participantRef);
      participantSnapshot.forEach(e => {        
        setParticipant({
          uid : e.data().uid,
          name : e.data().name,
          rank : e.data().rank,
          position : e.data().position,
          good : e.data().good,
          convert : e.data().convert,
          convertSelf : e.data().convertSelf,
          opinion: e.data().opinion
        })
      });

      //participant内のユーザー情報を更新
      if(participant !== null){
        if(participant.uid !== user.uid){
          //error処理
        }
        if(participant.name !== user.name){
          await updateDoc(doc(db,"debate",thisDebateID,"participant",user.uid),{
            name:user.name
          })
        }
        if(participant.rank !== user.rank){
          await updateDoc(doc(db,"debate",thisDebateID,"participant",user.uid),{
            rank:user.rank
          })
        }
      }





      })()
    
  },[])

    //初参加処理
    const joinDebate = async (val) => {

      const participantCollectionRef = collection(db,"debate",thisDebateID,"participant");

      setParticipant({
        name: user.name,
        rank: user.rank,
        position: val,
        good: 0,
        convert:0,
      });

      await addDoc(participantCollectionRef,{
        uid: user.uid,
        name: user.name,
        rank: user.rank,
        position: val,
        good: 0,
        convert:0,
        createdAt: serverTimestamp()
      })
      
      console.log("参加成功")
    }
    //コメント追加処理

    const addComment = async (obj) => {
      try {
        const thisDebateRef = doc(db,"debate",thisDebateID);
        await runTransaction(db, async (transaction) => {
          const num = await transaction.get(thisDebateRef);
          if (!num.exists()) {
            throw "Document does not exist!";
          }
      
          const opinionId = num.data().opinion_sum + 1;
          transaction.addDoc()
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }


    }

  

  return(
    <>
      {
        contents ? (
          <SDPWrap>
            <InfoBoard />
            <SDebate >
              <Agenda agendaContents={contents}/>
              <Speech />
              <Speech />
              <Speech />
              <Speech />
              <Speech />
              {/* <SelectPosition agendaContents={contents} joinFun={joinDebate}/> */}
              {/* <GiveOpinion /> */}
            </SDebate>
          </SDPWrap>)
          : <Loader />

      }
   
    </>
  );
};

const SDPWrap = styled.div`
  display: flex;
`;

const SDebate = styled.div`
  width: 950px;
`;

export default DebatePageContainer;