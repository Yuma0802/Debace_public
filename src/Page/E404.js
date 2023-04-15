import React from "react";
import styled from 'styled-components';
import AlertBox from "../Presentational/Organisms/AlertBox";

const E404 = () => {

  return (
    <SWrap>
      <AlertBox
        parm="404"
      />
    </SWrap>
  )
};

const SWrap = styled.div`
  
`

export default E404;