import { Fragment, useEffect, useState } from "react";
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
import ReelSlider from "./reelSlider";
import Newssection from "./newssection";
import NewsSlider from "./newsSlider";

const HomePage = () => {
  useEffect(() => {
    // localStorage.removeItem('applyKart');
  }, []);
  let items = [
    {
      id: 3,
      image: "/assets/images/news/Sangri Times.png",
      name: "Sangri Times",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://en.sangritimes.com/new-employment-app-taps-in",
    },
    {
      id: 4,
      image: "/assets/images/news/Sangri Today.png",
      name: "Sangri Today",
      title: "News Portal",
      industry: "Entertainment",
      date: "",
      link: "https://www.sangritoday.com/spotlight/new-employmen",
    },
    {
      id: 5,
      image: "/assets/images/news/Google News.png",
      name: "Google News",
      title: "News Aggregator",
      industry: "Information",
      date: "",
      link: "https://news.google.com/search?",
    },

    {
      id: 8,
      image: "/assets/images/news/Prevalent India.png",
      name: "Prevalent India",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://prevalentindia.in/index.php/business/new-employ",
    },
    {
      id: 9,
      image: "/assets/images/news/lucnkowdigital.png",
      name: "lucnkowdigital",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://lucnkowdigital.com/business/new-employment-a",
    },
    {
      id: 10,
      image: "/assets/images/news/rajasthan journal.png",
      name: "rajasthan journal",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://rajasthanjournal.com/business/new-employment",
    },
    {
      id: 11,
      image: "/assets/images/news/maharashtra24x7.png",
      name: "maharashtra24x7",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://maharashtra24x7.com/business/new-employmen",
    },
    {
      id: 12,
      image: "/assets/images/news/up-patrika.png",
      name: "up-patrika",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://up-patrika.com/business/new-employment-app-t",
    },
    {
      id: 13,
      image: "/assets/images/news/Madhya Pradesh Mirror.png",
      name: "Madhya Pradesh Mirror",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://madhyapradeshmirror.com/business/new-employ",
    },
    {
      id: 14,
      image: "/assets/images/news/Khammaghani Rajasthan.png",
      name: "Khammaghani Rajasthan",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://khammaghanirajasthan.com/business/new-emplo",
    },
    {
      id: 15,
      image: "/assets/images/news/Kanpur Live.png",
      name: "Kanpur Live",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://kanpurlive.in/business/new-employment-app-tap",
    },
    {
      id: 16,
      image: "/assets/images/news/Live Jabalpur.png",
      name: "Live Jabalpur",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://livejabalpur.com/business/new-employment-app",
    },
    {
      id: 17,
      image: "/assets/images/news/Allahabad Post.png",
      name: "Allahabad Post",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://allahabadpost.in/business/new-employment-app",
    },
    {
      id: 18,
      image: "/assets/images/news/Rajasthan Mirror.png",
      name: "Rajasthan Mirror",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://rajasthanmirror.com/business/new-employment-",
    },
    {
      id: 19,
      image: "/assets/images/news/North West News Times.png",
      name: "North West News Times",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://northwestnewstimes.com/index.php/business/new",
    },
    {
      id: 20,
      image: "/assets/images/news/MP Newsline.png",
      name: "MP Newsline",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://mpnewsline.com/business/new-employment-app",
    },
    {
      id: 21,
      image: "/assets/images/news/Delhi News Now.png",
      name: "Delhi News Now",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://delhinewsnow.com/index.php/2023/12/6/new-em",
    },
    {
      id: 22,
      image: "/assets/images/news/Delhi Morning Tribune.png",
      name: "Delhi Morning Tribune",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://delhimorningtribune.com/business/new-employm",
    },
    {
      id: 23,
      image: "/assets/images/news/Evening Post.png",
      name: "Evening Post",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://theeveningpost.in/index.php/business/new-emplo",
    },
    {
      id: 24,
      image: "/assets/images/news/Bhopal Sun Times.png",
      name: "Bhopal Sun Times",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://bhopalsuntimes.com/business/new-employment-",
    },
    {
      id: 25,
      image: "/assets/images/news/MP Guardian.png",
      name: "MP Guardian",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://mpguardian.com/index.php/2023/12/6/new-empl",
    },

    {
      id: 28,
      image: "/assets/images/news/National Insight.png",
      name: "National Insight",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://nationalinsight.in/index.php/business/new-emplo",
    },
    {
      id: 29,
      image: "/assets/images/news/Pink City Now.png",
      name: "Pink City Now",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://pinkcitynow.com/index.php/2023/12/6/new-empl",
    },
    {
      id: 30,
      image: "/assets/images/news/Deccan Express.png",
      name: "Deccan Express",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://deccanexpress.co.in/index.php/business/new-em",
    },
    {
      id: 31,
      image: "/assets/images/news/Marudhar Chronicle.png",
      name: "Marudhar Chronicle",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://marudharchronicle.com/index.php/2023/12/6/new",
    },
    {
      id: 32,
      image: "/assets/images/news/Khabare Rajasthan.png",
      name: "Khabare Rajasthan",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://khabarerajasthan.com/index.php/2023/12/6/new",
    },
    {
      id: 33,
      image: "/assets/images/news/Your Bangalore.png",
      name: "Your Bangalore",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://yourbangalore.com/business/new-employment-a",
    },
    {
      id: 35,
      image: "/assets/images/news/Prakhar Jagaran.png",
      name: "Prakhar Jagaran",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://prakharjagaran.com/new-employment-app-taps-",
    },
    {
      id: 36,
      image: "/assets/images/news/Satta Express.png",
      name: "Satta Express",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://sattaexpress.co.in/index.php/2023/12/6/new-emp",
    },
    {
      id: 37,
      image: "/assets/images/news/Business Point.png",
      name: "Business Point",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://businesspoint.co.in/index.php/business/new-emp",
    },
    {
      id: 38,
      image: "/assets/images/news/Delhi News Watch.png",
      name: "Delhi News Watch",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://delhinewswatch.com/index.php/2023/12/6/new-e",
    },
    {
      id: 39,
      image: "/assets/images/news/Gwalior Buzz.png",
      name: "Gwalior Buzz",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://gwaliorbuzz.com/index.php/2023/12/6/new-empl",
    },
    {
      id: 40,
      image: "/assets/images/news/News Track Bhopal.png",
      name: "News Track Bhopal",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://newstrackbhopal.com/index.php/2023/12/6/new-",
    },
    {
      id: 41,
      image: "/assets/images/news/Madhya Pradesh Herald.png",
      name: "Madhya Pradesh Herald",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://madhyapradeshherald.com/business/new-emplo",
    },
    {
      id: 42,
      image: "/assets/images/news/Shekhawati Samachar.png",
      name: "Shekhawati Samachar",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://shekhawatisamachar.com/index.php/2023/12/6/n",
    },
    {
      id: 43,
      image: "/assets/images/news/Ncr-Chronicle.png",
      name: "Ncr-Chronicle",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://ncr-chronicle.com/business/new-employment-ap",
    },
    {
      id: 44,
      image: "/assets/images/news/Rising Entrepreneurs.png",
      name: "Rising Entrepreneurs",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://risingentrepreneurs.in/index.php/business/new-e",
    },
    {
      id: 45,
      image: "/assets/images/news/newsdaddy.png",
      name: "newsdaddy",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://newsdaddy.co.in/index.php/business/new-employ",
    },
    {
      id: 46,
      image: "/assets/images/news/Mint-Money.png",
      name: "Mint-Money",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://mint-money.in/index.php/business/new-employm",
    },
    {
      id: 47,
      image: "/assets/images/news/Rajasthan Express.png",
      name: "Rajasthan Express",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://rajasthanexpress.in/index.php/2023/12/6/new-em",
    },
    {
      id: 48,
      image: "/assets/images/news/The Capital News.png",
      name: "The Capital News",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://thecapitalnews.in/index.php/business/new-emplo",
    },
    {
      id: 50,
      image: "/assets/images/news/The Indian Influencer.png",
      name: "The Indian Influencer",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://theindianinfluencer.com/index.php/business/new",
    },
    {
      id: 51,
      image: "/assets/images/news/The Daily Metro.png",
      name: "The Daily Metro",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://thedailymetro.in/index.php/business/new-employ",
    },
    {
      id: 52,
      image: "/assets/images/news/Central Herald.png",
      name: "Central Herald",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://centralherald.in/index.php/business/new-employ",
    },
    {
      id: 53,
      image: "/assets/images/news/Live Mumbai.png",
      name: "Live Mumbai",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://livemumbai.in/index.php/2023/12/6/new-employm",
    },
    {
      id: 1,
      image: "/assets/images/news/Loktej English.png",
      name: "Loktej English",
      title:
        "New employment app taps into surging jobs market for youth, migrants and older workers",
      industry: "Information",
      date: "06 Dec 2023 12:00:27",
      link: "https://english.loktej.com/article/7835/new-employment",
    },
    {
      id: 34,
      image: "/assets/images/news/Hola Mumbai.png",
      name: "Hola Mumbai",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://holamumbai.com/business/new-employment-app",
    },
    {
      id: 49,
      image: "/assets/images/news/The Deccan Messenger.png",
      name: "The Deccan Messenger",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://thedeccanmessenger.com/index.php/2023/12/6/n",
    },
    {
      id: 6,
      image: "/assets/images/news/Mumbai Times.png",
      name: "Mumbai Times",
      title: "News Portal",
      industry: "Business",
      date: "",
      link: "https://mumbaitimes.online/new-employment-app-taps-",
    },
    {
      id: 7,
      image: "/assets/images/news/News9 Network.png",
      name: "News9 Network",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://news9network.com/new-employment-app-taps-in",
    },
    {
      id: 26,
      image: "/assets/images/news/udaipurdispatch.png",
      name: "udaipurdispatch",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://udaipurdispatch.com/2023/12/6/new-employmen",
    },
    {
      id: 27,
      image: "/assets/images/news/BizzSight.png",
      name: "BizzSight",
      title: "News Portal",
      industry: "Information",
      date: "",
      link: "https://bizzsight.com/index.php/2023/12/6/new-employm",
    },
    {
      id: 2,
      image: "/assets/images/news/UP 18 News.png",
      name: "UP 18 News",
      title:
        "New Employment App Taps Into Surging Jobs Market For Youth, Migrants And Older Workers",
      industry: "Information",
      date: "December 6, 2023",
      link: "https://up18news.com/new-employment-app-taps-into-s",
    },
  ];

  return (
    <Fragment>
      <Head>
        <title>
          An all-in-one professional networking platform to connect, engage and
          find jobs with the help of AI!
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:title" content="Find jobs with ApplyKart" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="An all-in-one professional networking platform to connect, engage and find jobs with the help of AI!"
        />
        <meta
          property="og:image"
          content="https://applykart.co/assets/images/applykart-logo.png"
        />
        <meta property="og:url" content="https://applykart.co/" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Header
        styleClass="style_two bg-transparent position-absolute"
        logoUrl="assets/images/white-logo.svg"
      />
      <Banner />
      <ReelSlider />
      {/* <Newssection /> */}
      <NewsSlider items={items} />
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
