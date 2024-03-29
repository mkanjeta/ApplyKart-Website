import { Fragment } from "react";
import Head from "next/head";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { wrapper } from "../store";
import Loader from "components/shared/loader";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { pubNubPublishKey, pubNubSubscribeKey } from "constants/constants";
import "react-toastify/dist/ReactToastify.css";
import NotificationService from "../NotificationService";
// import PushNotificationLayout from "components/pushNotification/PushNotificationLayout";
import { firebaseCloudMessaging } from "../webPush";
import firebase from "firebase/app";
import "../../styles/TimePicker.css";
import "../../styles/Clock.css";
import Script from "next/script";
import GetSubscription from "components/auth/GetSubscription";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [seekerId, setSeekerId] = useState("");
  const [pubnub, setPubnub] = useState("myUniqueId");
  useEffect(() => {
    getDatas();
  }, []);
  //let pubnub = null;
  const getDatas = async () => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const data = JSON.parse(applyKart);
      setSeekerId(data?.userId);
    }
  };

  // notification code start
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => { });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          localStorage.setItem("deviceToken", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      const { data, notification } = message;
      const { notification_type } = data;
      toast.success(
        <div
          onClick={() => {
            handleNotification(notification_type);
          }}
        >
          <h5>{notification?.title}</h5>
          <h6>{notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  const handleNotification = (notification_type) => {
    router.push(genrateRoute(notification_type));
  };

  const genrateRoute = (notification_type) => {
    let route = "";
    if (notification_type == 1 || notification_type == 2) {
      route = "/notifications/all";
    } else if (notification_type == 11) {
      route = "/notifications/offers-received/live-negotiations";
    } else if (notification_type == 12) {
      route = "/notifications/offers-received/accepted";
    } else if (notification_type == 13) {
      route = "/notifications/offers-received/rejected";
    } else if (notification_type == 17) {
      route = "/notifications/offers-made/live-negotiations";
    } else if (notification_type == 15) {
      route = "/notifications/offers-made/accepted";
    } else if (notification_type == 16) {
      route = "/notifications/offers-made/rejected";
    }
    return route;
  };

  //notifictaion code ends

  useEffect(() => {
    if (seekerId) {
      let buffer = new PubNub({
        subscribeKey: pubNubSubscribeKey,
        publishKey: pubNubPublishKey,
        autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
        restore: true,
        uuid: seekerId?.toString(),
      });

      setPubnub(buffer);
    }
  }, [seekerId]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router]);

  // console.log(loading, 'common loading');
  var origin =  typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = origin+router.asPath;

  
  
  return (
    <>
      {loading && <Loader />}
      {/* <Component {...pageProps} /> */}
      {
        pubnub && (
          //seekerId &&
          <Fragment>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=G-2646E16L4J`}
            />
            <Script strategy="lazyOnload" id="my-script">
              {`
window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-2646E16L4J', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
         
            <Head>
              <title>Applykart | Welcome to applykart</title>
              <meta name="description" content="Find jobs with ApplyKart" />
              <meta name='robots' content='index, follow' />
              <link rel="canonical" href={URL} />
              <link
                rel="icon"
                href="/assets/images/favicon.png"
                type="image/jpg"
              />
              <link
                rel="apple-touch-icon"
                href="/assets/images/favicon.png"
                type="image/jpg"
              />
            </Head>
            <div id="scroll-to-top">
              <PubNubProvider client={pubnub}>
                <NotificationService />
                <GetSubscription />
                <Component {...pageProps} />
                <ToastContainer
                  position="top-right"
                  autoClose={8000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  draggable={false}
                  pauseOnVisibilityChange
                  closeOnClick
                  pauseOnHover
                />
              </PubNubProvider>
            </div>
          </Fragment>
        )
        // :
        // <Component {...pageProps} />
      }
    </>
  );
}

export default wrapper.withRedux(MyApp);
