import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { baseColor } from '../assets/styles/BaseColor';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

//firebase import
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, query, getDocs, orderBy, limit} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

import SelectBox from '../Presentational/Atoms/SelectBox';
import DebateLink from '../Presentational/Atoms/DebateLink';
import Footer from '../Presentational/Organisms/Footer';
import Loader from '../Presentational/Atoms/Loader';
import { expToClass} from '../Helpers/RankOperation';
import MultiBody from '../Helpers/MultiBody';
import ExpBox from '../Presentational/Atoms/ExpBox';


const MyPage = (props) => {
    //react-router
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    //firebase設定
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app);

    //userId
    const userId = searchParams.get('uid')

    //フラグ
    const [showFlag, setShowFlag] = useState()

    //state
    const [userT, setUserT] = useState()
    const [made, setMade] = useState()
    const [join, setJoin] = useState()



    useEffect(() => {
        (async () => {

            try {

                if (!userId) {
                    navigate('/navi?parm=noUser')
                } else {

                    const userRef = doc(db, "users", userId)

                    const infoRef = collection(userRef, 'info')
                    const infoSnapshot = await getDocs(infoRef)

                    if (infoSnapshot.empty) {
                        navigate('/navi?parm=noUser')

                    } else {
                        infoSnapshot.forEach(doc => {
                            setUserT({
                                uid: doc.data().uid,
                                name: doc.data().name,
                                profile: doc.data().profile,
                                exp: doc.data().exp,
                                favCat: doc.data().favCat
                            })

                        })

                        const madeRef = collection(userRef, "made")
                        const madeQuery = query(madeRef, orderBy("createdAt", 'desc'), limit(3))
                        const madeSnapshot = await getDocs(madeQuery)
                        let preMadeList = []

                        if (!madeSnapshot.empty) {
                            madeSnapshot.forEach(e => {
                                preMadeList.push({
                                    did: e.data().did,
                                    title: e.data().title
                                })
                            })

                        } else {
                            preMadeList.push({ did: "ND", title: "ND" })
                        }

                        setMade(preMadeList)

                        const joinRef = collection(userRef, "join")
                        const joinQuery = query(joinRef, orderBy("joinAt"), limit(3))
                        const joinSnapshot = await getDocs(joinQuery)
                        let preJoinList = []

                        if (!joinSnapshot.empty) {
                            joinSnapshot.forEach(e => {
                                preJoinList.push({
                                    did: e.data().did,
                                    title: e.data().title
                                })
                            })

                        } else {
                            preJoinList.push({ did: "ND", title: "ND" })
                        }

                        setJoin(preJoinList)

                    }

                }


            } catch (e) {
                alert('エラーが発生しました。もう一度読み込んでください。')
                console.log(e)
            }


        })()
    }, [])

    useEffect(() => {
        if (userT) {
            if (made) {
                if (join) {
                    setShowFlag(true)
                }
            }
        }

    }, [userT, made, join])


    const selectFun = async (val) => {

        if (val === "マイページ") {
            navigate(`/mypage?uid=${userId}`)
        }
        if (val === "お気に入り") {
            if (userT.uid === userId) {
                navigate('/favorite')
            }
        }
        if (val === "作成議論") {
            navigate(`/madepage?uid=${userId}`)
        }
        if (val === "参加議論") {
            navigate(`/joinpage?uid=${userId}`)
        }
        if (val === "ログアウト") {
            if (window.confirm("ログアウトしますか？")) {
                const auth = getAuth();
                signOut(auth)
                    .then(() => {
                        // ログアウト成功時の処理
                        navigate('/navi?parm=logout')
                    })
                    .catch((error) => {
                        // ログアウト失敗時の処理
                        console.log(error);
                    });
            }
        }
    }


    return (
        <>

            <SWrap>
                <SSelectBoxWrap>
                    <SelectBox categoryFun={selectFun}>マイページ</SelectBox>
                    {
                        props.userInfo.uid === userId && <SelectBox categoryFun={selectFun}>お気に入り</SelectBox>
                    }
                    <SelectBox categoryFun={selectFun}>作成議論</SelectBox>
                    <SelectBox categoryFun={selectFun}>参加議論</SelectBox>
                    {
                        props.userInfo.uid === userId && <SelectBox categoryFun={selectFun}>ログアウト</SelectBox>
                    }
                </SSelectBoxWrap>

                <SFlex>
                    {
                        showFlag ? (
                            <SProfileTextWrap>
                                <STopWrap>
                                        <SId>{`ID:${userId}`}</SId>
                                    <SFavCatRankWrap>
                                        <SName>{userT.name}</SName>
                                        <Rank>{expToClass(userT.exp)}</Rank>
                                    </SFavCatRankWrap>
                                    <SProfileText>
                                        <MultiBody>
                                            {userT.profile}
                                        </MultiBody>
                                    </SProfileText>
                                    <SLinkWrap>
                                        {
                                            props.userInfo.uid === userT.uid && <Link to="/accountedit">編集</Link>
                                        }
                                    </SLinkWrap>

                                </STopWrap>

                                <SInfo>



                                    <SFavCatWrap >
                                        <SInfoTitle>お気に入りジャンル</SInfoTitle>
                                        {
                                            userT.favCat !== '' ? (
                                                <SfavCat>{userT.favCat}</SfavCat>
                                            ) : (<SfavCat>未登録</SfavCat>)

                                        }
                                    </SFavCatWrap>

                                    <SMade >
                                        <SInfoTitle>作成議題</SInfoTitle>
                                        <SDebateField>
                                            {
                                                made[0].did !== "ND" && (
                                                    made.map((e) => (
                                                        <DebateLink text={e.title} did={e.did} />
                                                    ))
                                                )
                                            }
                                        </SDebateField>
                                    </SMade>

                                    <SMade >
                                        <SInfoTitle>直近参加議題</SInfoTitle>
                                        <SDebateField>
                                            {
                                                join[0].did !== "ND" && (
                                                    join.map((e) => (
                                                        <DebateLink text={e.title} did={e.did} />
                                                    ))
                                                )
                                            }
                                        </SDebateField>
                                    </SMade>

                                </SInfo>

                                <SStatistics>
                                    <SExpWrap >
                                        <SInfoTitle>経験値</SInfoTitle>
                                        <SExpBoxWrap>
                                          <ExpBox 
                                            exp={userT.exp}
                                          />
                                        </SExpBoxWrap>
                                    </SExpWrap >
                                </SStatistics>

                            </SProfileTextWrap>

                        ) : <Loader />
                    }

                </SFlex>

            </SWrap>
            <SFooter>

                <Footer />
            </SFooter>

        </>
    );
}

const SFooter = styled.div`
   display: flex;
flex-flow: column;
min-height: 0vh;
@media (max-width: 480px) {
    width: 100%;
  overflow-x: auto;
  }
`;

const SWrap = styled.div`
    padding: 56px 0px;
    width: 50px;
    
`;
const SSelectBoxWrap = styled.div`
  display: flex;
  overflow-x: auto; 
  height: 32px;
  width: 100vw;
  justify-content: center;
  background-color: #FFA500;
  opacity: 1;
  margin: auto;

  
  @media (max-width: 480px) {
    justify-content: left;
      & > * {
        flex-shrink: 0;
        width: 25%; 
      }
    width: 100vw;
  }
`;



const SFlex = styled.div`
    position: relative;
    display: flex;
    width: 70vw;
    justify-content: center;
    @media (max-width: 1050px) {
    }
`;

const SProfileTextWrap = styled.div`
    margin-top: 60px;
    width: 100%;
    
    @media (max-width: 480px) {
        margin-left: 0;
        width :100vw ;
         margin-top: 20px;
    }
`;


const STopWrap = styled.div`
  padding: 10px 20px 5px 20px;
  border-bottom: 1px solid #C4C4C4;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  
  width: 90%;
  margin-left: 26%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SId = styled.p`
  display: block;
  font-family: 'Norican';
  font-size: 15px;
  /* font-weight: bold; */
  white-space: nowrap; 
  @media (max-width: 480px) {
    font-size: 13px;
    padding-bottom: 0px;
  }
`;
const SName = styled.h3`
  font-family: 'Norican';
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap; 
  @media (max-width: 480px) {
    font-size: 18px;
    padding-bottom: 20px;
  }
`;

const SFavCatRankWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  text-align: center;
  @media (max-width: 480px) {
    display: block;
  }
`;


const SProfileText = styled.p`
    font-size: 15px;
    font-weight: 400;
    font-family: 'Noto Serif JP';
    line-height: 25px;
    color: #222222;
    margin: 0px;
    @media (max-width: 480px) {
    width: 140%;

  }
`;

const SInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 20px;
    
`;

const SInfoTitle = styled.h3`
    font-family: 'Volkhov';
    font-weight: 700;
    font-size: 18px;
    text-align: left;
    margin-left: 40%;
    width: 45%;
    @media (max-width: 480px) {
    padding-bottom: 15px;
    width: 80%;
    text-align: center;
}
`;

const SExpBoxWrap = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50%;
`;

const SfavCat = styled.p`
    
    color: ${baseColor};
    font-size: 18px;
    font-weight: 500;
    border: 2px solid ${baseColor};
    padding: 1px 8px;
    border-radius: 10px;
    &:hover{
        cursor: pointer;
    }
    @media (max-width: 480px) {
    text-align: center;
    width: 65%;
    margin-left: 48%;
}
`;
const Rank = styled.p`
    
    color: ${baseColor};
    font-size: 18px;
    font-weight: 500;
    border: 2px solid ${baseColor};
    padding: 1px 8px;
    border-radius: 5px;
    white-space: nowrap;
    
    &:hover{
        cursor: pointer;

    }
    margin-left: 5%;
    @media (max-width: 480px) {
    margin-top: auto;
}
`;

const SStatistics = styled.div`
    padding-top: 20px;
    padding-left: 20px;
`;

const SFavCatWrap = styled.div`
    display: flex;
    @media (max-width: 480px) {
        display: block;
    }
`;

const SMade = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: 480px) {
    display: block;
    }
`;

const SDebateField = styled.div`
  display: flex;
  flex-flow: column;
  width: 30vw;
  row-gap: 20px;

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    margin-left: 30%;
  }
`;

const SExpWrap = styled.div`
  margin: 80px 0 100px 0;
  @media (max-width: 480px) {
    width: 90%;
    
  }
`;

const SLinkWrap = styled.div`
  display: flex;
  justify-content: flex-end; 
  text-align: left;
  margin-left: 90%;
  
  @media (max-width: 480px) {
    white-space: nowrap;
    margin-left: 110%;
  }

`;



export default MyPage;