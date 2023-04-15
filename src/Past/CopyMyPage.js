import styled from 'styled-components';

import textImg from '../assets/images/textImg.svg';

import Header from '../Presentational/Organisms/Header';
import SelectBox from '../Presentational/Atoms/SelectBox';
import ProfileImg from '../Presentational/Atoms/ProfileImg';
import Hashtag from '../Presentational/Atoms/Hashtag';
import DebateLink from '../Presentational/Atoms/DebateLink';

const MyPage = () => {
    return(
        <>
            <Header />
            <SWrap>
                <SSelectBoxWrap>
                    <SelectBox>プロフィール</SelectBox>
                    <SelectBox>フレンド</SelectBox>
                    <SelectBox>DM</SelectBox>
                    <SelectBox>タグ</SelectBox>
                    <SelectBox>お問い合わせ</SelectBox>
                    <SelectBox>設定</SelectBox>
                </SSelectBoxWrap>

                <SFlex>
                    <SProfileImgWrap>
                        <ProfileImg />
                        <SRank>ランク:&ensp;&ensp;元老院</SRank>
                        <SRankInfo>ランクアップの条件<TextImg src={textImg} /></SRankInfo>
                    </SProfileImgWrap>
                    <SProfileTextWrap>
                        <SName>宮沢　喜一<SNameSpan>20代&ensp;男性</SNameSpan></SName>
                        <SProfileText>格闘シーンの見どころは緊張感、スピード感、泥臭さor技術力の高さだと思われる。泥臭さというのは”ダイハード”等の「華麗な格闘スキルを持たない者の戦い」であり後者はジャッキーチェンなどの「格闘技ベース戦い」だ。だがそこでワイヤーやCG、。</SProfileText>
                    
                        <SInfo>

                            <SFlex className='mtb-m'>
                                <SInfoTitle>お気に入りジャンル</SInfoTitle>
                                <SHashtagWrap>
                                    <Hashtag>社会問題</Hashtag>
                                    <Hashtag>テクノロジー</Hashtag>
                                    <Hashtag>生活</Hashtag>
                                </SHashtagWrap>
                            </SFlex>

                            <SFlex className='mtb-m'>
                                <SInfoTitle>作成議題</SInfoTitle>
                                <div>
                                    <DebateLinkWrap><DebateLink text="ストリーミングサービスの出現によりレンタルビデオ店はもう不必要" /></DebateLinkWrap>
                                    <DebateLinkWrap><DebateLink text="映画館の座席は多少リクライニング可にすべき" /></DebateLinkWrap>
                                    <DebateLinkWrap><DebateLink text="映画の地上波放送はノーカットのままで良い" /></DebateLinkWrap>
                                    <DebateLinkWrap><DebateLink text="minimam saraly syould be raised in Japan" /></DebateLinkWrap>
                                </div>
                                <More>etc...</More>
                            </SFlex>

                            <SFlex className='mtb-m'>
                                <SInfoTitle>直近参加討論</SInfoTitle>
                                <div>
                                    <DebateLinkWrap><DebateLink text="子がおかしいやつの場合親もおかしいという方程式" /></DebateLinkWrap>
                                    <DebateLinkWrap><DebateLink text="소비자금융의 금리는 낮아야 한다." /></DebateLinkWrap>
                                </div>
                            </SFlex>
                        </SInfo>

                        <SStatistics>
                            <SFlex className='mtb-m'>
                                <SInfoTitle>統計</SInfoTitle>
                                    
                            </SFlex>
                        </SStatistics>
                    </SProfileTextWrap>
                </SFlex>

            </SWrap>
        </>
    );
}
export default MyPage;

const SWrap = styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding: 20px 30px;
`; 
const SSelectBoxWrap = styled.div`
  display: block;
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #FFA500;
  opacity: 0.7;
`;

const SRank = styled.h3`
    margin-top: 60px;
    padding: 0 40px;
    font-size: 14px;
    font-family: 'Volkhov';
    font-style: normal;
    font-weight: 400;
    text-align: right;
`;
const SRankInfo = styled.a`
    display: block;
    font-size: 10px;
    font-family: 'Volkhov';
    font-style: normal;
    font-weight: 400;
    color: #888888;
    text-decoration: underline #888888 !important;
    text-align: right;
    cursor: pointer;
`;
const TextImg = styled.img`
    margin: 0 10px;
    width: 20px;
`;

const SProfileImgWrap = styled.div`
    width: 20%;
    padding: 20px 30px 20px 0;
`
const SProfileTextWrap = styled.div`
    width: 70%;
    padding: 20px 0;
`;

const SFlex = styled.div`
    position: relative;
    display: flex;
`

const SName = styled.h3`
    padding: 20px 0;
    font-family: 'Norican';
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;
const SNameSpan = styled.span`
    margin: 0 50px;
    font-size: 15px;
    font-weight: 400;
`;
const SProfileText = styled.p`
    padding: 0 0 15px;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Noto Serif JP';
    line-height: 20px;
    color: #222222;
    border-bottom: 1px solid #C4C4C4;
`;

const SInfo = styled.div`
    border-bottom: 1px solid #C4C4C4;
`;
const SInfoTitle = styled.h3`
    width: 30%;
    padding: 0 0 0 20px;
    font-family: 'Volkhov';
    font-style: italic;
    font-weight: 700;
    font-size: 18px;
    text-align: left;
`;
const SHashtagWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;
const DebateLinkWrap = styled.div`
    padding: 0 0 20px;
`;
const More = styled.a`
    position: absolute;
    right: 40px;
    bottom: 0;
    font-family: 'Volkhov';
    font-style: italic;
    font-weight: 700;
    font-size: 14px;
    color: #000000;
    text-decoration: underline #000 !important;
`;

const SStatistics = styled.div``;