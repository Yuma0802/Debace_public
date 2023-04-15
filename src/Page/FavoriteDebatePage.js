import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DebateRectangle from "../Presentational/Organisms/DebateRectangle";
import Footer from "../Presentational/Organisms/Footer";
import Loader from '../Presentational/Atoms/Loader';

//firebase import
import { initializeApp } from "firebase/app";
import { getFirestore,collection, doc, query, where, getDoc, getDocs, addDoc, updateDoc, runTransaction,writeBatch, serverTimestamp, orderBy,increment, limit, arrayUnion, startAfter, endAt} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { useNavigate, useSearchParams } from 'react-router-dom';
import SelectBox from '../Presentational/Atoms/SelectBox';
import DummyRectangle from '../Presentational/Atoms/DummyRectangle';




const FavoriteDebatePage = (props) => {
  //react-router
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  //ページ
  const [page,setPage] = useState(1)

  //フラグ
  const [showFlag,setShowFlag] = useState(false)
  const [notFlag,setNotFlag] = useState(false)
  const [nextFlag,setNextFlag] = useState(false)
  const [prevFlag,setPrevFlag] = useState(false)
  const [inNotFlag,setInNotFlag] = useState(false)

  //リロード
  const [reloadTriger,setReloadTriger] = useState(false)
  const [reloadFlag,setReloadFlag] = useState(false)

  //state
  const [userT,setUserT] = useState()
  const [dCount,setDCount] =useState(0)

  const [debateList,setDebateList] = useState([])

  //ディベート保存
  const [debateStore,setDebateStore] = useState([])

  //querySnapshot保存
  const [snapStore,setSnapStore] = useState(null)

  
  
  
  useEffect(() => {
    if(props.userInfo){
      if(props.userInfo.uid === "NL"){
        navigate('/navi?parm=toLogin')
        return
      }else{
        setUserT({...props.userInfo})
      }
      
      setReloadFlag(false)
    }
  },[reloadFlag])


  ///////////////////////////////////////////////////////////////////////////
  /////リロード処理はじめ///////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const reloadFun = () => {
    setReloadTriger(true)
  }

  useEffect(() => {
    if(reloadTriger === true){
      //初期化
      setPage(1)
      setShowFlag(false)
      setNotFlag(false)
      setNextFlag(false)
      setPrevFlag(false)
      setInNotFlag(false)
      setDCount(0)
      setDebateList([])
      setDebateStore([])
      setSnapStore(null)

      //リロード
      setReloadTriger(false)

      //true
      setReloadFlag(true)

    }

  },[reloadTriger])

  ///////////////////////////////////////////////////////////////////////////
  /////リロード処理おわり///////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  
  ///////////////////////////////////////////////////////////////////////////
  /////デフォルト議論取得処理はじめ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  useEffect(() => {(async() => {
    if(userT){
      try{
        let preElementList = []
        let preCount = 0
        const collectionRef = collection(db,'users',userT.uid,'favorite')
        const debateQuery = query(collectionRef,orderBy('createdAt','desc'),limit(10))

        const debateSnapshot = await getDocs(debateQuery)
        if(!debateSnapshot.empty){
          //取得したdebateを配列に格納
          debateSnapshot.forEach(e => {
            preElementList.push(
              <DebateRectangleWrop key={e.data().did}>
                <DebateRectangle 
                  key={e.id}
                  id={e.id}
                  mode='favorite'
                  contents={e.data()}
                  userInfo={userT}
                  reloadFun={reloadFun}
                />
              </DebateRectangleWrop>
            )
            preCount = preCount + 1
          })

          let num = 10 - preElementList.length

          for (let i = 0; i < num; i++){
            preElementList.push(<DummyRectangle />)
          }

          //配列を2×5に整形
          // 2個ずつ1つの配列にまとめる
          const chunkedArray = [];
          for (let i = 0; i < preElementList.length; i += 2) {
            chunkedArray.push(
              <DebateRectangleWrapper key={i}>
                {preElementList[i]} 
                {preElementList[i + 1]}
              </DebateRectangleWrapper>
            );
          }
          setDebateList(chunkedArray)

          //SnapStore保存処理
          const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
          const preSnapList = []
          preSnapList.push(lastVisible)
          setSnapStore(preSnapList)
          setDCount(preCount)

        }else{
          for (let i = 0; i < 10; i++){
            preElementList.push(<DummyRectangle />)
          }

          const chunkedArray = [];
          for (let i = 0; i < preElementList.length; i += 2) {
            chunkedArray.push(
              <DebateRectangleWrapper key={i}>
                {preElementList[i]} 
                {preElementList[i + 1]}
              </DebateRectangleWrapper>
            );
          }
          setDebateList(chunkedArray)

          setNotFlag(true)
        }
      }catch(e){
        alert('エラーが発生しました。もう一度読み込んでください。')
      }
    }
  })()},[userT])


  useEffect(() => {
    if(debateList.length > 0 ){
      setShowFlag(true)
    }

    if(debateList[0] === false){
      setInNotFlag(true)
    }
  },[debateList])


  
  ///////////////////////////////////////////////////////////////////////////
  /////デフォルト議論取得処理おわり////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  
  ///////////////////////////////////////////////////////////////////////////
  //////次へ処理はじめ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  const onNext = () => {
    if(dCount === 10){
      setNextFlag(true)
      setShowFlag(false)
    }
  }


  useEffect(() => {(async() => {
    if(nextFlag === true){
      if(dCount === 10){
  
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
  
          let preCount = 0
          let preElementList = []
          const collectionRef = collection(db,'users',userT.uid,'favorite')
          const nextQuery = query(collectionRef,orderBy('createdAt','desc'),startAfter(lastRef),limit(10))
          const debateSnapshot = await getDocs(nextQuery)
  
          if(!debateSnapshot.empty){
            //取得したdebateを配列に格納
            debateSnapshot.forEach(e => {
              preElementList.push(
                <DebateRectangleWrop key={e.data().did}>
                  <DebateRectangle 
                    key={e.id}
                    id={e.id}
                    mode='favorite'
                    contents={e.data()}
                    userInfo={userT}
                    reloadFun={reloadFun}
                  />
                </DebateRectangleWrop>
              )

              preCount = preCount + 1
  
            })

            let num = 10 - preElementList.length

            for (let i = 0; i < num; i++){
              preElementList.push(<DummyRectangle />)
            }
  
            //配列を2×5に整形
            // 2個ずつ1つの配列にまとめる
            const chunkedArray = [];
            for (let i = 0; i < preElementList.length; i += 2) {
              chunkedArray.push(
                <DebateRectangleWrapper key={i}>
                  {preElementList[i]} 
                  {preElementList[i + 1]}
                </DebateRectangleWrapper>
              );
            }
  
            setDebateList(chunkedArray)
            setDCount(preCount)
  
            //SnapStore保存処理
            const lastVisible = debateSnapshot.docs[debateSnapshot.docs.length-1]
            tempList.push(lastVisible)
            setSnapStore(tempList)
  
          }else{

            for (let i = 0; i < 10; i++){
              preElementList.push(<DummyRectangle />)
            }

            const chunkedArray = [];
            for (let i = 0; i < preElementList.length; i += 2) {
              chunkedArray.push(
                <DebateRectangleWrapper key={i}>
                  {preElementList[i]} 
                  {preElementList[i + 1]}
                </DebateRectangleWrapper>
              );
            }
  
            tempList.push("No Document")
            setSnapStore(tempList)
            setDebateList(chunkedArray)
          }
  
          setPage(page + 1)
        }catch(e){
          alert('エラーが発生しました。やり直してください。')
          console.log(e)
        }
  
        setNextFlag(false)
  
      }
    }

  })()},[nextFlag])


  ///////////////////////////////////////////////////////////////////////////
  /////前へ処理はじめ///////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const onPrev = () => {
    if(page > 1){
      setPrevFlag(true)
      setShowFlag(false)
      setInNotFlag(false)
    }
  }

  useEffect(() => {
    if(prevFlag === true){
      try{
        //===debateStore処理=====================================================
        let tempList = debateStore
        
        let prePrevList = tempList.pop()

        setDebateList(prePrevList)
        setDebateStore(tempList)

        //===snapStore処理========================================================
        let snapList = snapStore
        snapList.pop()

        setSnapStore(snapList)


        setDCount(10)
        setPage(page -1)
        setPrevFlag(false)
      }catch(e){
       alert('エラーが発生しました。やり直してください。') 
      }
    }
  },[prevFlag])


  ///////////////////////////////////////////////////////////////////////////
  /////前へ処理おわり///////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////


  const selectFun = (val) => {

    if(val === "マイページ"){
      navigate(`/mypage?uid=${props.userInfo.uid}`)
    }
    if(val === "お気に入り"){
      return
    }
    if(val === "作成議論"){
      navigate(`/madepage?uid=${props.userInfo.uid}`)
    }
    if(val === "参加議論"){
      navigate(`/joinpage?uid=${props.userInfo.uid}`)
    }

  }




  return (
    <>
      <SFavoriteDebatePageWrap>

      <SSelectBoxWrap>
        <SelectBox categoryFun={selectFun}>マイページ</SelectBox>
        <SelectBox categoryFun={selectFun}>お気に入り</SelectBox>
        <SelectBox categoryFun={selectFun}>作成議論</SelectBox>
        <SelectBox categoryFun={selectFun}>参加議論</SelectBox>   
      </SSelectBoxWrap>


        <SFavoriteDebateTitle>お気に入り議論</SFavoriteDebateTitle>

        {
              <>
              {


                <DebateRectangleAllWrapper>
                  {
                    showFlag ? (
                      <>
                        {debateList.map((e) => (
                          e
                        ))}
                      </>
                    ):<Loader />
                  }
                </DebateRectangleAllWrapper>

              }

              <SFavoriteDebatePageIcon>
                
           
              </SFavoriteDebatePageIcon>
              <BBackNextBtnWrap>
                <BBackBtn onClick={onPrev}>前へ</BBackBtn>
                <BNextBtn onClick={onNext}>次へ</BNextBtn>
              </BBackNextBtnWrap>
            </>
        }
    </SFavoriteDebatePageWrap>

    <SFooter>

            <Footer />
            </SFooter>
    </>
  );
};


const SFooter = styled.div`


`;

const SFavoriteDebatePageWrap = styled.div`
  text-align: center;
  height: 1050px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 480px) {
    height: 2100px;
    
  }
`;

const DebateRectangleAllWrapper = styled.div`
  margin-top: 0px;
  margin-bottom: 20px;
  
  justify-content: space-between;

  
  @media (max-width: 480px) {
    padding: 0 90px;
    
  }
  @media (max-width: 470px) {
    padding: 0 86px;
    
  }
  @media (max-width: 460px) {
    padding: 0 82px;
    
  }
  @media (max-width: 450px) {
    padding: 0 78px;
    
  }
  @media (max-width: 440px) {
    padding: 0 74px;
    
  }
  @media (max-width: 435px) {
    padding: 0 72px;
    
  }
  @media (max-width: 430px) {
    padding: 0 70px;
    
  }
  @media (max-width: 425px) {
    padding: 0 68px;
    
  }
  @media (max-width: 420px) {
    padding: 0 66px;
    
  }
  @media (max-width: 415px) {
    padding: 0 64px;
    
  }
  @media (max-width: 410px) {
    padding: 0 62px;
    
  }
  @media (max-width: 405px) {
    padding: 0 60px;
    
  }
  @media (max-width: 400px) {
    padding: 0 58px;
    
  }
  @media (max-width: 395px) {
    padding: 0 56px;
    
  }
  @media (max-width: 390px) {
    padding: 0 50px;
    
  }
  @media (max-width: 370px) {
    padding: 0 35px;
    
  }
  @media (max-width: 350px) {
    padding: 0 20px;
    
  }
`;



const DebateRectangleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-left: 100px;
  @media (max-width: 1080px) {
    margin-left: 0px;
  }
  @media (max-width: 480px) {
    display: block;
    margin-left: 0;
  }
`;

const DebateRectangleWrop = styled.div`
  margin-right: 100px;
  @media (max-width: 1080px) {
    margin-right: 30px;
  }
  @media (max-width: 480px) {
    margin-right: 0px;
    margin-bottom: 30px;
  }
`;

const SFavoriteDebateTitle = styled.h1`
  text-align: center;
  margin-bottom: 65px;
`;

const SFavoriteDebatePageIcon= styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: 480px) {
    margin-top: 0px;
    padding-bottom: 30px;
  }
`;

const BBackNextBtnWrap = styled.div`
   display: flex;
  justify-content: space-around;
  column-gap: 10%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 50px;
  font-size: 22px;
  @media (max-width: 480px) {
   /* font-size: 15px; */
    
  }
`;

const BBackBtn = styled.div`
  color: #f5f5f5;
  background-color: #ffa500;
  height: 40px;
  width: 100px;
  text-align: center;
  padding-top: 4px;
  opacity: 0.8;
  border-radius: 5px;
  /* font-weight: bold; */
  &:hover {
      cursor: pointer;
      opacity: 1;
    }
`;

const BNextBtn = styled.div`
  color: #f5f5f5;
  background-color: #ffa500;
  height: 40px;
  width: 100px;
  text-align: center;
  padding-top: 4px;
  opacity: 0.8;
  border-radius: 5px;
  /* font-weight: bold; */
  &:hover {
      cursor: pointer;
      opacity: 1;
    }
`;


const FooterWrapper = styled.div`
  /* margin-top: auto; */
`;

//セレクトボックスラップ
const SSelectBoxWrap = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  background-color: #FFA500;
  opacity: 1;
  margin-top: 55px;
  @media (max-width: 480px) {
  
  }
`;

export default FavoriteDebatePage;


