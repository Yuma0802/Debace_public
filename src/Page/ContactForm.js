import React from "react";
import styled from 'styled-components';
import Footer from "../Presentational/Organisms/Footer";

const ContactForm = () => {
  return(
    <>
    <SContactForm>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfW2y01EvDM0AHwaCEvacLCTrKfPtsu4cno438ByEjMZLHF9g/viewform?usp=sf_link" width="100%" height="700" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
    </SContactForm>
    <Footer />
    </>
  )
};

const SContactForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 230px;
  background-color: #ffe0a6;
`;

export default ContactForm;
