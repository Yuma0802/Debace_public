import styled from "styled-components";
import LogoImg from "../../assets/images/Debace.png";

const Logo = () => {
  return(
    <SLogo />
  )
}

const SLogo = styled.img.attrs({
  src: `${LogoImg}`,
  alt: 'Debaceのロゴ'
})`
  width: 40px;
  height: 40px;
  padding: 0px 5px 4px 0px;
  margin-bottom: 3px;
`;

export default Logo;