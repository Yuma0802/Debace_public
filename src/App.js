//react import
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';


//Helper
import { expToRank } from "./Helpers/RankOperation";


//firebase import
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import {getFirestore,collection, query, where,getDocs, getDoc, doc, updateDoc, addDoc, orderBy, limit, writeBatch, increment, runTransaction, arrayRemove, serverTimestamp } from "firebase/firestore";


//component import
//root
import MainPageContainer from './Container/MainPageContainer';
import Header from './Presentational/Organisms/Header';
//account
import Login from './firebase/Login';
import CreateAccount from './firebase/CreateAccount';
//page
import FirstPage from './Page/FirstPage';
import CreateDebatePage from './Page/CreateDebatePage';
import ContactForm from "./Page/ContactForm";
import FavoriteDebatePage from "./Page/FavoriteDebatePage";
//container
import DebatePageContainer from "./Container/DebatePageContainer";
import MyPage from './Container/MyPage';
import AccountEdit from "./Container/AccountEdit";
import Loader from "./Presentational/Atoms/Loader";
import AlertBox from "./Presentational/Organisms/AlertBox";
import MadeDebatePage from "./Page/MadeDebatePage";
import JoinDebatePage from "./Page/JoinDebatePage";
import E404 from "./Page/E404";
import TermsOfService from "./Page/TermsOfService";
import PrivacyPolicy from "./Page/PrivacyPolicy";
import DeleteForm from "./Page/DeleteForm";



function App() {

  //現在時刻取得
  let now = new Date();

  //react-router
  const navigate = useNavigate();

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();

  //state設定
  const [userInfo,setUserInfo] = useState(null)
  const [enterFlag,setEnterFlag] = useState(false)

  useEffect(() => { 
    setEnterFlag(true)
  },[])

  useEffect(() => { (async() => {
    if(enterFlag === true){

      //==============================================================================
      //=====議論状態制御処理=======================================================

      try{
        //===議論前 => 議論中==================================================
        const shouldNowQuery = query(collection(db,'debate'),where('status', '==', 0),where('startTime','<=',now))
        const shouldNowSnapshot = await getDocs(shouldNowQuery)
        if(!shouldNowSnapshot.empty){
          shouldNowSnapshot.forEach( async (e) => {
            await updateDoc(doc(db,'debate',e.id),{
              status:1
            })

            console.log("議論前 => 議論中 更新")
          })
        }

        //===議論中 => 議論後==================================================
        const shouldAfterQuery = query(collection(db,'debate'),where('status','in', [0,1]),where('finishTime','<=',now))
        const shouldAfterSnapshot = await getDocs(shouldAfterQuery)
        if(!shouldAfterSnapshot.empty){
          shouldAfterSnapshot.forEach( async (e) => {
            await updateDoc(doc(db,'debate',e.id),{
              status:2
            })

            console.log("議論中 => 議論後 更新")
          })
        }


        //===議論後 => 議論完了==================================================
        const shouldEndQuery = query(collection(db,'debate'),where('status','in', [0,1,2]),where('endTime','<=',now))
        const shouldEndSnapshot = await getDocs(shouldEndQuery)
        if(!shouldEndSnapshot.empty){
          shouldEndSnapshot.forEach( async (e) => {

            const debateID = e.id
            //===集計処理=================================================================
            let preMvp = ""
            const mvpPreList = []
            const mvpQuery = query(collection(db, "debate",debateID,"participant"),orderBy("vote","desc"),limit(1))

            const mvpSnapshot = await getDocs(mvpQuery)

            if(!mvpSnapshot.empty){
              mvpSnapshot.forEach((e)=> {
                preMvp = e.data()
              })


              if(preMvp.vote > 0){
                const mvpManyQuery = query(collection(db, "debate",debateID,"participant"),where("vote","==",preMvp.vote))
                const mvpManySnapshot = await getDocs(mvpManyQuery)
    
                if(! mvpManySnapshot.empty){
                  //mvpList作成
                  const mvpList = []
                  mvpManySnapshot.forEach((e)=> {
                    mvpList.push(e.data())
                  })
    
                  const batch = writeBatch(db);
    
                  batch.update(doc(db,'debate',debateID),{
                    status:3,
                    mvpList:mvpList
                  })
                
                  if(e.data().participant_sum < 10){
                    mvpList.forEach((e) => {
                      batch.update(doc(db,"debate",debateID,"participant",e.pid),{
                        mvpPoint:10
                      })
                    })
                  }else if(e.data().participant_sum < 30){
                    mvpList.forEach((e) => {
                      batch.update(doc(db,"debate",debateID,"participant",e.pid),{
                        mvpPoint:20
                      })
                    })
                  }else{
                    mvpList.forEach((e) => {
                      batch.update(doc(db,"debate",debateID,"participant",e.pid),{
                        mvpPoint:50
                      })
                    })
                  }
    
                  await batch.commit()
                }
          

              }
            }

          
          })

          console.log("議論後 => 議論完了 更新")
        }

      }catch(e){
        alert('議論状態変更でエラーが発生、至急対応せよ')
        console.log(e)
      }

      //================================================================================
      //=====ユーザー情報関連処理=======================================================

      try{
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          
          if (user) {
            console.log(user.uid); // ユーザーIDをコンソールに出力
            //ユーザー情報取得
            const usersRef = collection(db,"users");
            const q = query(usersRef,where("puid","==",user.uid))
    
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
    
            if(querySnapshot.empty){

              setUserInfo({
                infoId:'NY',
                uid:'NY',
                name:'',
                profile:'',
                favCat:''
              })

              //初回会員登録処理
              navigate('/accountedit')
    
    
            }else{
              let UID = ""
              let nowExp = ""
              let ids = {}
              querySnapshot.forEach((doc) => {
                ids = {
                  uid:doc.data().uid,
                  infoId:doc.data().infoId
                }
                UID = doc.data().uid
              })

              const infoDoc = doc(usersRef,ids.uid,'info',ids.infoId)

              const infoSnapshot = await getDoc(infoDoc)

              setUserInfo({
                infoId:ids.infoId,
                uid: infoSnapshot.data().uid,
                name: infoSnapshot.data().name,
                exp: infoSnapshot.data().exp,
                rank: expToRank(infoSnapshot.data().exp),
                profile: infoSnapshot.data().profile,
                favCat: infoSnapshot.data().facCat,
                favorite: infoSnapshot.data().favorite,
                createdAt: infoSnapshot.data().createdAt
              })
              nowExp = infoSnapshot.data().exp
    
              //===振り込み==============================
              const mineJoinRef = collection(db,'users',UID,"join")
              const settleQuery = query(mineJoinRef,where('endTime','<',now),where('settle','==',true))
              const settleSnapshot = await getDocs(settleQuery)
              console.log(settleSnapshot)
              settleSnapshot.forEach(async(e) => {
                const partcipantRef = doc(db,"debate",e.data().did,"participant",e.data().pid)
                await runTransaction(db,async(transaction) => {
                  //獲得経験値取得
                  const participantSnapshot = await transaction.get(partcipantRef)
                  let plusExp = participantSnapshot.data().good
                  plusExp = plusExp + participantSnapshot.data().mvpPoint
                  if(plusExp > 100){
                    plusExp = 100
                  }
                  //経験値振り込み
                  const mineRef = doc(db,"users",UID,'info',ids.infoId)
                  transaction.update(mineRef,{
                    exp:increment(plusExp),
                  })
                  //settleをfalseに変更
                  const thisJoinRef = doc(db,"users",UID,"join",e.id)
                  transaction.update(thisJoinRef,{settle:false})
                  
                  console.log(plusExp)
                })

              })
    
    
            }
            
    
          } else {
            console.log('ユーザーはログインしていません');
            setUserInfo({
              infoId:'NL',
              uid:"NL",
              name:"NL",
              exp:0,
              rank:0,
              profile:"NL",
              favCat:"",
              favorite:[]
            })
    
          }
        });
        return unsubscribe;

      }catch(e){
        alert('ユーザー関連でエラーが発生、至急対応せよ')
        console.log(e)
      }

    }
  })() }, [enterFlag]);

  const setUserInfoFun = (data) => {
    setUserInfo({...data})
  }

  return (
 
    <>
      {
        userInfo ? (
          <>
          <Header userInfo={userInfo}/>
            <Routes>
              <Route path={'/'} element={<MainPageContainer  userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={'/login/'} element={<Login userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={'/register/'} element={<CreateAccount userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={'/about/'} element={<FirstPage userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={'/debate/'} element={<DebatePageContainer userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={'/create/'} element={<CreateDebatePage userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={'/mypage/'} element={<MyPage userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={"/accountedit/"} element={<AccountEdit userInfo={userInfo} uIF={setUserInfoFun}/>} />
              <Route path={"/navi/"} element={<AlertBox userInfo={userInfo} />} />
              <Route path={"/contact/"} element={<ContactForm />} />
              <Route path={"/favorite/"} element={<FavoriteDebatePage userInfo={userInfo} />} />
              <Route path={"/madepage/"} element={<MadeDebatePage userInfo={userInfo} />} />
              <Route path={"/joinpage/"} element={<JoinDebatePage userInfo={userInfo} />} />
              <Route path={"/terms/"} element={<TermsOfService />} />
              <Route path={"/privacy/"} element={<PrivacyPolicy />} />
              <Route path={"/deleteaccountform/"} element={<DeleteForm userInfo={userInfo} />} />
              <Route path="*" element={<E404 />} />
            </Routes>   
        </>
        ) : <Loader />
      }
    </>
    
  );
};

const SWraps = styled.div`
  margin-top: 56px;
`

export default App;
 