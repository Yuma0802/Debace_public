import React, { useState } from "react";
import styled from 'styled-components';
import bookMarkLogo from '../../assets/images/bookmark.svg'
import { baseColor } from "../../assets/styles/BaseColor";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/firebaseConfig";
import { getFirestore, collection, doc, runTransaction, arrayUnion, serverTimestamp } from "firebase/firestore";

const BookMark = (props) => {
  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const [display, setDisplay] = useState(true)

  const onBtn = async () => {
    if (props.userInfo.uid !== "NL") {



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
          } else {

            setDisplay(false)

          }

        });

      } catch (e) {
        console.log("Transaction failed: ", e);
        alert('エラーが発生しました。やり直してください。再度エラーが発生する場合はもう一度読み込んでください。')
      }

    }
  }

  return (
    <>
      {
        props.userInfo.favorite.includes(props.contents.did) ? (
          <SBookMarkLogoFill>
         
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z" />
              </svg>
           
          </SBookMarkLogoFill>
        ) : (
          display ? (
            <SBookMarkLogo onClick={onBtn}>
              
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                  <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                </svg>
              
              
            </SBookMarkLogo>
          ) : (
            <SBookMarkLogoFill>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z" />
              </svg>
            </SBookMarkLogoFill>
          )
        )
      }
    </>
  )
};

const SBookMarkLogo = styled.svg`
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
  
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
   
  }
`;


const SBookMarkLogoFill = styled.svg`
  width: 20px;
  height: 20px;
  color: ${baseColor};
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 480px) {
   
  }
`;


export default BookMark;