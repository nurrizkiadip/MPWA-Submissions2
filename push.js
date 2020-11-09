const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BOKUf6kzWPzkVBx8xzkcsNc85ca1-evK-3TM5KiHGBHORKGLTW_teIJ20htTRTFRgPYUQLn1F8Lp033bOHp_Kuk",
   "privateKey": "84-HEO3JPUOix3F6DWTqV4aidmVaOkAik-Bl527J4iM"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fQ2EL7oKyFw:APA91bHulMpgamHfMP-C0F3LB8zivrYcDHqn0dqnpTJjEXQmPAdEjU9eOrim0GItaIt_gR5dvbLHDcRvwP5vcGzasf9mIRRAPolxLNdo7axzpo_uVFRBuuHq2yjxL48uWB_uQEwCIXGY",
   "keys": {
       "p256dh": "BPdSiWtuCu6s4M1aop8YBLBW5KakZ6ADPhemp6WIPDN/fe6c7baSVWudJi7Ga/ZErkVYL9zRJ91I7Lr8koWBigY=",
       "auth": "3nPmM0xmWUqteSxreO5n9A=="
   }
};

const payload = 'Selamat datang di Kabar Liga Bola! Aplikasi yang menyediakan berbagai informasi mengenai liga sepak bola. Salam sejahtera';
 
const options = {
   gcmAPIKey: '327390441337',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);