import styled from "styled-components";

const BannerAds = () => {
  return (
    <SBannerAdsWrap>
      <SBannerAds>Debaseとは(仮)</SBannerAds>
    </SBannerAdsWrap>
  );
};

const SBannerAdsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const SBannerAds = styled.div`
  background-color: #ffa500;
  color: white;
  font-size: 60px;
  cursor: pointer;
  border: none;
  width: 90%;
  max-width: 900px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default BannerAds;
