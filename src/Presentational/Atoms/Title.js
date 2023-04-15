import styled from "styled-components";

const Title = () => {
  return(
    <Stitle>Debace</Stitle>
  );
}

const Stitle = styled.h1`
  font-family: 'Volkhov';
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
  line-height: 23px;
  //letter-spacing: -0.02em;
  color: #000000;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  padding: 5px 5px;
  margin: 0px;
  @media screen and (max-width: 480px) {
  font-size: 25px;
  }
`;

export default Title;