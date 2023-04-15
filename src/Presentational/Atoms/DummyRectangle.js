import React from "react";
import styled from 'styled-components';




const DummyRectangle = (props) => {

  return (
    <SSavepostWrap>

    </SSavepostWrap>
  );
};



const SSavepostWrap = styled.div`
  //opacity: 0;
  max-width: 480px;
  width: 450px;
  height: 85px;
  
  border: 1px solid #fff;
  margin-right: 100px;
  @media (max-width: 950px) {
    height: 130px;
    width: 300px;
  }

`;





export default DummyRectangle;