import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import LetterBtn from "../Atoms/LetterBtn";

const MenuBlock = (props) => {
  //react-router
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const closeMenu = () => {
    setShowMenu(false);
  }

  useEffect(() => {
    setShowMenu(false); // 初期値を非表示に設定する
  }, []);

  //page遷移関数
  const toAbout = () => {
    closeMenu();
    navigate('/about')
  }
  const toHowtoUse = () => {
    closeMenu();
    navigate('/about')
  }
  const toContact = () => {
    closeMenu();
    navigate('/contact')
  }

  const toAcc = () => {
    console.log(props.userInfo.uid)
    if(props.userInfo.uid === "NL"){
      closeMenu();
      navigate('/login')
    }else{
      closeMenu();
      navigate(`mypage?uid=${props.userInfo.uid}`)
    }
  }
  

  return (
    <>
      {/* ハンバーガーメニュー */}
      <SHamburgerMenu onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </SHamburgerMenu>

      {/* メニューリスト */}
      <SMenuBlockWrap showMenu={showMenu}>
        <SPopup showMenu={showMenu}>
          <LetterBtn textAlignLeft setFun={toAbout}>Debaceとは</LetterBtn>
          {/* <LetterBtn textAlignLeft setFun={toHowtoUse}>使い方</LetterBtn> */}
          <LetterBtn textAlignLeft setFun={toContact}>お問い合わせ</LetterBtn>
          <LetterBtn textAlignLeft setFun={toAcc}>
            {props.userInfo.uid === "NL" ? "ログイン/会員登録":"My Page"}
          </LetterBtn>
        </SPopup>
      </SMenuBlockWrap>
    </>
  )
};

const SHamburgerMenu = styled.div`
  display: none; /* デフォルト非表示 */
  cursor: pointer;

  div {
    width: 30px;
    height: 4px;
    margin: 5px;
    margin-right: 10px;
    background-color: black;
  }

  /* max-width: 480pxの時に表示 */
  @media screen and (max-width: 480px) {
    display: block;
  }
`;

const SMenuBlockWrap = styled.div`
  /* max-width: 480pxの時に下にスライド */
  @media screen and (max-width: 480px) {
    position: absolute;
    top: 50px; /* ハンバーガーメニューの下に位置 */
    right: 0px;
    width: 35%;
    height: ${({ showMenu }) => showMenu ? 'calc(100vh - 170px)' : '0'};
  }
`;

const SPopup = styled.div`
  /* max-width: 480pxの時に表示 */
  @media screen and (max-width: 480px) {
    display: ${({ showMenu }) => showMenu ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    border: solid 1px;
    position: absolute;
    width: 100%;
    transition: none;
    margin-top: 11px;
    left: -10px;
    z-index: 999; /* 追加 */
  }
`;




export default MenuBlock;
