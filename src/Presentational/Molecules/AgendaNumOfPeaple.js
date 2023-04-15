import React from "react";
import styled from 'styled-components';
import peopleIcon from "../../assets/images/number_of_people.svg";
import CommonInfo from "../Atoms/CommonInfo";

const AgendaNumOfPeople = (props) => {

  return(
    <SNOPWrap>
      <SNOPIcon />
      <CommonInfo 
        type="参加人数"
        contents={`${props.num}人`}
      />
    </SNOPWrap>
  );
};


const SNOPWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const SNOPIcon = styled.img.attrs({
  src: `${peopleIcon}`,
  alt: '人数'
})`
  width: 24px;
  height: 21px;
  padding: 0px 2px;
  
`;

export default AgendaNumOfPeople;