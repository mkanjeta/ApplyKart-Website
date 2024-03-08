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
        <title>Land Your Dream Job in 2 Hours with ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="ApplyKart is your one-stop platform for finding a job in India & Australia and getting hired fast. We offer AI job search, digital visiting cards, and live interviews to help you land your dream job."></meta>
        <meta
          property="og:image"
          content={"https://applykart.co/assets/images/applykart-logo.png"}
        />
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
