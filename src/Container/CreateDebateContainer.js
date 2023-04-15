import React,{ useContext, useEffect, useState }from "react";
import styled from 'styled-components';
import { baseColor } from "../assets/styles/BaseColor";
import { getNowDate} from "../Helpers/DateOperation";
import { setNL } from "../Helpers/NewLine";
import CommonBtn from "../Presentational/Atoms/CommonBtn";
import { expToRank } from "../Helpers/RankOperation";
import CreateDebateInputForm from "../Presentational/Organisms/CreateDebateInputForm";
import CreateDebateConfirm from "../Presentational/Organisms/CreateDebateConfirm";

//firebase import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, doc,writeBatch, serverTimestamp} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";



const CreateDebateContainer = (props) => {


  //react-router
  const navigate = useNavigate();
  //firebase設定
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();

  //現在時刻の取得
  const nowMD = getNowDate(new Date(),"md");

  //state設定
  const [display,setDisplay] = useState(1);
  const [userT,setUserT] = useState([])
  const [contents, setContents] = useState({
    title:"",
    body:"",
    positionA:"",
    positionB:"",
    positionC:"",
    positionD:"",
    category:"政治",
    tag1:"",
    tag2:"",
    tag3:"",
    tag4:"",
    reference:"",
  });


  useEffect(() => {
    if(props.userInfo){

      if(props.userInfo.uid === "NL"){
        navigate('/login')
      }
      
      setUserT({
        ...props.userInfo
      })
    }


    
  },[])


  const saveData = (
    Ititle,
    Ibody,
    IpositionA,
    IpositionB,
    IpositionC,
    IpositionD,
    IstartTime,
    IfinishTime,
    IendTime,
    Icategory,
    Itag1,
    Itag2,
    Itag3,
    Itag4,
    Ireference,

    ) => {
    setContents(
      {
        title:Ititle,
        body:Ibody,
        positionA:IpositionA,
        positionB:IpositionB,
        positionC:IpositionC,
        positionD:IpositionD,
        startTime:IstartTime,
        finishTime:IfinishTime,
        endTime:IendTime,
        category:Icategory,
        tag1:Itag1,
        tag2:Itag2,
        tag3:Itag3,
        tag4:Itag4,
        reference:Ireference,
        hostName:userT.name,
        hostRank:userT.rank,
        hostId:userT.uid,
        joinAble:true,
        status:0,
        participant_sum:1,
        opinion_sum:1,
        mvpList:[],
        joinLimit:9999
      }
      ) };

    const changeDisplay = (num) =>{
      setDisplay(num);
    }

    const postAgenda = async (data,position) => {

      try{
        const batch = writeBatch(db);
        
        const debateRef = collection(db,"debate")
        const debateId = doc(debateRef).id
        batch.set(doc(debateRef,debateId),{
          did:debateId,
          title:contents.title,
          body:contents.body,
          positionA:contents.positionA,
          positionB:contents.positionB,
          positionC:contents.positionC,
          positionD:contents.positionD,
          startTime:contents.startTime,
          finishTime:contents.finishTime,
          endTime:contents.endTime,
          category:contents.category,
          tag1:contents.tag1,
          tag2:contents.tag2,
          tag3:contents.tag3,
          tag4:contents.tag4,
          reference:contents.reference,
          status:contents.status,
          opinion_sum:contents.opinion_sum,
          participant_sum:contents.participant_sum,
          mvpList:contents.mvpList,
          hostId:contents.hostId,
          hostName:contents.hostName,
          hostRank:contents.hostRank,
          joinLimit:contents.joinLimit,
          joinAble:contents.joinAble,
          createdAt: serverTimestamp()
        })

        const participantRef = collection(debateRef,debateId,"participant")
        const participantId = doc(participantRef).id
        batch.set(doc(participantRef,participantId),
        {
          did:debateId,
          pid:participantId,
          uid:userT.uid,
          join:true,
          name: userT.name,
          rank: userT.rank,
          position: position,
          policy : setNL(data.policy),
          good: 0,
          bad: 0,
          vote:0,
          mvpPoint:0,
          convert: 0,
          convertSelf: 0,
          joinAt: serverTimestamp()
        })

        const opinionRef = collection(debateRef,debateId,"opinion")
        const opinionId = doc(opinionRef).id
        batch.set(doc(opinionRef,opinionId),
         {
          did:debateId,
          id: 1,
          oid:opinionId,
          body: setNL(data.opinion),

          uid:userT.uid,
          pid:participantId,
          name:userT.name,
          rank:userT.rank,
          position:position,
          policy:setNL(data.policy),
          
          to_reply:null,
          replyName:null,
          replyBody:null,

          good:0,
          bad:0,
          convert:0,
          createdAt:serverTimestamp()
        })

        const madeRef = collection(db,'users',userT.uid,'made')
        const madeId = doc(madeRef).id
        batch.set(doc(madeRef,madeId),
          {

            did:debateId,
            title: contents.title,
            body: contents.body,
            positionA: contents.positionA,
            positionB: contents.positionB,
            positionC: contents.positionC,
            positionD: contents.positionD,
            startTime: contents.startTime,
            finishTime: contents.finishTime,
            endTime: contents.endTime,
            category: contents.category,
            tag1: contents.tag1,
            tag2: contents.tag2,
            tag3: contents.tag3,
            tag4: contents.tag4,
            reference: contents.reference,
            hostName: userT.name,
            hostRank: userT.rank,
            hostId: userT.uid,
            createdAt: serverTimestamp()
            
          }
        )
        const joinRef = collection(db,'users',userT.uid,'join')
        const joinId = doc(joinRef).id
        batch.set(doc(joinRef,joinId),
          {
            did:debateId,
            pid: participantId,
            title:contents.title,
            startTime:contents.startTime,
            finishTime:contents.finishTime,
            endTime:contents.endTime,
            category:contents.category,
            hostName:userT.name,
            hostRank:userT.rank,
            hostId:userT.uid,

            policy : setNL(data.policy),
            position: position,

            settle:true,
            joinAt:serverTimestamp()
          }
        )

        const good_badRef = collection(debateRef,debateId,"good_bad");
        const good_badDoc = doc(good_badRef);
        const good_badId = good_badDoc.id;

        batch.set(good_badDoc, {
          did: debateId,
          gbid: good_badId,
          uid: userT.uid,
          to_good: [],
          to_bad: [],
          voteAble: true
        });

        await batch.commit()

        console.log("Sucsess");
        navigate('/navi?parm=Smade')

      }catch(e){
        console.log("Transaction failed: ", e);
        navigate('/navi?parm=Fmade')
      }
    }


  return(
    <>
    {display === 1 &&
      <CreateDebateInputForm 
        preContents={contents}
        saveInputContents={saveData}
        displayFun={changeDisplay}
      />
    }
    {display === 2 &&
      <CreateDebateConfirm 
        userInfo={userT}
        agendaContents={contents}
        displayFun={changeDisplay}
        lastFun={postAgenda}
      />
    }

    </>
  );
};


export default CreateDebateContainer;