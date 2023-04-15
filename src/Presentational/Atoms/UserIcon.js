import React from "react";
import styled from 'styled-components';
import user_icon_basic from "../../assets/images/UserIcons/user_icon_basic.svg";

const UserIcon = () => {

  return (
    <SUserIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" />
      </svg>
    </SUserIcon>
  )
};

const SUserIcon = styled.svg`
  
height: 40px;
width: 40px;

margin-top: 7px;
margin-left: 10px;

color: orange;
`;

export default UserIcon;