importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
   apiKey: "AIzaSyBvrckJaCyN2uqWP6KCDGBha-kIIVIylNs",
   authDomain: "kuikly-7ae93.firebaseapp.com",
   databaseURL: "https://kuikly-7ae93-default-rtdb.firebaseio.com",
   projectId: "kuikly-7ae93",
   storageBucket: "kuikly-7ae93.appspot.com",
   messagingSenderId: "446368829206",
   appId: "1:446368829206:web:274af8c2c955be14d58a37",
   measurementId: "G-QG1NSDMBYH"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});