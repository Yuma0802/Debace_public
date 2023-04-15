import React from "react";
import styled from 'styled-components';
import other from '../../assets/images/social_problem.jpg';
import politics from '../../assets/images/category/politics.jpg'
import economic from '../../assets/images/category/economics.jpg'
import social from '../../assets/images/category/socialproblem.jpg'
import techonlogy from '../../assets/images/category/technology.jpg'
import history from '../../assets/images/category/history.jpg'
import study from '../../assets/images/category/study.jpg'
import entertainment from '../../assets/images/category/entertainment.jpg'
import daily from '../../assets/images/category/daily.jpg'


const CatImg = (props) => {

  return(
    <>
      {props.cat === '政治' && <PoliticsImg />}
      {props.cat === '経済' && <EconomicImg />}
      {props.cat === '社会問題' && <SocialImg /> }
      {props.cat === 'テクノロジー' && <TechnologyImg />}
      {props.cat === '歴史' && <HistoryImg /> }
      {props.cat === '学問' && <StudyImg /> }
      {props.cat === 'エンタメ' && <EntertainmentImg /> }
      {props.cat === '生活' && <DailyImg /> }
      {props.cat === 'その他' && <OtherImg />}
    </>
  );
};

const OtherImg = styled.img.attrs({
  src: `${other}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const PoliticsImg = styled.img.attrs({
  src: `${politics}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const EconomicImg = styled.img.attrs({
  src: `${economic}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const SocialImg = styled.img.attrs({
  src: `${social}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const TechnologyImg = styled.img.attrs({
  src: `${techonlogy}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const HistoryImg = styled.img.attrs({
  src: `${history}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const StudyImg = styled.img.attrs({
  src: `${study}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const EntertainmentImg = styled.img.attrs({
  src: `${entertainment}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;
const DailyImg = styled.img.attrs({
  src: `${daily}`,
  alt: 'サンプル画像'
})`
  width: 204px;
  height: 110px;
  @media (max-width: 480px) 
  {
    width: 330px;
    height: 200px;
    margin-left: 5px;
    margin-top: 2px;
    margin-bottom: 15px; 
  }
`;

export default CatImg;