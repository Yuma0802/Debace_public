//react import
import React, { useRef, useState }  from "react";
import styled from 'styled-components';

//firebase import
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../firebase/firebaseConfig";
// import { getAuth } from "firebase/auth";
// import {getFirestore, collection, query, where,getDocs, doc, setDoc, addDoc, orderBy, limit, updateDoc } from "firebase/firestore";


import DebateBoxBelt from "../Presentational/Organisms/DebateBoxBelt";
import SlidersIcon from "../Presentational/Atoms/SlidersIcon";
import SelectBox from "../Presentational/Atoms/SelectBox";
import { useNavigate } from "react-router-dom";
import Footer from "../Presentational/Organisms/Footer";

const MainPageContainer = (props) => {
  //react-router
  const navigate = useNavigate()

  //現在時刻取得
  let now = new Date();

  //firebase設定
  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);
  // const auth = getAuth();

  //rerf
  const latestRef = useRef(null)
  const popularRef = useRef(null)
  const nowRef = useRef(null)

  //state設定
  const [userT,setUserT] = useState(null)
  const [category,setCategory] = useState("トップ")
  const [selectStatus, setSelectStatus] = useState(99)

  //表示フラグ
  const [popularFlag,setPopularFlag] = useState(false)
  const [nowFlag,setNowFlag] = useState(false)

  //ディベートリスト
  const [popularList, setPopularList] = useState(null)
  const [nowList,setNowList] = useState(null)


  const sSStatusFun = (num) => {
    setSelectStatus(num)
  }

  const categoryFun = (data) => {
    setCategory(data)
  }

  const onCreateBtn = () => {
    navigate('/create')
  }

  const scrollLatest = () => {
    latestRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
  const scrollPopular = () => {
    popularRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
  const scrollNow = () => {
    nowRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
  
  

  return (

    <>
    <SMainPageWrap>
    

      <SSelectBand>
        <SelectBox categoryFun={categoryFun} selected={category}>トップ</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>政治</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>経済</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>社会問題</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>テクノロジー</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>歴史</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>学問</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>エンタメ</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>生活</SelectBox>
        <SelectBox categoryFun={categoryFun} selected={category}>その他</SelectBox>
      </SSelectBand>

      <SAgendaCreateBtnAllWrap>
        <SAgendaCreateBtnWrap>
        <SAgendaCreateBtn onClick={onCreateBtn}>議題作成</SAgendaCreateBtn>
        </SAgendaCreateBtnWrap>
        <SlidersIcon fun={sSStatusFun}/>
      </SAgendaCreateBtnAllWrap>

      <SBeltWrap>
        <STop>
          <SBeltTitle ref={latestRef}>新着</SBeltTitle>
        </STop>
        <DebateBoxBelt
          mode="latest"
          category={category}
          type={selectStatus}
          userInfo={ props.userInfo}
          scrollFun={scrollLatest}
        />
      </SBeltWrap>

      <SBeltWrap>
        <STop>
        <SBeltTitle ref={popularRef}>人気</SBeltTitle>
        </STop>
        <DebateBoxBelt 
          mode="popular"
          category={category}
          type={selectStatus}
          userInfo={props.userInfo}
          scrollFun={scrollPopular}
        />
      </SBeltWrap>

      <SBeltWrap>
        <STop>
        <SBeltTitle ref={nowRef}>議論中</SBeltTitle>
        </STop>
        <DebateBoxBelt 
          mode="latest"
          category={category}
          type={1}
          userInfo={props.userInfo}
          scrollFun={scrollNow}
        />
      </SBeltWrap>



    </SMainPageWrap>
    <Footer />
    </>
  )
};

const SMainPageWrap = styled.div`
  padding-top: 56px;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const SBeltWrap = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 80%;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const STop = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  max-width: 1300px;
`;


const SBeltTitle = styled.h2`
  width: 100%;
  margin: 0px;
  height: 29px;
  /* font-family: 'Noto Serif JP'; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  
  border-bottom: 1px solid #C1C1C1;

  color: #000000;
  @media (max-width: 480px) {
    text-align: center;
    font-size: 30px;
    padding-bottom: 50px;
    margin-bottom: 50px;
  }
`;



const SAgendaCreateBtnAllWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // 左寄せにする
  width: 100%;
  max-width: 1300px;
  padding-top: 35px;
  padding-bottom: 25px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const SAgendaCreateBtnWrap = styled.div`
  padding-left: 4%;
`;

const SAgendaCreateBtn = styled.button`
  height: 43px;
  width: 150px;
  background-color: #ffa500;
  color: white;
  font-size: 22px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  @media (max-width: 480px) {
    height: 40px;
    width: 130px;
    font-size: 18px;
    margin-left: 10px;
    line-height: 25px;
  }
`;


const SSelectBand = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  margin-bottom: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex-shrink: 0;
    width: 25%;
    max-width: 480px;

    @media screen and (min-width: 480px) {
      max-width: none;
      width: 10%;
    }
  }
`;

export default MainPageContainer;



