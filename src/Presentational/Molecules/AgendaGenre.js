import React from "react";
import styled from 'styled-components';
import CommonInfo from "../Atoms/CommonInfo";

const AgendaGenre = (props) => {

  return(
    <CommonInfo 
      type="ジャンル"
      contents={props.category}
      color={true}
    />
  )
};

export default AgendaGenre;