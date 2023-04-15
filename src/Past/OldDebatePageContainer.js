//react import
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import { baseColor } from "../assets/styles/BaseColor";

//firebase import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, doc, query, where, getDoc, getDocs, addDoc, updateDoc, runTransaction,writeBatch, serverTimestamp, orderBy,increment, limit, arrayUnion, startAfter, endAt} from "firebase/firestore";
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




const OldDebatePageContainer = (props) => {
  //router
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  //現在時刻取得
  let now = new Date();

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();


  //thisDebateId
  const thisDebateID = searchParams.get("did");
  

  //user
  const [userD,setUserD] = useState(null);
  
  //中央制御フラグ
  const [enterFlag, setEnterFlag] = useState(false)
  const [controlFlag,setControlFlag] = useState(false)
  const [beforeFlag,setBeforeFlag] = useState(false)
  const [activeFlag,setActiveFlag] = useState(false)
  const [afterFlag, setAfterFlag] = useState(false)
  const [onEndingFlag,setOnEndingFlag] = useState(false)
  const [endFlag,setEndFlag] = useState(false)
  
  //サブ制御フラグ
  const [agendaFlag, setAgendaFlag] = useState(false)
  const [formFlag,setFormFlag] = useState(0)
  const [opinionFlag,setOpinionFlag] = useState(false)
  const [showMvpFlag,setShowMvpFlag] = useState(false)

  //page
  const [page,setPage] = useState(1)
  const [pageNextFlag,setPageNextFlag] = useState(false)
  const [pageBackFlag,setPageBackFlag] = useState(false)
  const [opinionStore,setOpinionStore] = useState([])
  
  //state設定
  const [contents, setContents] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [opinionList,setOpinionList] = useState(false);
  const [goodBadList,setGoodBadList] = useState(false);
  const [mvp,setMvp] = useState([])
  

  useEffect(() => { //First-1
    setEnterFlag(true)
  },[])



  useEffect(() => { //First-2
    if(enterFlag === true){
      (async() => {
        try{
          console.log(searchParams.get('did'))
          //const thisDebateID = searchParams.get('did')
          const thisDebateRef = doc(db,"debate",thisDebateID);
          console.log(thisDebateRef)
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
        console.log("userInfoはあります")
        console.log(props.userInfo.favorite)
        setUserD({
          ...props.userInfo
        })
      }else{
        alert("エラーです")
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
      
      const thisDebateRef = doc(db,"debate",thisDebateID);

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

          //opinionセット
          const opinionQuery = query(collection(db, "debate",thisDebateID,"opinion"),orderBy("id"),limit(50))
          const opinionSnapshot = await getDocs(opinionQuery)
          if(!opinionSnapshot.empty){
            let preOpinionList = []
            opinionSnapshot.forEach(e => {
              preOpinionList.push({
                oid: e.id,

                id: e.data().id,
                to_reply: e.data().to_reply,
                body: e.data().body,
                pid: e.data().pid,

                uid: e.data().uid,
                name: e.data().name,
                rank: e.data().rank,
                position: e.data().position,
                policy: e.data().policy,

                good: e.data().good,
                bad: e.data().bad,
                convert: e.data().convert,
                createdAt: e.data().createdAt.toDate(),

                status:contents.status

              })
            })
            setOpinionList(preOpinionList)
            console.log("opinionSnapshot OK")
          }else{
            setOpinionList(false)
            console.log("opinionSnapshot NG")
          }

          //==========ユーザー情報取得処理===================================
          
          try{
            //good_bad取得
              if(userD.uid !== "NL"){
                console.log(userD)
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
                  const gbRef = await addDoc(good_badRef,{
                    uid:userD.uid,
                    to_good:[],
                    to_bad:[],
                    voteAble:true
                  })
                  setGoodBadList({
                    gbid:gbRef.id,
                    uid:userD.uid,
                    good:[],
                    bad: [],
                    voteAble:true
                  })
                }
                
                console.log("綾波レイ")
                
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
                      joinedAt:e.data().createdAt.toDate()
                    })
                  });
                  }else{
                    console.log("碇ユイ")
                    setParticipant({join:false})            
                  }
              }else{
                console.log("userいない"+userD)
                setGoodBadList({
                  uid:"NL",
                  good:[],
                  bad:[]
                })
                setParticipant({join:false}) 
              }
          }catch (e) {
            console.log("情報取得失敗:", e);
          }

        })()
      }
    },[beforeFlag,activeFlag,afterFlag,endFlag])

    //--------------------------------------------------------
    //-------opinion表示フラグ--------------------------------

  
    useEffect(()=>{ //All-2
      if(opinionList !== false){
        if(goodBadList !== false){
            setOpinionFlag(true)
            console.log("opinionFlag")
          }
        }
    }
    ,[opinionList,goodBadList])

    //-------------------------------------------------------
    //------フォーム表示処理---------------------------------


    useEffect(()=>{ //All-3
      if(participant){
        //(async() => {
        //   console.log("participantセットOK")
        //   //participant内のユーザー情報を更新
        //   if(participant.join !== false){
        //     if(participant.uid !== userD.uid){
        //       //error処理
        //     }
        //     if(participant.name !== userD.name){
        //       await updateDoc(doc(db,"debate",thisDebateID,"participant",userD.uid),{
        //         name:userD.name
        //       })
        //       setParticipant({...participant,name:userD.name})
        //     }
        //     if(participant.rank !== userD.rank){
        //       await updateDoc(doc(db,"debate",thisDebateID,"participant",userD.uid),{
        //         rank:userD.rank
        //       })
        //       setParticipant({...participant,rank:userD.rank})
        //     }
        //   }
        // })()

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

    const nextFun = async (start,finish) =>{
      //opinionセット
      const opinionQuery = query(collection(db, "debate",thisDebateID,"opinion"),orderBy("id"),limit(50),startAfter(start),endAt(finish))
      const opinionSnapshot = await getDocs(opinionQuery)
      if(!opinionSnapshot.empty){
        let preOpinionList = []
        opinionSnapshot.forEach(e => {
          preOpinionList.push({
            oid: e.id,

            id: e.data().id,
            to_reply: e.data().to_reply,
            body: e.data().body,
            pid: e.data().pid,

            uid: e.data().uid,
            name: e.data().name,
            rank: e.data().rank,
            position: e.data().position,
            policy: e.data().policy,

            good: e.data().good,
            bad: e.data().bad,
            convert: e.data().convert,
            createdAt: e.data().createdAt.toDate()

          })
        })
        console.log("opinionSnapshot OK")
        return preOpinionList
      }else{
        console.log("opinionSnapshot NG")
        return false
      }
    }

    const onNext = async () => {
      console.log("next")
      if(page === 1){
        if(contents.opinion_sum > 50){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 2){
        if(contents.opinion_sum > 100){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 3){
        if(contents.opinion_sum > 150){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 4){
        if(contents.opinion_sum > 200){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 5){
        if(contents.opinion_sum > 250){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 6){
        if(contents.opinion_sum > 300){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 7){
        if(contents.opinion_sum > 350){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 8){
        if(contents.opinion_sum > 400){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
      if(page === 9){
        if(contents.opinion_sum > 450){
          setOpinionFlag(false)
          setPageNextFlag(true)
        }
      }
    
    }

    useEffect(() => { //All-next
      if(pageNextFlag === true){
        //console.log("NEXCO中日本")
        (async() => {
          if(page === 1){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(50,100)
            setOpinionList(result)
            setPage(2)
            setPageNextFlag(false)
          }
          if(page === 2){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(100,150)
            setOpinionList(result)
            setPage(3)
            setPageNextFlag(false)
          }
          if(page === 3){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(150,200)
            setOpinionList(result)
            setPage(4)
            setPageNextFlag(false)
          }
          if(page === 4){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(200,250)
            setOpinionList(result)
            setPage(5)
            setPageNextFlag(false)
          }
          if(page === 5){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(250,300)
            setOpinionList(result)
            setPage(6)
            setPageNextFlag(false)
          }
          if(page === 6){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(300,350)
            setOpinionList(result)
            setPage(7)
            setPageNextFlag(false)
          }
          if(page === 8){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(400,450)
            setOpinionList(result)
            setPage(9)
            setPageNextFlag(false)
          }
          if(page === 9){
            setOpinionStore(opinionStore.push(opinionList))
            const result = await nextFun(450,500)
            setOpinionList(result)
            setPage(10)
            setPageNextFlag(false)
          }

        })()
      }
    },[pageNextFlag])
  
  //------------------------------------------------------------------
  //----前へ----------------------------------------------------------
    const onBack = () => {
      if(page !== 1){
        console.log("back")
        setOpinionFlag(false)
        setPageBackFlag(true)
      }
    }

    useEffect(() => { //All-back
      if(pageBackFlag === true){
        console.log("NEXCO東日本")
        if(page === 10){
          const result = opinionStore[8]
          setOpinionList(result)
          setPage(9)
          setPageNextFlag(false)
        }
        if(page === 9){
          const result = opinionStore[7]
          setOpinionList(result)
          setPage(8)
          setPageNextFlag(false)
        }
        if(page === 8){
          const result = opinionStore[6]
          setOpinionList(result)
          setPage(7)
          setPageNextFlag(false)
        }
        if(page === 7){
          const result = opinionStore[5]
          setOpinionList(result)
          setPage(6)
          setPageNextFlag(false)
        }
        if(page === 6){
          const result = opinionStore[4]
          setOpinionList(result)
          setPage(5)
          setPageNextFlag(false)
        }
        if(page === 5){
          const result = opinionStore[3]
          setOpinionList(result)
          setPage(4)
          setPageNextFlag(false)
        }
        if(page === 4){
          const result = opinionStore[2]
          setOpinionList(result)
          setPage(3)
          setPageNextFlag(false)
        }
        if(page === 3){
          const result = opinionStore[1]
          setOpinionList(result)
          setPage(2)
          setPageNextFlag(false)
        }
        if(page === 2){
          const result = opinionStore[0]
          setOpinionList(result)
          setPage(1)
          setPageNextFlag(false)
        }
      }
    },[pageBackFlag])

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

        // setGoodBadList({...goodBadList,
        //   good : goodBadList.good.push(numid)
        // })

        console.log("Good成功!");

      } catch (e) {
      console.log("Good失敗: ", e);
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
                pid: pid,
                join:true,
                uid:userD.uid,
                name: userD.name,
                rank: userD.rank,
                position: val,
                good: 0,
                bad:0,
                convert:0,
                convertSelf : 0,
                policy : text,
                opinion: [],
                createdAt: serverTimestamp()
              })

              // const userRef = doc(db,"users",userD.uid)
              // transaction.update(userRef,{
              //   join:arrayUnion({
              //     endTime:contents.endTime,
              //     did:thisDebateID,
              //     pid: pid
              //   })
              // })

              const userJoinRef = doc(collection(db,"users",userD.uid,"join"))
              transaction.set(userJoinRef,{
                did:thisDebateID,
                pid: pid,

                title:contents.title,
                startTime:contents.startTime,
                finishTime:contents.finishTime,
                endTime:contents.endTime,
                category:contents.category,
                hostName:contents.hostRank,
                hostRank:contents.hostRank,
                hostId:contents.hostId,
    
                policy : text,
                position: val,
    
                settle:true,
                joinAt:serverTimestamp()

              })

      
              setParticipant({
                pid: participantDoc.id,
    
                join:true,
                uid:userD.uid,
                name: userD.name,
                rank: userD.rank,
                position: val,
                good: 0,
                bad:0,
                convert:0,
                convertSelf : 0,
                policy : text,
                opinion: [],
                joinedAt: new Date()
              });
          
          
            
              console.log("Transaction successfully committed!");
              setFormFlag(2)
            }else{
              alert("参加上限に達したためこの議論に参加することができません")
            }
        });
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }
  
  //--------------------------------------------------------
  //-----意見追加処理--------------------------------------
    const addOpinion = async (reply,body) => {
      try {
        const thisDebateRef = doc(db,"debate",thisDebateID);
        await runTransaction(db, async (transaction) => {
          const num = await transaction.get(thisDebateRef);
          if (!num.exists()) {
            throw "Document does not exist!";
          }
      
          const opinionId = num.data().opinion_sum + 1;
          if(opinionId <= 500){
            transaction.update(thisDebateRef, {opinion_sum:opinionId })
            
            const opinionRef = doc(collection(thisDebateRef,"opinion"))
            transaction.set(opinionRef,{
              id: opinionId,
              to_reply:reply,
              body:body,
  
              pid:participant.pid,
              uid:participant.uid,
              name:participant.name,
              rank:participant.rank,
              position:participant.position,
              policy:participant.policy,
  
              good:0,
              bad:0,
              convert:0,
              createdAt:serverTimestamp()
  
            })
            console.log("Transaction successfully committed!");
  
          }else{
            alert("意見の上限に達しました。議論を終了します。")
          }
  
        });

      } catch (e) {
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
            console.log('エラーです')
          }

        }else{
          alert("投票は一人一回までです")
        }
    
    } catch (e) {
      console.log("Transaction failed: ", e)
    }
  }

  //////////////////////////////////////////////////////////////
  //////議論後処理おわり//////////////////////////////////////////
  //////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////
  //////投票完了後集計処理はじめ////////////////////////////////
  /////////////////////////////////////////////////////////////

  // useEffect(() => { //OnEnding-1
  //   if(onEndingFlag === true){
  //     (async() => {
        
  //       let preMvp = ""
  //       const mvpPreList = []
  //       const mvpQuery = query(collection(db, "debate",thisDebateID,"participant"),orderBy("vote","desc"),limit(1))

  //       const mvpSnapshot = await getDocs(mvpQuery)

  //       console.log(mvpSnapshot)


  //       if(!mvpSnapshot.empty){
  //         mvpSnapshot.forEach((e)=> {
  //           preMvp = e.data()
  //         })

  //         if(preMvp.vote > 0){
  //           const mvpManyQuery = query(collection(db, "debate",thisDebateID,"participant"),where("vote","==",preMvp.vote))
  //           const mvpManySnapshot = await getDocs(mvpManyQuery)
  
  //           if(! mvpManySnapshot.empty){
  //             //mvpList作成
  //             const mvpList = []
  //             console.log(mvpManySnapshot)
  //             mvpManySnapshot.forEach((e)=> {
  //               mvpList.push(e.data())
  //             })
  
  //             setMvp(mvpList)
  
  //             const batch = writeBatch(db);
              
  //             batch.update(doc(db, "debate",thisDebateID),{
  //               status:3,
  //               mvpList :mvpList
  //             })
              
  //             if(contents.participant_sum < 10){
  //               mvpList.forEach((e) => {
  //                 batch.update(doc(db,"debate",thisDebateID,"participant",e.pid),{
  //                   good:increment(10)
  //                 })
  //               })
  //             }else if(contents.participant_sum < 30){
  //               mvpList.forEach((e) => {
  //                 batch.update(doc(db,"debate",thisDebateID,"participant",e.pid),{
  //                   good:increment(20)
  //                 })
  //               })
  //             }else{
  //               mvpList.forEach((e) => {
  //                 batch.update(doc(db,"debate",thisDebateID,"participant",e.pid),{
  //                   good:increment(50)
  //                 })
  //               })
  //             }

  //             await batch.commit()
  //           }

  //         }

  //       }


  //   })()}

  // },[onEndingFlag])
  ///////////////////////////////////////////////////////////////////
  //////投票完了後集計処理おわり////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  
  ///////////////////////////////////////////////////////////////////
  //////集計完了後はじめ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  useEffect(() => { //End-1
    if(endFlag === true){
      console.log('IKKO')
      console.log(contents.mvpList)
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





    const confirm  = () => {
      console.log(contents)
      console.log("user")
      console.log(userD)
      console.log("participant")
      console.log(participant)
    }
    

  

  return(
    <>
      {
        agendaFlag ? (
          <SDPWrap>
            <SDebate >
              <SAgendaWrap>
              <Agenda agendaContents={contents} userInfo={userD}/>
              </SAgendaWrap>
              <SPannelField>
                {showMvpFlag === true && <MvpPannel userList={mvp} />} 
              </SPannelField>
              <SOpinionField>
                {opinionFlag ? (
                  opinionList.map((e) => (
                    <Opinion 
                      key={e.id}
                      contents={e}
                      goodBadList={goodBadList}
                      onGood={onGood}
                      // onBad={onBad}
                    />
                  ))
                 ) : <Loader />
                }
                <SSwitchOpinion>
                {opinionFlag === true && (
                  <>
                  <BBackBtn onClick={onBack}>前へ</BBackBtn>
                  <BNextBtn onClick={onNext}>次へ</BNextBtn>
                  </> 
                )}
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
  background-color: #cccccc;
`;

const SDebate = styled.div`
  width: 950px;
  position:relative;
  background-color: white;
`;

const SAgendaWrap = styled.div`
   margin-top: 70px;
   @media screen and (max-width: 480px) {
   margin-bottom: 100px;
  }
`;

const SPannelField = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const SPostOpinionWrap = styled.div`
  position: fixed;
  width: 950px;
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
  background-color: #cccccc;
  height: 30px;
  width: 20%;
  text-align: center;
  font-weight: bold;
  &:hover {
      cursor: pointer;
      color: #f5f5f5;
      background-color: ${baseColor};
    }
`

const BNextBtn = styled.div`
  background-color: #cccccc;
  height: 30px;
  width: 20%;
  text-align: center;
  font-weight: bold;
  &:hover {
      cursor: pointer;
      color: #f5f5f5;
      background-color: ${baseColor};
    }
`


export default OldDebatePageContainer;