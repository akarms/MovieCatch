import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCyjGR0SPwRWoKC1-38nN_FxNUDpMcvi78",
    authDomain: "moviecatch-6f997.firebaseapp.com",
    projectId: "moviecatch-6f997",
    storageBucket: "moviecatch-6f997.appspot.com",
    messagingSenderId: "203505853557",
    appId: "1:203505853557:android:3e8fe23ba25feef45bc43c",
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
