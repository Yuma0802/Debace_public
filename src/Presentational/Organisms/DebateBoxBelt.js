//React import
import React, { useEffect,useRef,useState }  from "react";
import styled from 'styled-components';

//Firebase import
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import {getFirestore,collection, query, where,getDocs, orderBy, limit, startAfter} from "firebase/firestore";

//Component import
import DebateBox from './DebateBox';
import NextBtn from "../Atoms/NextBtn";
import PrevBtn from "../Atoms/PrevBtn";


const DebateBoxBelt = (props) => {
  //現在時刻取得
  let now = new Date();

  //firebase設定
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  //ページ
  const [page, setPage] = useState(1)

  //フラグ
  const [showFlag,setShowFlag] = useState(false)
  const [updateFlag,setUpdateFlag] = useState(true)
  const [nextFlag,setNextFlag] = useState(false)
  const [prevFlag,setPrevFlag] = useState(false)
 
  //ディベートリスト
  const [debateList,setDebateList] = useState(null)

  //ディベート保存
  const [debateStore,setDebateStore] = useState([])

  //querySnapshot保存
  const [snapStore,setSnapStore] = useState(null)

  const topRef = useRef(null)


  ///////////////////////////////////////////////////////////////////////////
  /////デフォルト議論取得処理はじめ/////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  useEffect(() => {(async() => {

    if(updateFlag === true){
    setPage(1)
    let type = props.type
    let mode = ""
    if(props.mode === "latest"){
      mode = "createdAt"
    }else{
      mode = "participant_sum"
    }
    const category = props.category
    const debateRef = collection(db,"debate")
    try{
      //-------------------------------------------------------------------------
      //---全件表示--------------------------------------------------------------
      if(type === 99){
        if(category === "トップ"){
          const topQuery = query(debateRef,orderBy(mode,"desc"),limit(5))
          const debateSnapshot = await getDocs(topQuery)
          if(!debateSnapshot.empty){
            let predebateList = []
            debateSnapshot.forEach(e => {
              predebateList.push({
                ...e.data(),
                userInfo:props.userInfo
              })
            })

            //SnapStore保存処理
            const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
            const preSnapList = []
            preSnapList.push(lastVisible)
            setSnapStore(preSnapList)
          
            setDebateList(predebateList)
            
          }else{
            setDebateList(['notDebate'])
          }
          
        }else{

          const catQuery = query(debateRef,where('category','==',category),orderBy(mode,"desc"),limit(5))
          const debateSnapshot = await getDocs(catQuery)
          if(!debateSnapshot.empty){
            let predebateList = []
            debateSnapshot.forEach(e => {
              predebateList.push({
                ...e.data(),
                userInfo:props.userInfo
              })
            })

            //SnapStore保存処理
            const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
            const preSnapList = []
            preSnapList.push(lastVisible)
            setSnapStore(preSnapList)
          
            setDebateList(predebateList)
          }else{
            setDebateList(['notDebate'])
          }

        }

      }
      else{
        //-------------------------------------------------------------------------
        //---全件以外表示-------------------------------------------------------------
        if(category === "トップ"){
          const topQuery = query(debateRef,where("status","==",type),orderBy(mode,"desc"),limit(5))
          const debateSnapshot = await getDocs(topQuery)
          if(!debateSnapshot.empty){
            let predebateList = []
            debateSnapshot.forEach(e => {
              predebateList.push({
                ...e.data(),
                userInfo:props.userInfo
              })
            })

            //SnapStore保存処理
            const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
            const preSnapList = []
            preSnapList.push(lastVisible)
            setSnapStore(preSnapList)
          
            setDebateList(predebateList)
          }else{
            setDebateList(['notDebate'])
          }
          
        }else{

          const catQuery = query(debateRef,where("status","==",type),where('category','==',category),orderBy(mode,"desc"),limit(5))
          const debateSnapshot = await getDocs(catQuery)
          if(!debateSnapshot.empty){
            let predebateList = []
            debateSnapshot.forEach(e => {
              predebateList.push({
                ...e.data(),
                userInfo:props.userInfo
              })
            })

            //SnapStore保存処理
            const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
            const preSnapList = []
            preSnapList.push(lastVisible)
            setSnapStore(preSnapList)
          
            setDebateList(predebateList)
          }else{
            setDebateList(['notDebate'])
          }

        }

      }


    }catch(e){
      alert('エラーが発生しました。もう一度読み込んでください。')
      console.log(e)
    }

    }
    setUpdateFlag(false)
  })()},[updateFlag])


  useEffect(() => {
    setShowFlag(false)
    setUpdateFlag(true)
  },[props.type, props.category])



  ///////////////////////////////////////////////////////////////////////////
  /////デフォルト議論取得処理おわり/////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////
  //////次へ処理はじめ//////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  
  useEffect(() => {(async() => {
    if(nextFlag === true){
      if(debateList.length === 5){

        let mode = ""
        if(props.mode === "latest"){
          mode = "createdAt"
        }else{
          mode = "participant_sum"
        }
        const category = props.category
        const type = props.type
        const debateRef = collection(db,"debate")

      try{
        //------------------------------------------------------------------------
        //---今までのものを保存---------------------------------------------------
        let preStore = debateStore
        preStore.push(debateList)
        setDebateStore(preStore)

        //------------------------------------------------------------------------
        //----前回Refを取得-------------------------------------------------------
        let tempList = snapStore
  
        let lastRef = tempList.slice(-1)[0]


        //-------------------------------------------------------------------------
        //---全件表示--------------------------------------------------------------
        if(type === 99){
          if(category === "トップ"){
            const topQuery = query(debateRef,orderBy(mode,"desc"),startAfter(lastRef),limit(5))
            const debateSnapshot = await getDocs(topQuery)
            if(!debateSnapshot.empty){
              let predebateList = []
              debateSnapshot.forEach(e => {
                predebateList.push({
                  ...e.data(),
                  userInfo: props.userInfo
                })
              })

              //SnapStore更新処理
              const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
              tempList.push(lastVisible)
              setSnapStore(tempList)
            
              setDebateList(predebateList)
            }else{
              tempList.push("No Document")
              setSnapStore(tempList)
              setDebateList(['notDebate'])
            }
            
          }else{
  
            const catQuery = query(debateRef,where('category','==',category),orderBy(mode,"desc"),startAfter(lastRef),limit(5))
            const debateSnapshot = await getDocs(catQuery)
            if(!debateSnapshot.empty){
              let predebateList = []
              debateSnapshot.forEach(e => {
                predebateList.push({
                  ...e.data(),
                  userInfo: props.userInfo
                })
              })

              //SnapStore更新処理
              const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
              tempList.push(lastVisible)
              setSnapStore(tempList)
            
              setDebateList(predebateList)
            }else{
              tempList.push("No Document")
              setSnapStore(tempList)
              setDebateList(['notDebate'])
            }
  
          }
  
        }
        else{
          //-------------------------------------------------------------------------
          //---議論中表示-------------------------------------------------------------
          if(category === "トップ"){
            const topQuery = query(debateRef,where("status","==",type),orderBy(mode,"desc"),startAfter(lastRef),limit(5))
            const debateSnapshot = await getDocs(topQuery)
            if(!debateSnapshot.empty){
              let predebateList = []
              debateSnapshot.forEach(e => {
                predebateList.push({
                  ...e.data(),
                  userInfo: props.userInfo
                })
              })

              //SnapStore更新処理
              const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
              tempList.push(lastVisible)
              setSnapStore(tempList)
            
              setDebateList(predebateList)
            }else{
              tempList.push("No Document")
              setSnapStore(tempList)
              setDebateList(['notDebate'])
            }
            
          }else{
  
            const catQuery = query(debateRef,where("status","==",type),where('category','==',category),orderBy(mode,"desc"),startAfter(lastRef),limit(5))
            const debateSnapshot = await getDocs(catQuery)
            if(!debateSnapshot.empty){
              let predebateList = []
              debateSnapshot.forEach(e => {
                predebateList.push({
                  ...e.data(),
                  userInfo: props.userInfo
                })
              })

              //SnapStore更新処理
              const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
              tempList.push(lastVisible)
              setSnapStore(tempList)
            
              setDebateList(predebateList)
            }else{
              tempList.push("No Document")
              setSnapStore(tempList)
              setDebateList(['notDebate'])
            }
  
          }
  
        }

        setPage(page + 1)
      }catch(e){
        alert('エラーが発生しました。もう一度読み込んでください。')
        console.log(e)
      }
    

      }

      setNextFlag(false)
    }
  })()},[nextFlag])


  const onNext = () => {
    setNextFlag(true)
    setShowFlag(false)

    topRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    //props.scrollFun()
  }


  ///////////////////////////////////////////////////////////////////////////
  /////次へ処理おわり///////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  /////前へ処理はじめ///////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if(prevFlag === true){
      //===debateStore処理=====================================================
      let tempList = debateStore
      let prePrevList = tempList.pop()
      setDebateStore(tempList)
      setDebateList(prePrevList)

      //===snapStore処理========================================================
      let snapList = snapStore
      snapList.pop()

      setSnapStore(snapList)


      setPage(page -1)
      setPrevFlag(false)
    }
  },[prevFlag])

  const onPrev = () => {
    setPrevFlag(true)
    setShowFlag(false)
  }

  ///////////////////////////////////////////////////////////////////////////
  /////前へ処理おわり///////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////
  /////議論表示処理はじめ///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  //------------------------------------------------------------------------
  //---新着表示------------------------------------------------------------

  useEffect(() => {
    if(debateList !== null){
      setShowFlag(true)
    }
    if(debateList === null){
      setShowFlag(false)
    }

  },[debateList])

  ///////////////////////////////////////////////////////////////////////////
  /////議論表示処理おわり///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////



  return (
    <SBelt>
      {page !== 1 && <PrevBtn fun={onPrev}/>}
      <div ref={topRef}></div>
      {showFlag ? (
        debateList[0] === 'notDebate' ? (
          <SPleaseWait>議論がありません。</SPleaseWait>
        ) : (
          debateList.map((e) => (
            <DebateBox 
              key={e.id}
              contents={e}
            />
          ))
        )
      ) : <SPleaseWait>しばらくお待ちください。</SPleaseWait>
      }
      {showFlag === true && 
        debateList.length === 5 && <NextBtn fun={onNext}/>
      } 
    </SBelt>
  )
};

const SPleaseWait = styled.div`
    height: 240px;
    text-align: center;
`;


const SBelt = styled.div`
  padding:10px 0px 10px 100px;
  display: flex;
  column-gap: 30px;
  @media (max-width: 1400px) {
    column-gap: 10px;
  }
  @media (max-width: 480px) {
    display: block;
    padding:10px 0px 10px 0px;
  }
`;

export default DebateBoxBelt;