import React, { useState } from "react";
import styled from 'styled-components';
import WillSmith from '../../assets/images/social_problem.jpg';
import { getNowDate, getNowTime } from "../../Helpers/DateOperation";
import { rankToColor } from "../../Helpers/RankOperation";

//firebase
import { initializeApp } from "firebase/app";
import { getFirestore,doc,writeBatch,arrayRemove} from "firebase/firestore";
import { firebaseConfig } from "../../firebase/firebaseConfig";
import { useNavigate} from 'react-router-dom';
import RecCatImg from "../Atoms/RecCatImg";



const DebateRectangle = (props) => {
  //react-router
  const navigate = useNavigate()

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  //スライダーメニュー
  const [showOptions, setShowOptions] = useState(false);


  //flag
  const [removeFlag,setRemoveFlag] = useState(false)

  const removeFavorite = () => {
    try{

      const batch = writeBatch(db)
      
      batch.delete(doc(db,"users",props.userInfo.uid,"favorite",props.id))
      batch.update(doc(db,"users",props.userInfo.uid,"info",props.userInfo.infoId),{
        favorite:arrayRemove(props.contents.did)
      })
      
      batch.commit()

      setRemoveFlag(true)

      props.reloadFun()
      
    }catch(e){
      alert('エラーが発生しました。やり直してください。')
      console.log(e)
    }
  }

  const toDid = () => {
    navigate(`/debate?did=${props.contents.did}&page=1`)
  }

  const toUid = () => {
    navigate(`/mypage?uid=${props.contents.hostId}`)
  }



  return (
    <SSavepostWrap>
      {
        removeFlag ? (
          <>
          <p>議論がお気に入りから削除されました</p>
          </>
        ):(
          <>
            <SSavePostTop>

              <SSavedPostBoxTime>
                {getNowDate(props.contents.startTime.toDate(),'ymd')}
                &nbsp;
                {getNowTime(props.contents.startTime.toDate(),'hm')}
                &nbsp;
                ～
                &nbsp;
                {getNowDate(props.contents.finishTime.toDate(),'ymd')}
                &nbsp;
                {getNowTime(props.contents.finishTime.toDate(),'hm')}
              
              </SSavedPostBoxTime>
              {props.mode === "favorite" &&
                  <SSavedPostBoxMenuIconWrap>
                    <SSlidersIconWrap>
                      <SSlidersIcon onClick={() => setShowOptions(!showOptions)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        {showOptions && (
                            <SOptionsListWrap>
                                <SOptionsList>
                                    <SOption onClick={removeFavorite}>
                                      <span>[保存した投稿]から削除</span>
                                    </SOption>
                                </SOptionsList>
                            </SOptionsListWrap>
                        )}
                      </SSlidersIcon>
                    </SSlidersIconWrap>
                  </SSavedPostBoxMenuIconWrap>
              }
            </SSavePostTop>

            <SSpeechContents onClick={toDid}>
              <SImageWrap>
                <RecCatImg cat={props.contents.category} />
              </SImageWrap>
              <SSavePostBoxText>{props.contents.title}</SSavePostBoxText>
            </SSpeechContents>

            <SSpeechBottom onClick={toDid}>
              <SSavedPostBoxContributor>投稿者</SSavedPostBoxContributor>
              <SSavedPostBoxIconWrap>
                <SSavedPostBoxIcon rank={props.contents.hostRank}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </SSavedPostBoxIcon>
              </SSavedPostBoxIconWrap>
              <SavedPostBoxName>{props.contents.hostName}</SavedPostBoxName>
            </SSpeechBottom>
          </>
        )
      }


    </SSavepostWrap>
  );
};



const SSavepostWrap = styled.div`
max-width: 480px;
  width: 450px;
  height: 85px;
  border: 1px solid #B5B5B5;
  @media (max-width: 950px) {
    height: 130px;
    width: 300px;
  }

`;


const SSavePostTop = styled.div`
    display: flex;
    height: 20px;
    padding-top: 3px;
    @media (max-width: 950px) {
   padding-top: 7px;
  }
  `;
const SSavedPostBoxTime = styled.p`
  
  display: flex;
  font-size: 13px;
  padding-left: 150px;
  white-space: nowrap;
  @media (max-width: 950px) {
    font-size: 13px;
    padding-left: 20px;
  }
  `;

const SSavedPostBoxMenuIconWrap = styled.div`
   display: flex;
   padding-left: 35px;
   padding-top: 3px;
   @media (max-width: 950px) {
    padding-left: 20px;
    padding-top: 5px;
  }

`;

const SSpeechContents = styled.div`
 display: flex;
  height: 35px;
  `;

const SImageWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 7px;
  padding-left: 9px;
  @media (max-width: 950px) {
    padding-top: 45px;
  }

`;

const SImage = styled.img.attrs({
  src: `${WillSmith}`,
  alt: 'サンプル画像'
})`
  width: 116px;
  height: 63px;
  @media (max-width: 950px) {
    width: 100px;
    height: 55px;
  }

`;

const SSavePostBoxText = styled.p`
   font-size: 13px;
   padding-top: 6px;
   padding-left: 14px;
   padding-right: 12px;
   line-height: 15px;
   @media (max-width: 950px) {
    padding-left: 7px;
    padding-right: 2px;
    padding-top: 16px;
  }

`;

const SSpeechBottom = styled.div`
 display: flex;
 column-gap: 5px;
 padding-left: 0px;
 @media (max-width: 950px) {
   padding-top: 45px;
  }

 `;

const SSavedPostBoxContributor = styled.p`
    padding-left: 140px;
    padding-top: 6px;
    font-size: 10px;
    @media (max-width: 950px) {
    padding-left: 8px;
    font-size: 8px;
    display: none;
  }

     `;

const SSavedPostBoxIconWrap = styled.div`
    padding-left: 20px;
    padding-top: 3px;
    @media (max-width: 950px) {
   padding-left: 10px;
  }

`;

const SSavedPostBoxIcon = styled.svg`

  display: flex;
  height: 25px;
  width: 25px;
  color: ${(props) => (rankToColor(props.rank))};
    &:hover {
      cursor: pointer;
  }
`;

const SavedPostBoxName = styled.p`
   font-size: 13px;
   padding-top: 6px;
   @media (max-width: 950px) {
    
  }

  `;


//スライダーメニュー
const SSlidersIconWrap = styled.div`
     display: flex;
     align-items: center;
`;

const SSlidersIcon = styled.div`
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: #FFA500;
`;

const SOptionsListWrap = styled.div`
    position: relative;
    @media (max-width: 480px) {
    right: 135px;
    top: 20px;
  }
`;

const SOptionsList = styled.ul`
    position: absolute;
    display: flex;
    left: 0;
    z-index: 1;
    flex-direction: row; // ← 追加
    align-items: center; // ← 追加
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 0px;
    border-radius: 5px;
    list-style: none;
    color: black;
    @media (max-width: 480px) {
    display: block;
    text-align: left;
  }
`;


const SOption = styled.li`
    display: inline-block; // ← 追加
    cursor: pointer;
    padding: 5px 10px; // 余白を調整
    font-size: 13px;
    white-space: nowrap; // 一行に収めるために必要
    border-radius: 5px;
    &:hover {
        background-color: #FFA500;
        color: #f5f5f5;
    }
`;


export default DebateRectangle;