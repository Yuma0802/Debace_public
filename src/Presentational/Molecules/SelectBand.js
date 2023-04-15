import React from "react";
import styled from 'styled-components';
import SelectBox from "../Atoms/SelectBox";

const SelectBand = () => {
  

  return(
    <SSelectBand>
      <SelectBox>トップ</SelectBox>
      <SelectBox>政治</SelectBox>
      <SelectBox>経済</SelectBox>
      <SelectBox>社会問題</SelectBox>
      <SelectBox>テクノロジー</SelectBox>
      <SelectBox>歴史</SelectBox>
      <SelectBox>学問</SelectBox>
      <SelectBox>エンタメ</SelectBox>
      <SelectBox>生活</SelectBox>
      <SelectBox>その他</SelectBox>
    </SSelectBand>
  );
};

const SSelectBand = styled.div`
  display: block;
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #FFA500;
  opacity: 0.7;
`;


export default SelectBand;