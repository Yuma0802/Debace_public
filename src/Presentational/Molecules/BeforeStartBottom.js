import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import CommonBtn from "../Atoms/CommonBtn";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/firebaseConfig";
import {getFirestore,collection, doc, runTransaction, arrayUnion, serverTimestamp } from "firebase/firestore";

const BeforeStartBottom = (props) => {
  //react-router
  const navigate = useNavigate();

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const [display,setDisplay] = useState(true)

  const onBtn = async () => {
    if(props.userInfo.uid !== "NL"){

      try {
        const infoRef = doc(db, "users", props.userInfo.uid,'info',props.userInfo.infoId)
        await runTransaction(db, async (transaction) => {
          const nowContents = await transaction.get(infoRef);
          if (!nowContents.exists()) {
            throw "Document does not exist!";
          }
          if (nowContents.data().favorite.includes(props.contents.did) === false) {

            transaction.update(infoRef, { favorite: arrayUnion(props.contents.did) })

            const userFavRef = collection(db, "users", props.userInfo.uid, "favorite")
            const userFavId = doc(userFavRef).id
            transaction.set(doc(userFavRef, userFavId), {
              fid: userFavId,
              did: props.contents.did,
              title: props.contents.title,
              body: props.contents.body,
              positionA: props.contents.positionA,
              positionB: props.contents.positionB,
              positionC: props.contents.positionC,
              positionD: props.contents.positionD,
              startTime: props.contents.startTime,
              finishTime: props.contents.finishTime,
              endTime: props.contents.endTime,
              category: props.contents.category,
              tag1: props.contents.tag1,
              tag2: props.contents.tag2,
              tag3: props.contents.tag3,
              tag4: props.contents.tag4,
              reference: props.contents.reference,
              hostName: props.contents.hostName,
              hostRank: props.contents.hostRank,
              hostId: props.contents.hostId,
              createdAt: props.contents.createdAt,
              favoriteAt: serverTimestamp()
            })


            console.log("Transaction successfully committed!");
            setDisplay(false)

          }else{
            console.log("既にお気に入り登録されています")
            setDisplay(false)
          }

        });

      } catch (e) {
        console.log("Transaction failed: ", e);
        alert('エラーが発生しました。やり直してください。再度エラーが発生する場合はもう一度読み込んでください。')
      }

    }
  }

  const toHome = () => {
    navigate('/')
  }

  


  return (
    <>
    {
      props.userInfo.favorite.includes(props.contents.did) ? (
        <SPostJoinFirstWrap onClick={toHome}>
        <SJoinFirstBtn>
          <CommonBtn text="他の議論を探す"/>
        </SJoinFirstBtn>
      </SPostJoinFirstWrap>
      ):(
        display ? (       
          <SPostJoinFirstWrap onClick={onBtn}>
          <SJoinFirstBtn>
            <CommonBtn text="お気に入り登録"/>
          </SJoinFirstBtn>
        </SPostJoinFirstWrap>
        ):(
          <SPostJoinFirstWrap onClick={toHome}>
          <SJoinFirstBtn>
            <CommonBtn text="他の議論を探す"/>
          </SJoinFirstBtn>
        </SPostJoinFirstWrap>
        )
      )
    }
    </>
  )
};

const SPostJoinFirstWrap = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 60px;
  border: 0.2px solid #f5f5f5;
  border-radius: 10px 10px 10px 10px;
  background: #e6e6e6;
  justify-content: center;

`

const SJoinFirstBtn = styled.div`
  display: flex;
  justify-content: center;
  
`;

export default BeforeStartBottom;