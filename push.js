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
   "endpoint": "https://fcm.googleapis.com/fcm/send/ckJjBqcy_20:APA91bGNDn9Bf6B916jXHb3x05ZYqo7ybKfoSAFwF7zyoHihXDs7JNIMoRNQuPntnigKmqmQoZi9xCDXLQButcMOa-tbXgrqwsxFhlbxBXjDeHalAOeULiWIpAfK_2vDcdQvy-6pZYfE",
   "keys": {
       "p256dh": "BKF/DwaeV1oV+7hBCCxZmILlEM/gKsL1y3hufzp3fWyvebIL3V6Fpx+9a+5btDg4CFnSfuQ41vw4vTF7L2xPTaI=",
       "auth": "KLdx1QDO9JPup4mshKKC3A=="
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