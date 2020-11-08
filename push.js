const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BHKxgJaZnFQfNyuUM3YjdLPgO8DL-n9BlciqOKEvqMVersMYAA0u7b6qKHTD7OBKkdTHeZmPcDAUIkjO8f_Le_M",
   "privateKey": "dvVhAfYkLiC8sagrXYrXh5c6iJLiqBc28HNLvsfYULI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dfP2aaKdaig:APA91bGY-hApdpR3LS3oWbKgF3ZDVOnF48NlWhLa-d7aoy3Gj3FUJVlb69LlPH6AD221_aeMFWJORAFAVC8SGyA8aGA8sjSnsG2BToJBYHtvUfzD6M8qwzcdYb-CnxIu6VyIoOQZqj_Z",
   "keys": {
       "p256dh": "BNNSd2SN1vw1I4qqBjg7jiOahxXN2xS9ZaNTrm+vsxN9WmGFIRgSz6n2AlxPLVaiXYx7lefZTrBRJqS/0zi6AgY=",
       "auth": "yUbBByQJahz+DxExi43H7g=="
   }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '111070664979',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);