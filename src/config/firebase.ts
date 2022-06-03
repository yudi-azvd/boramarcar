import { FirebaseOptions, initializeApp } from 'firebase/app'

let databaseURL = ''
const dbHost = import.meta.env.VITE_FIREBASE_DB_HOST

if (import.meta.env.DEV) {
  databaseURL = `http://${dbHost}/?ns=heatmap-schedule-default-rtdb`
} else {
  databaseURL = 'https://heatmap-schedule-default-rtdb.firebaseio.com'
}

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
