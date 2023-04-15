import styled from "styled-components";
import coffeeg from "../../assets/images/FirstPage/img_coffeeg5732624.png";

const CatchCopy = () => {

  return(
    <SCatchCopyBlock>
      <SCatchCopy>ここはネット上で建設的な議論をする為のSNS</SCatchCopy>
      <SCatchCopyImg />
      {/* <SCatchCopyMobile>ここはネット上で建設的な議論をする為のSNS</SCatchCopyMobile> */}
    </SCatchCopyBlock>
  )
}

const SCatchCopyBlock = styled.div`
  text-align: center;
  padding: 0 5% 3% 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: #000000; */

  @media screen and (min-width: 481px) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media screen and (max-width: 480px) {
    padding-top: 75%;
  }
  
`;

const SCatchCopy = styled.h1`
  font-family: 'MS PMincho';
  font-style: normal;
  font-weight: 400;
  font-size: 36px !important;
  line-height: 36px;
  letter-spacing: -0.02em;
  margin: 0;
  color: #000000;
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 481px) {
    font-size: 48px;
    line-height: 48px;
    text-align: left;
  }
  @media screen and (max-width: 480px) {
   display: none;
  }
`;

const SCatchCopyImg = styled.img.attrs({
  src: `${coffeeg}`,
  alt: 'パソコンの中で討論してる絵'
})`
  display: inline-block;
  width: 40%;
  height: 100%;
  padding-top: 100px;
  @media screen and (max-width: 480px) {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 125%;
  }
`;

// const SCatchCopyMobile = styled.h1`
//   display: none;

//   @media screen and (max-width: 480px) {
//     display: block;
//     font-family: 'MS PMincho';
//     font-style: normal;
//     font-weight: 400;
//     font-size: 22px;
//     line-height: 40px;
//     letter-spacing: -0.02em;
//     margin: 0;
//     color: #000000;
//     text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.25);
//     position: absolute;
//     top: 80%;
//     width: 100%;
//     text-align: center;
    
//   }
// `;


export default CatchCopy;
