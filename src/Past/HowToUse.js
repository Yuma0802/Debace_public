import styled from "styled-components";


const HowToUse = () => {
  return(
    <SHowToUse>
      <SHowToUseTitle>使い方</SHowToUseTitle>
      <SHowToUseText>
        <ol>
          <li>アプリをダウンロードしてインストールする。</li>
          <li>アカウントを作成する。</li>
          <li>ログインする。</li>
          <li>ホーム画面からレシピを検索する。</li>
          <li>検索結果から気に入ったレシピを選択する。</li>
          <li>レシピの詳細画面で、必要な材料や手順を確認する。</li>
          <li>必要な材料を購入する。</li>
          <li>調理を開始する前に、キッチンの準備をする。</li>
          <li>レシピの手順に従って調理を進める。</li>
          <li>完成した料理を盛り付け、食べる前に写真を撮影する。</li>
          <li>アプリ内に写真を投稿し、他のユーザーと共有する。</li>
          <li>他のユーザーの投稿を閲覧し、コメントやいいねをする。</li>
          <li>お気に入りのレシピやユーザーをフォローする。</li>
          <li>ユーザーの投稿から自分で作りたいレシピを保存する。</li>
          <li>レシピやユーザーを検索する際に、履歴やブックマークを活用する。</li>
        </ol>
      </SHowToUseText>
    </SHowToUse>
  )
}


const SHowToUse = styled.div`
height: 25%;

  text-align: center;
`;

const SHowToUseTitle = styled.h1`
 padding-top: 10px;
  font-family: 'MS PMincho';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 41px;
  letter-spacing: -0.02em;
  
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


const SHowToUseText = styled.p`
  width: 100%;
  font-family: 'MS PMincho';
  font-style: normal;
  font-size: 40px;
  line-height: 50px;
  letter-spacing: -0.02em;
  padding: 0 100px;
  text-align: left;

  ul {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 20px;
    list-style: disc;
  }

  li {
    margin-bottom: 5px;
  }
`;


export default HowToUse;
