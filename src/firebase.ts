import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBwa9KrgJ3886cC0qdAS9Pn7g76Sz9Ga2I',
  authDomain: 'instagram-clone-4c00a.firebaseapp.com',
  projectId: 'instagram-clone-4c00a',
  storageBucket: 'instagram-clone-4c00a.appspot.com',
  messagingSenderId: '797549029912',
  appId: '1:797549029912:web:10cdf7045bf96db6e4316d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
