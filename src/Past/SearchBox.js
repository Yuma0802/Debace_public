import styled from "styled-components";

const SearchBox = () => {

  return(
    <SSearchBoxWrap>

      <SSearchBox />
      <SSearchBtn >検索</SSearchBtn>

    </SSearchBoxWrap>
  )
};

const SSearchBoxWrap = styled.form.attrs({
  
})`
  text-align: center;
  padding: 25px;
`;

const SSearchBox = styled.input.attrs({
  placeholder:'タグやキーワードを入力'
})`
  height: 29px;
  width: 350px;
  /* text-align: center; */
  padding-left: 20px;
  border-radius: 0px;
  background: rgba(252, 252, 252, 0.73);
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  /* box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.25); */
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
`;

const SSearchBtn = styled.button`
  background-color: #FFA500;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  

  width: 100px;
  height: 30px;
`;

export default SearchBox;