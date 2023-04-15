import React from "react";
import styled from 'styled-components';

const UserName = (props) => {

  return(
    <SUserName>{props.name}</SUserName>
  );
};

const SUserName = styled.div`
  font-family: 'MS Mincho';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: -0.02em;

  color: #5A5A5A;
`;

export default UserName;