import styled from "styled-components";
import pasocon from "../../assets/images/FirstPage/img_pexelsphotoby.png";

const About = () => {
  return (
    <SAboutWrap>
      <SAboutTitle>Debaceとは</SAboutTitle>
      <SAboutBlock>
        <SAboutIMG />
        <SAboutContents>
        Debaceはオンライン上で議論、討論をするための場所。スマホやパソコンからログインして好きな時間に好きなだけ討論をして答えのない問題に自分なりの答えを作ってみましょう。与えられたお題に対し自分の意見を考えるだけでなく異なる考えも受け入れることによって視野を広げていったら今まで見えていたものも違って見えてくるかも・・・？<br/>
        さあ、Debaceを使ってオンライン上で建設的な議論をしてみましょう。
        </SAboutContents>
      </SAboutBlock>
    </SAboutWrap>
  );
};

const SAboutWrap = styled.div`
  height: 25%;
  background-color: black;
  text-align: center;
`;

const SAboutTitle = styled.h2`
  padding-top: 10px;
  font-family: 'MS PMincho';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SAboutBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5% 10%;
`;

const SAboutIMG = styled.img.attrs({
  src: `${pasocon}`,
  alt: 'パソコンの絵'
})`
  width: 40%;
  height: 80%;
  @media screen and (max-width: 480px) {
   display: none;
    
  }
`;

const SAboutContents = styled.p`
  width: 50%;
  //font-family: 'MS PMincho';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 43px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  padding-right: 0;
  text-align: left;
  @media screen and (max-width: 480px) {
   width: 100%;
    
  }
`;

export default About;
