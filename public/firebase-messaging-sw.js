// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
// );

importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js");

importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBOwn-jzOBOmFCTTJHsqHTvqBQo6kUkJdU",
  authDomain: "applykartnew.firebaseapp.com",
  projectId: "applykartnew",
  storageBucket: "applykartnew.appspot.com",
  messagingSenderId: "503253968811",
  appId: "1:503253968811:web:736887ae280ae1e75e14ee",
  measurementId: "G-LGYS98S2K2",
});

const messaging = firebase.messaging();
// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyBOwn-jzOBOmFCTTJHsqHTvqBQo6kUkJdU",
//   authDomain: "applykartnew.firebaseapp.com",
//   projectId: "applykartnew",
//   storageBucket: "applykartnew.appspot.com",
//   messagingSenderId: "503253968811",
//   appId: "1:503253968811:web:736887ae280ae1e75e14ee",
//   measurementId: "G-LGYS98S2K2",
// };
// // self.addEventListener("notificationclick", function (event) {
// //   console.log(">>>>evennt<<<<", event.notification.data.FCM_MSG.data);
// //   const routeArray = [
// //     [
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //       "/project-management",
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/daily-status-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/daily-status-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management`,
// //       `/project-management/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //     [
// //       `/project-management/view-po/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-po/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management`,
// //       `/project-management/view-po/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-po/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //     [
// //       `/project-management/view-task/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-task/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management`,
// //       `/project-management/view-task/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-task/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-task/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //     [
// //       `/project-management/view-document/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-document/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management`,
// //       `/project-management/view-document/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/project-management/view-document/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //     [`/vendors`, `/vendors`, `/vendors`, `/vendors`, `/vendors`],
// //     [
// //       `/view-client/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/view-client/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `clients-management`,
// //       `/view-client/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/view-client/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //     [
// //       `/proposal-pdf-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/proposal-pdf-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/proposal-management`,
// //       `/proposal-pdf-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/proposal-pdf-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/proposal-pdf-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/proposal-pdf-view/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //     [
// //       `/view-employee/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/view-employee/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/employee-management`,
// //       `/view-employee/${event.notification.data.FCM_MSG.data.data_id}`,
// //       `/view-employee/${event.notification.data.FCM_MSG.data.data_id}`,
// //     ],
// //   ];
// //   console.log(
// //     "sw",
// //     routeArray[Number(event.notification.data.FCM_MSG.data.pmodule) - 1]
// //   );
// //   const moduleArray =
// //     routeArray[Number(event.notification.data.FCM_MSG.data.pmodule) - 1];
// //   console.log(
// //     "sw",
// //     moduleArray[Number(event.notification.data.FCM_MSG.data.paction_type) - 1]
// //   );
// //   event.notification.close();
// //   event.stopImmediatePropagation();
// //   event.waitUntil(
// //     self.clients.openWindow(
// //       moduleArray[Number(event.notification.data.FCM_MSG.data.paction_type) - 1]
// //       // event.notification.data.fcm_msg.data
// //     )
// //   );
// // });
// firebase.initializeApp(firebaseConfig);
// // Retrieve firebase messaging
// const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload);
});
