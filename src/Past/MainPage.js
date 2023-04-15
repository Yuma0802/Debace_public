import React from "react";
import SearchBox from "../Presentational/Atoms/SearchBox";
import SlidersIcon from "../Presentational/Atoms/SlidersIcon";
import AgendaCreateBtn from "../Presentational/Atoms/AgendaCreateBtn";
import DebateBoxBelt from "../Presentational/Molecules/DebateBoxBelt";
import SelectBand from "../Presentational/Molecules/SelectBand";
import Header from '../Presentational/Organisms/Header';
import BannerAds from "../Presentational/Atoms/BannerAds";


const MainPage = () => {

  return(
    <>
    <Header />
    {/* <SearchBox /> */}
    <BannerAds />
    <SelectBand />
    <AgendaCreateBtn />
    <DebateBoxBelt />
    <DebateBoxBelt />
    <DebateBoxBelt />
    <DebateBoxBelt />
    </>
  )
};

export default MainPage;