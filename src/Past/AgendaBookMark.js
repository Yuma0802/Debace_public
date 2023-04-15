import React from "react";
import styled from 'styled-components';
import bookMarkLogo from '../../assets/images/bookmark.svg'

const AgendaBookMark = () => {

  return (
    <SBookMarkLogo />
  )
};

const SBookMarkLogo = styled.img.attrs({
  src: `${bookMarkLogo}`,
  alt: 'ブックマーク'
})`
  width: 24px;
  height: 24px;
  padding: 0px 2px;
  
  &:hover {
    cursor: pointer;
  }
`;


export default AgendaBookMark;