import styled from "styled-components";


const CatchCopyMobile = () => {

  return(
    // <SCatchCopyBlock>
      <SCatchCopyMobile>ここはネット上で建設的な議論をする為のSNS</SCatchCopyMobile>
    // </SCatchCopyBlock>
  )
}

const SCatchCopyMobile = styled.h1`
  display: none;
  
  @media screen and (max-width: 480px) {
    padding-top: 40px;
    padding-bottom: 40px;
    display: block;
    text-align: center;
    line-height: 70px;
    font-size: 30px;
    font-family: MS PMincho;
    font-weight: bold;
    margin: 0 auto; /* 中央寄せのために追加 */
    max-width: 90%; /* 幅の最大値を設定 */
  }
`;


export default CatchCopyMobile;