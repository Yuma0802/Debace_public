import styled from 'styled-components';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ExpBox = (props) => {

  const [gap, setGap] = useState(null)

  useEffect(() => {
    if(props.exp < 1){
      setGap(1)
      return;
    }else if (props.exp < 30){
      setGap(30 - Number(props.exp))
      return;
    }else if (props.exp < 100){
      setGap(100 - Number(props.exp))
      return;
    }else if (props.exp < 200){
      setGap(200 - Number(props.exp))
      return;
    }else if (props.exp < 350){
      setGap(350 - Number(props.exp))
      return;
    }else if (props.exp < 550){
      setGap(550 - Number(props.exp))
      return;
    }else if (props.exp < 850){
      setGap(850 - Number(props.exp))
      return;
    }else if (props.exp < 1300){
      setGap(1300 - Number(props.exp))
      return;
    }else if (props.exp < 2000){
      setGap(2000 - Number(props.exp))
      return;
    }else if (props.exp < 3000){
      setGap(3000 - Number(props.exp))
      return;
    }else if (props.exp < 5000){
      setGap(5000 - Number(props.exp))
      return;
    }else{
      setGap('???')
      return
    }
  },[])

  return (
    <SExpBox>
      <SExpBoxPt>{`${props.exp}pt`}</SExpBoxPt>
       <SExpBoxNextPt>{`次のランクまで${gap}pt`}</SExpBoxNextPt>
    </SExpBox>
  );
};

const SExpBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 480px) {
    margin-left: 20px;
  }
`;

const SExpBoxPt = styled.p`
  font-size: 30px;
`;

const SExpBoxNextPt = styled.p`
  font-size: 15px;
  white-space: nowrap;
  width: 100%;
  @media (max-width: 480px) {
    white-space: normal;
    display: flex;
    
  }
`;

export default ExpBox;
