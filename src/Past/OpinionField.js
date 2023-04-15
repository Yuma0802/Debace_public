import React from "react";
import styled from 'styled-components';
import Opinion from "../Presentational/Organisms/Opinion";
import Speech from "./Speech";

const OpinionField = (props) => {
  

  return(
    <>
      {
        props.data.forrach((e) => (
          <Opinion 
            key={e.key}
            contents={e}          
          />
        ))
      }
    </>
  )
}

export default OpinionField;