//react import
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import { baseColor } from "../assets/styles/BaseColor";

//firebase import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, doc, query, where, getDoc, getDocs, updateDoc, runTransaction,writeBatch, serverTimestamp, orderBy,increment, limit, arrayUnion, startAfter, onSnapshot, setDoc} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";

//component import
import Agenda from "../Presentational/Organisms/Agenda";
import Loader from "../Presentational/Atoms/Loader";
import Opinion from "../Presentational/Organisms/Opinion";
import PostOpinion from "../Presentational/Organisms/PostOpinion";
import PostJoin from "../Presentational/Organisms/PostJoin";
import BeforeStartBottom from "../Presentational/Molecules/BeforeStartBottom";
import NotLoginBottom from "../Presentational/Atoms/NotLoginBottom";
import Vote from "../Presentational/Organisms/Vote";
import Voted from "../Presentational/Atoms/Voted";
import MvpPannel from "../Presentational/Molecules/MvpPannel";
import { setNL } from "../Helpers/NewLine";
import InformationMessage from "../Presentational/Atoms/InformationMessage";
import { getNowDate, getNowTime } from "../Helpers/DateOperation";
import { Helmet } from "react-helmet-async";




const DebatePageContainer = (props) => {
  //router
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  

  //現在時刻取得
  let now = new Date();

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();


  //thisDebateId
  const thisDebateID = searchParams.get("did")
  
  //user
  const [userD,setUserD] = useState(null);

  //ページ
  const [page, setPage] = useState(null)
  
  //中央制御フラグ
  const [enterFlag, setEnterFlag] = useState(false)
  const [controlFlag,setControlFlag] = useState(false)
  const [beforeFlag,setBeforeFlag] = useState(false)
  const [activeFlag,setActiveFlag] = useState(false)
  const [afterFlag, setAfterFlag] = useState(false)
  const [endFlag,setEndFlag] = useState(false)
  const [reloadFlag,setReloadFlag] = useState(false)
  
  //サブ制御フラグ
  const [agendaFlag, setAgendaFlag] = useState(false)
  const [formFlag,setFormFlag] = useState(0)
  const [showMvpFlag,setShowMvpFlag] = useState(false)
  const [notFlag, setNotFlag] = useState(false)
  const [nextFlag,setNextFlag] = useState(false)
  const [backFlag,setBackFlag] = useState(false)
  
  //state設定
  const [contents, setContents] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [opinionList,setOpinionList] = useState([]);
  const [goodBadList,setGoodBadList] = useState(false);
  const [mvp,setMvp] = useState([])
  

  useEffect(() => { //First-1
    setEnterFlag(true)
  },[])



  useEffect(() => { //First-2
    if(enterFlag === true){
      (async() => {
        try{
          const thisDebateRef = doc(db,"debate",thisDebateID);
          //コレクションの取得
          const thisDebateSnapshot = await getDoc(thisDebateRef);
            
          setContents({
            did: thisDebateID,
            title: thisDebateSnapshot.data().title,
            body: thisDebateSnapshot.data().body,
            positionA: thisDebateSnapshot.data().positionA,
            positionB: thisDebateSnapshot.data().positionB,
            positionC: thisDebateSnapshot.data().positionC,
            positionD: thisDebateSnapshot.data().positionD,
            startTime: thisDebateSnapshot.data().startTime.toDate(),
            finishTime: thisDebateSnapshot.data().finishTime.toDate(),
            endTime: thisDebateSnapshot.data().endTime.toDate(),
            category: thisDebateSnapshot.data().category,
            tag1: thisDebateSnapshot.data().tag1,
            tag2: thisDebateSnapshot.data().tag2,
            tag3: thisDebateSnapshot.data().tag3,
            tag4: thisDebateSnapshot.data().tag4,
            reference: thisDebateSnapshot.data().reference,
            hostName: thisDebateSnapshot.data().hostName,
            hostRank: thisDebateSnapshot.data().hostRank,
            hostId: thisDebateSnapshot.data().hostId,
            joinable: thisDebateSnapshot.data().joinable,
            status: thisDebateSnapshot.data().status,
            opinion_sum: thisDebateSnapshot.data().opinion_sum,
            participant_sum: thisDebateSnapshot.data().participant_sum,
            mvpList: thisDebateSnapshot.data().mvpList,
            createdAt: thisDebateSnapshot.data().createdAt
            
          });
  

        }catch(e){
          navigate("/navi?parm=noDebate")
        }
      })()

    }
  },[enterFlag])


  //=====user情報取得==============================

  useEffect(() => { //First-3
    if(contents){
      if(props.userInfo){
        setUserD({
          ...props.userInfo
        })
      }else{
        alert('エラーが発生しました。もう一度読み込んでください。')
      }
    }
    
  },[contents])

  useEffect(() => { //First-4
    if(userD){
      //制御フラグ更新  
      setControlFlag(true)
      setAgendaFlag(true)
    }

  },[userD])

  //////////////////////////////////////////////////////////
  ///中央制御処理はじめ/////////////////////////////////////
  /////////////////////////////////////////////////////////

  useEffect(() => { //Center
    (async() => {
      //初回レンダリング時処理
      if(controlFlag === false){
        console.log("初回レンダリング")

      }

      if (controlFlag === true){
        if(contents){
        //議論状態による分岐
        if(contents.status === 0){
          setBeforeFlag(true)
        }
        else if(contents.status === 1){
          setActiveFlag(true)
        }
        else if(contents.status === 2){
          setAfterFlag(true)
        }
        else if(contents.status === 3){
          setEndFlag(true)
        }
        
        }
      }

    })()
  },[controlFlag,contents])
  /////////////////////////////////////////////////////////////////
  ///中央制御処理おわり///////////////////////////////////////////
  ///////////////////////////////////////////////////////////////


  
  /////////////////////////////////////////////////////////////////
  //////全体共通制御処理はじめ/////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  useEffect(() => { //All-1
      if(beforeFlag === true || activeFlag === true || afterFlag === true ||endFlag === true){
        (async() => {
          //==========ユーザー情報取得処理===================================
          try{
            //good_bad取得
            if(userD.uid !== "NL"){
              const good_badRef = collection(db, "debate",thisDebateID,"good_bad")
              const good_badQuery = query(good_badRef,where("uid", "==", userD.uid))
              const good_badSnapshot = await getDocs(good_badQuery)
              if(!good_badSnapshot.empty){
                good_badSnapshot.forEach(e => {
                  setGoodBadList({
                    gbid:e.id,
                    uid:e.data().uid,
                    good:e.data().to_good,
                    bad:e.data().bad_list,
                    voteAble:e.data().voteAble
                  })
                })
              }else{
                const gbDoc = doc(good_badRef)
                await setDoc(gbDoc,{
                  did:thisDebateID,
                  gbid:gbDoc.id,
                  uid:userD.uid,
                  to_good:[],
                  to_bad:[],
                  voteAble:true
                })
                setGoodBadList({
                  gbid:gbDoc.id,
                  uid:userD.uid,
                  good:[],
                  bad: [],
                  voteAble:true
                })
              }
              
              
              //ユーザー参加状態の確認
              const participantQuery = query(collection(db, "debate",thisDebateID,"participant"), where("uid", "==", userD.uid))
              const participantSnapshot = await getDocs(participantQuery);
              if (!participantSnapshot.empty){
                participantSnapshot.forEach(e => {        
                  setParticipant({
                    pid: e.id,
                    join:true,
                    uid : e.data().uid,
                    name : e.data().name,
                    rank : e.data().rank,
                    position : e.data().position,
                    good : e.data().good,
                    bad: e.data().bad,
                    toGood: e.data().toGood,
                    toBad: e.data().toBad,
                    convert : e.data().convert,
                    convertSelf : e.data().convertSelf,
                    policy : e.data().policy,
                    opinion: e.data().opinion,
                    joinedAt:e.data().joinAt.toDate()
                  })
                });
                }else{
                  setParticipant({
                    uid:userD.uid,
                    join:false
                  })            
                }
            }else{
              setGoodBadList({
                uid:"NL",
                good:[],
                bad:[]
              })
              setParticipant({
                uid:"NL",
                join:false
              }) 
            }

          }catch (e) {
            console.log("情報取得失敗:", e);
            alert('エラーが発生しました。もう一度読み込んでください。')
          }


        })()
      }
    },[beforeFlag,activeFlag,afterFlag,endFlag])

    //----------------------------------------------------------
    //----ページ情報オペレーション-----------------------------

    useEffect(() => {
      if(goodBadList !== false){
        setOpinionList([])
        let prePage = 0
        const receivePage = searchParams.get("page")

        if(receivePage == null){
          setSearchParams({ 
            did:thisDebateID,
            page: 1 
          });
        }else{
          if(typeof receivePage === "number"){
            if(receivePage < 11){
              prePage = receivePage
            }else{
              setSearchParams({ 
                did:thisDebateID,
                page: 1
              });
            }
          }else if(typeof Number(receivePage) === "number"){
            if(Number(receivePage) < 11){
              prePage = receivePage
            }else{
              setSearchParams({ 
                did:thisDebateID,
                page: 1 
              });
            }
          }else{
            setSearchParams({ 
              did:thisDebateID,
              page: 1 
            });
          }
        }

        if(0 < prePage < 11 ){
          setPage(prePage)
        }else{
          setSearchParams({ 
            did:thisDebateID,
            page: 1 
          });
        }
      }
    },[goodBadList,searchParams])

    useEffect(() => {
      if(goodBadList !== false){
        setReloadFlag(!reloadFlag)
      }
    },[page])

    //--------------------------------------------------------
    //-------opinion取得--------------------------------------
    useEffect(()=>{(async() => {//All-2
      if(goodBadList !== false){
        //===opinion情報取得==================================
        try{
          //前準備
          const startId = (page * 50) - 50
          console.log(startId)

          let preOpinionList = [...opinionList]

          const opinionRef = collection(db,'debate',thisDebateID,'opinion')
          const q = query(opinionRef,orderBy("id"),startAfter(startId),limit(50))

          //変更検知及び取得
          const unsubscribe = onSnapshot(q, (snapshot) => {

            setNotFlag(false)
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                preOpinionList.push({
                  oid: change.doc.id,
                  id: change.doc.data().id,
                  to_reply: change.doc.data().to_reply,
                  replyName:change.doc.data().replyName,
                  replyBody:change.doc.data().replyBody,

                  body: change.doc.data().body,
                  pid: change.doc.data().pid,
            
                  uid: change.doc.data().uid,
                  name: change.doc.data().name,
                  rank: change.doc.data().rank,
                  position: change.doc.data().position,
                  policy: change.doc.data().policy,
            
                  good: change.doc.data().good,
                  bad: change.doc.data().bad,
                  convert: change.doc.data().convert,
                  createdAt: change.doc.data().createdAt.toDate(),
            
                  status:contents.status  
                })
              }
            });

            setOpinionList([...preOpinionList])
          });

        }catch(e){
          console.log(e)
          alert('エラーが発生しました。もう一度読み込んでください。')
        }
      } 
    })()}
    ,[reloadFlag])

    //-------------------------------------------------------
    //------フォーム表示処理---------------------------------


    useEffect(()=>{ //All-3
      if(participant){

        if(userD.uid !== "NL"){
          if(contents.status === 1){
            if(participant.join === true){
              setFormFlag(2)
            }else{
              setFormFlag(1)
            }
          }else if(contents.status === 2){
              if(goodBadList.voteAble === true){
                setFormFlag(3)
              }else{
                setFormFlag(4)
              }
          }
        }else{
          setFormFlag(99)
        }

      }
    },[participant])


  //---------------------------------------------------------
  //------表示意見変更処理-----------------------------------
  
  //----次へ-------------------------------------------------

  const onNext = () => {
    if(page < 10){
      let nextPage = Number(page) + 1

      setSearchParams({ 
        did:thisDebateID,
        page: String(nextPage) 
      });
    
    }
  }

  //------------------------------------------------------------------
  //----前へ----------------------------------------------------------
    const onBack = () => {
      if(page > 1){
        let backPage = Number(page) - 1
        setSearchParams({ 
          did:thisDebateID,
          page: String(backPage) 
        });
      }
    }

  ////////////////////////////////////////////////////////////////////
  ///good badは投票完了後はナシ//////////////////////////////////////
  //-----------------------------------------------------------------
  //-----GOOD処理----------------------------------------------------
  const onGood = async (numid,oid,apid) => {
    if(userD.uid !== "NL"){
      try {
        const thisDebateRef = doc(db,"debate",thisDebateID);
        const batch = writeBatch(db);

        const opinionRef = doc(thisDebateRef,"opinion",oid)
        batch.update(opinionRef,{good: increment(1)})
        console.log(apid)
        const participantRef = doc(thisDebateRef,"participant",apid.trim())
        batch.update(participantRef,{good: increment(1)})

        const goodBadRef = doc(thisDebateRef,"good_bad",goodBadList.gbid)
        batch.update(goodBadRef,{to_good : arrayUnion(numid)})

        await batch.commit()

        console.log("Good成功!");

      } catch (e) {
      console.log("Good失敗: ", e);
      alert('エラーが発生しました。やり直してください。')
      }

    }else{
      alert("ログインしてください")
    }
  }

//-----------------------------------------------------------------
//-----BAD処理----------------------------------------------------
  // const onBad = async (numid,oid,apid) => {
  //   if(userD.uid !== "NL"){
  //     try {
  //       const thisDebateRef = doc(db,"debate",thisDebateID);
  //       const batch = writeBatch(db);
  //       const opinionRef = doc(thisDebateRef,"opinion",oid)
  //       batch.update(opinionRef,{bad: increment(1)})

  //       const participantRef = doc(thisDebateRef,"participant",apid.trim())
  //       batch.update(participantRef,{bad: increment(1)})

  //       const goodBadRef = doc(thisDebateRef,"good_bad",goodBadList.gbid)
  //       batch.update(goodBadRef,{to_bad : arrayUnion(numid)})

  //       await batch.commit()

  //       setGoodBadList({...goodBadList,
  //         bad : goodBadList.bad.push(numid)
  //       })

  //       console.log("Bad成功!");

  //     } catch (e) {
  //       console.log("Bad失敗: ", e);
  //     }
  //   }else{
  //     alert("ログインしてください")
  //   }
  // }


  /////////////////////////////////////////////////////////////////
  //////全体共通制御処理///////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  //////議論開始前処理はじめ/////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  //固有の処理はまだない

  //////////////////////////////////////////////////////////////
  //////議論開始前処理おわり////////////////////////////////////
  //////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////
  //////議論中処理はじめ///////////////////////////////////////////
  /////////////////////////////////////////////////////////////////



    //----------------------------------------------------------------
    //-------初参加処理---------------------------------------------

    const joinDebate = async (val,text) => {

    
      try {
        const thisDebateRef = doc(db,"debate",thisDebateID);
        await runTransaction(db, async (transaction) => {
          const nowContents = await transaction.get(thisDebateRef);
          if (!nowContents.exists()) {
            throw "Document does not exist!";
          }

            const participantSum = nowContents.data().participant_sum + 1;
              
            if(participantSum <= nowContents.data().joinLimit){
              
              transaction.update(thisDebateRef, {participant_sum:participantSum })

              const participantRef = doc(collection(thisDebateRef,"participant"))
              const pid = participantRef.id            
              const participantDoc = transaction.set(participantRef,{
                did:thisDebateID,
                pid: pid,
                join:true,
                uid:userD.uid,
                name: userD.name,
                rank: userD.rank,
                position: val,
                policy : text,
                good: 0,
                bad:0,
                vote:0,
                mvpPoint:0,
                convert:0,
                convertSelf: 0,
                joinAt: serverTimestamp()
              })

              const userJoinRef = doc(collection(db,"users",userD.uid,"join"))
              transaction.set(userJoinRef,{
                did:thisDebateID,
                pid: pid,

                title:contents.title,
                startTime:contents.startTime,
                finishTime:contents.finishTime,
                endTime:contents.endTime,
                category:contents.category,
                hostName:contents.hostName,
                hostRank:contents.hostRank,
                hostId:contents.hostId,
    
                policy : text,
                position: val,
    
                settle:true,
                joinAt:serverTimestamp()

              })

      
              setParticipant({
                pid: pid,
    
                join:true,
                uid:userD.uid,
                name: userD.name,
                rank: userD.rank,
                good: 0,
                bad:0,
                convert:0,
                convertSelf: 0,
                position: val,
                policy : text,
                joinAt: new Date()
              });
          
          
            
              console.log("Transaction successfully committed!");
              setFormFlag(2)
            }else{
              alert("参加上限に達したためこの議論に参加することができません")
            }
        });
      } catch (e) {
        console.log("Transaction failed: ", e);
        alert('エラーが発生しました。やり直してください。')
      }
    }
  
  //--------------------------------------------------------
  //-----意見追加処理--------------------------------------
    const addOpinion = async (reply,body) => {
      try {
        console.log(reply)
        //返信関連処理
        let replyName = null
        let replyBody = null
        
        if(reply !== null){
          const replyQuery =  query(collection(db,"debate",thisDebateID,"opinion"),where("id","==",Number(reply)))
          const replySnapshot = await getDocs(replyQuery)
          console.log(replySnapshot)
          replySnapshot.forEach(e => {
            replyName = e.data().name
            replyBody = e.data().body
            console.log(e.data().name)
          })
        }

        console.log(replyName)
        console.log(replyBody)

        const thisDebateRef = doc(db,"debate",thisDebateID);
        await runTransaction(db, async (transaction) => {
          const num = await transaction.get(thisDebateRef);
          if (!num.exists()) {
            throw "Document does not exist!";
          }

          //本処理
          const opinionId = num.data().opinion_sum + 1;
          if(reply !== null){
            if(reply > num.data().opinion_sum){
              alert('既に存在する意見にのみ返信することができます。')
              return;
            }
          }
          if(opinionId <= 500){
            transaction.update(thisDebateRef, {opinion_sum:opinionId })
            
            const opinionRef = doc(collection(thisDebateRef,"opinion"))
            transaction.set(opinionRef,{
              did:thisDebateID,
              id: opinionId,
              oid:opinionRef.id,
              body:body,
  
              pid:participant.pid,
              uid:participant.uid,
              name:participant.name,
              rank:participant.rank,
              position:participant.position,
              policy:participant.policy,
              
              to_reply:reply,
              replyName:replyName,
              replyBody:replyBody,
  
              good:0,
              bad:0,
              convert:0,
              createdAt:serverTimestamp()
  
            })
            console.log("Transaction successfully committed!");
  
          }else{
            await updateDoc(thisDebateRef,{status:2})
            alert("意見数が上限に達しました。議論を終了します。")
          }
  
        });

      } catch (e) {
        alert('エラーが発生しました。やり直してください。')
        console.log("Transaction failed: ", e);
      }
    }
  


  //////////////////////////////////////////////////////////////
  //////議論中処理おわり//////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  //////議論後処理はじめ//////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const onVote = async (data) => {
    try {
        if(goodBadList.voteAble === true){
          console.log(data)

          let toPid = ""
          let toUid = ""
          const opinionQuery = query(collection(db, "debate",thisDebateID,"opinion"), where("id", "==", Number(data)));
          const querySnapshot = await getDocs(opinionQuery)

          if(!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              toPid = doc.data().pid
              toUid = doc.data().uid
            })

            if(toUid === userD.uid){
              alert('自分に投票は出来ません')
              return
            }else{
              const batch = writeBatch(db);
  
              const participantRef = doc(collection(db, "debate",thisDebateID,"participant"),toPid)
  
              batch.update(participantRef,{vote: increment(1)})
  
              const goodBadRef = doc(db, "debate",thisDebateID,"good_bad",goodBadList.gbid)
  
              batch.update(goodBadRef,{voteAble : false})
  
              setGoodBadList({...goodBadList,voteAble:false})
  
              await batch.commit()
  
              console.log("Transaction successfully committed!");

            }
          }else{
            alert('エラーが発生しました。やり直してください。')
            console.log('エラーです')
          }

        }else{
          alert("投票は一人一回までです")
        }
    
    } catch (e) {
      console.log("Transaction failed: ", e)
      alert('エラーが発生しました。やり直してください。')
    }
  }

  //////////////////////////////////////////////////////////////
  //////議論後処理おわり//////////////////////////////////////////
  //////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////
  //////集計完了後はじめ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  useEffect(() => { //End-1
    if(endFlag === true){
      setMvp(contents.mvpList)
    }

  },[endFlag])

  
  useEffect(() => { //End-2
    if(mvp.length > 0){
      setShowMvpFlag(true)
    }

  },[mvp])

  ///////////////////////////////////////////////////////////////////
  //////集計完了後おわり////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////


  

  return(
    <>
      {
        agendaFlag ? (
          <SDPWrap>
            <Helmet>
              <title>{`Debace-${contents.title}`}</title>
              <meta
                name="description"
                content={contents.body}
              />
            </Helmet>
            <SDebate >
              <SAgendaWrap>
            {beforeFlag === true && <InformationMessage text={`ⓘ　この議論は${getNowDate(contents.startTime,'md')} ${getNowTime(contents.startTime,'hm')}に開始予定です。時間になっても開始されない場合再読み込みしてください。`} /> }
            {/* {afterFlag === true && <InformationMessage text="この議論は現在投票受付中です。あなたが一番良い議論をしたと思う人に投票してください。" /> } */}
            {afterFlag === true && <InformationMessage text={`ⓘ　この議論は現在投票受付中です。投票は${getNowDate(contents.endTime,'md')} ${getNowTime(contents.endTime,'hm')}までできます。`} /> }
            {/* {endFlag === true && <InformationMessage text="この議論は終了しました。ありがとうございます。" /> } */}
            {endFlag === true && <InformationMessage text="ⓘ　この議論は終了しました。" /> }
              <Agenda agendaContents={contents} userInfo={userD}/>
              </SAgendaWrap>
              <SPannelField>
                {showMvpFlag === true && <MvpPannel userList={mvp} />} 
              </SPannelField>
              {/* <SSwitchOpinion>
                  <>
                  <BBackBtn onClick={onBack}>前へ</BBackBtn>
                  <BNextBtn onClick={onNext}>次へ</BNextBtn>
                  </> 
                </SSwitchOpinion> */}
              <SOpinionField>
                {
                  opinionList.map((e) => (
                    <Opinion
                      did={contents.did}
                      key={e.id}
                      contents={e}
                      goodBadList={goodBadList}
                      onGood={onGood}
                    />
                  ))
                }
                <SSwitchOpinion>
                  <>
                  <BBackBtn onClick={onBack}>前へ</BBackBtn>
                  <BNextBtn onClick={onNext}>次へ</BNextBtn>
                  </> 
                </SSwitchOpinion>
              </SOpinionField>
              <SPostOpinionWrap>
                {/* <button onClick={confirm}>確認</button> */}
                {formFlag === 0 &&  <BeforeStartBottom contents={contents}  userInfo={userD} />}
                {formFlag === 1 &&  <PostJoin contents={contents} joinFun={joinDebate}/>}
                {formFlag === 2 &&  <PostOpinion contents={contents} setFun={addOpinion}/>}
                {formFlag === 3 &&  <Vote contents={contents}  setFun={onVote}/>}
                {formFlag === 4 &&  <Voted />}
                {formFlag === 99 &&  <NotLoginBottom />}
              </SPostOpinionWrap>

            </SDebate>
          </SDPWrap>)
          : <Loader />
          
      }
   
    </>
  );
};

const SDPWrap = styled.div`
  display: flex;
  justify-content: center;
  /* @media screen and (max-width: 480px) {
   margin-left: 1%;
  }
  @media screen and (max-width: 432px) {
   margin-left: 5%;
  }
  @media screen and (max-width: 395px) {
   margin-left: 9%;
  }
  @media screen and (max-width: 380px) {
   margin-left: 12%;
  }
  @media screen and (max-width: 365px) {
   margin-left: 15%;
  }
  @media screen and (max-width: 355px) {
   margin-left: 17%;
  }
  @media screen and (max-width: 345px) {
   margin-left: 19%;
  } */
`;

const SDebate = styled.div`
  width: 1200px;
  position:relative;
  background-color: white;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;


const SAgendaWrap = styled.div`
   margin-top: 56px;
   @media screen and (max-width: 480px) {
   /* margin-bottom: 100px; */
  }
`;

const SPannelField = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const SPostOpinionWrap = styled.div`
  position: fixed;
  width: 1200px;
  bottom: 0%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  @media screen and (max-width: 960px) {
   width: 100%;
  }
`

const SOpinionField = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-bottom: 90px;
`


const SSwitchOpinion = styled.div`
  display: flex;
  justify-content: space-around;
  column-gap: 10%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 10px;
`

const BBackBtn = styled.div`
  background-color: ${baseColor};
  color: #f5f5f5;
  opacity: 0.9;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  font-size: 20px;
  padding-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  &:hover {
      cursor: pointer;
      color: #f5f5f5;
      background-color: ${baseColor};
      opacity: 1;
    }
`;

const BNextBtn = styled.div`
   background-color: ${baseColor};
  color: #f5f5f5;
  opacity: 0.9;
  border-radius: 5px;
  height: 40px;
  width: 100px;
  font-size: 20px;
  padding-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  &:hover {
      cursor: pointer;
      color: #f5f5f5;
      background-color: ${baseColor};
      opacity: 1;
    }
`;


export default DebatePageContainer;