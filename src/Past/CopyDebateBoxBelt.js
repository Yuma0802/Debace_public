//React import
import React, { useEffect,useState }  from "react";
import styled from 'styled-components';
//Firebase import
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import {getFirestore,collection, query, where,getDocs, doc, setDoc, addDoc, orderBy, limit, updateDoc } from "firebase/firestore";

//Component import
import DebateBox from '../Presentational/Organisms/DebateBox';


const DebateBoxBelt = (props) => {
  //現在時刻取得
  let now = new Date();

  //firebase設定
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  //state設定
  const [category,setCategory] = useState("トップ")
  const [searchStatus,setSearchStatus] = useState("all")

  //表示フラグ
  const [showFlag,setShowFlag] = useState(false)

  //ディベートリスト




  return (
    <SBeltWrap>
      <SBeltTitle>新着</SBeltTitle>
      <SBelt>

      </SBelt>
    </SBeltWrap>
  )
};

const SBeltWrap = styled.div`
  width: 1200px;
  padding-top: 10px;
  padding-bottom: 25px;
  margin:auto;
`;



const SBeltTitle = styled.h2`
  margin: 0px;
  height: 29px;
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -0.02em;

  border-bottom: 1px solid #C1C1C1;

  color: #000000;
`;

const SBelt = styled.div`
  padding:10px 0px 10px 0px;
  display: flex;
  column-gap: 40px;
`;

export default DebateBoxBelt;