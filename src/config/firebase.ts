import { FirebaseOptions, initializeApp } from 'firebase/app';

let databaseURL = ''
const dbHost = import.meta.env.VITE_FIREBASE_DB_HOST

if (import.meta.env.DEV) {
  databaseURL = `http://${dbHost}/?ns=heatmap-schedule-default-rtdb`
} else {
  databaseURL = 'https://heatmap-schedule-default-rtdb.firebaseio.com'
}

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAg358qtLWeLxy13tr4tZTBTrGdAQJymOg',
  authDomain: 'heatmap-schedule.firebaseapp.com',
  databaseURL,
  projectId: 'heatmap-schedule',
  storageBucket: 'heatmap-schedule.appspot.com',
  messagingSenderId: '1060748809539',
  appId: '1:1060748809539:web:e762509faed1ba37d90bf6',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
