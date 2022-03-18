const { initializeApp } = require('firebase/app');
const dotenv = require('dotenv');
const { getStorage } = require('firebase/storage');

dotenv.config({ path: './config.env' });

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESS_SEND_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };
