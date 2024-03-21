// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBeusGEmmy1-n7ujdcvQAUTY06mnkbj7O8',
  authDomain: 'adas-4a84c.firebaseapp.com',
  projectId: 'adas-4a84c',
  storageBucket: 'adas-4a84c.appspot.com',
  messagingSenderId: '866343344904',
  appId: '1:866343344904:web:f7f5953d1927bccd412abd',
  measurementId: 'G-H3RDYWMFJW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Auth and get a reference to the service
export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
// Get a non-default Storage bucket
export const storage = getStorage(app)
