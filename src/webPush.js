import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyBOwn-jzOBOmFCTTJHsqHTvqBQo6kUkJdU",
        authDomain: "applykartnew.firebaseapp.com",
        projectId: "applykartnew",
        storageBucket: "applykartnew.appspot.com",
        messagingSenderId: "503253968811",
        appId: "1:503253968811:web:736887ae280ae1e75e14ee",
        measurementId: "G-LGYS98S2K2",
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              "BFpNpMOOP1qVr3cIAND4yaiBKuqa9zD-nk0_MHUJyBLpUxo4f2QTT_70WCiEeL-PyL65eTs9Fo2UXrngWBmJuME",
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
