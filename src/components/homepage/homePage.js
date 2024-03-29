import { Fragment, useEffect } from "react";
import Header from "components/shared/header";
import Footer from "components/shared/footer";
import Head from "next/head";
import Banner from "./banner";
import WhyChoose from "./why-choose";
import TopCompanies from "./top-company";
import ChooseJob from "./choose-job";
import HowItWork from "./how-works";
import SearchJob from "./search-job";
import Faqs from "./faqs";
import AdvertisingJob from "./advertisingJob";
import DownloadApp from "./downloadApp";
import AppFooter from "./AppFooter";
import JobPageLinks from "./jobPageLinks";

const HomePage = () => {

  useEffect(() => {
    localStorage.removeItem('applyKart');
  },[]);

  return (
    <Fragment>
      <Head>
        <title>An all-in-one professional networking platform to connect, engage and find jobs with the help of AI!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:title" content="Find jobs with ApplyKart" />
        <meta property="og:type" content="website" />
        <meta property='og:description' content='An all-in-one professional networking platform to connect, engage and find jobs with the help of AI!'/>
        <meta property="og:image" content="https://applykart.co/assets/images/applykart-logo.png" />
        <meta property="og:url" content="https://applykart.co/" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Header
        styleClass="style_two bg-transparent position-absolute"
        logoUrl="assets/images/white-logo.svg"
      />
      <Banner />
      <WhyChoose />
      <TopCompanies />
      <ChooseJob />
      <HowItWork />
      <SearchJob />
      {/* <AdvertisingJob /> */}
      <Faqs />
      <DownloadApp />
      <JobPageLinks />
      <AppFooter />
      {/* <Footer /> */}
    </Fragment>
  );
};

export default HomePage;
