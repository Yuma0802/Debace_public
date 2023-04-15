import React from "react";
import CatchCopy from '../Presentational/Molecules/CatchCopy';
import About from '../Presentational/Molecules/About';
import CatchCopyMobile from "../Presentational/Atoms/CatchCopyMobile";
import Footer from "../Presentational/Organisms/Footer";

function FirstPage() {



  return (
    <>
   
    <CatchCopy />
    <CatchCopyMobile />
    <About />

    {/* <HowToUse /> */}
    <Footer />
    </>
  );
}

export default FirstPage;