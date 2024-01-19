import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { firebaseCloudMessaging } from "./webPush";

function PushNotificationLayout({ children }) {
  const router = useRouter();
  // console.log("firebaseeeee", firebase);
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
        // router.push("/notifications/offers-made/live-negotiations");
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          // console.log("token pushnotification layout", token);
          localStorage.setItem("deviceToken", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    // console.log("llllllllll", url);
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    // console.log("firebaseeeee2", firebase);
    let messaging = null;
    try {
      messaging = firebase.messaging();
    } catch (err) {
      console.log("Errorrrr", err);
    }
    // console.log("messaging", messaging);
    messaging.onMessage((message) => {
      // console.log("onMessage", message);
      toast(
        <div onClick={() => {}}>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
