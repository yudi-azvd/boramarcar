import { FirebaseOptions, initializeApp } from 'firebase/app';

const dbHost = import.meta.env.VITE_FIREBASE_DB_HOST

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'heatmap-schedule.firebaseapp.com',
  // databaseURL: 'https://heatmap-schedule-default-rtdb.firebaseio.com',
  databaseURL: `http://${dbHost}/?ns=heatmap-schedule-default-rtdb`,
  projectId: 'heatmap-schedule',
  storageBucket: 'heatmap-schedule.appspot.com',
  messagingSenderId: '1060748809539',
  appId: '1:1060748809539:web:e762509faed1ba37d90bf6',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
