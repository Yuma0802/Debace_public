import React from "react";
import styled from 'styled-components';
import { baseColor } from "../../assets/styles/BaseColor";
import UserNameSet from "./UserNameSet";

const MvpPannel = (props) => {

  return (
    <SPannelWrap>
      <SPannel>
        <TMvp>最も優秀な議論をしたプレイヤー</TMvp>
        <PlayerField>
          { props.userList.length > 0 && (
            props.userList.map((e) => (
              <UserNameSet
                key={e.uid}
                name={e.name}
                id={e.uid}
                rank={e.rank}
              />
            ))
          ) 

          }
        </PlayerField>
      </SPannel>
    </SPannelWrap>
  )
};


const SPannelWrap = styled.div`
  width: 80%;
  padding: 10px;

  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  background: #f5f5f5;
`

const SPannel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  column-gap: 5px;
  border: 2px solid ${baseColor};

`
const TMvp = styled.p`
  margin: 0px;
  padding: 10px;

`

const PlayerField = styled.div`
  display: flex;
  padding-bottom: 10px;
  flex-direction: column;
  align-items: center;
  column-gap: 5px;
  cursor: pointer;
`

export default MvpPannel;