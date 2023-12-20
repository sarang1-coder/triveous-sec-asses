import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYfG0iV1NUitdu8vETz4k75ApU1Do5RL0',
  authDomain: 'chat-gpt-ui-34c67.firebaseapp.com',
  projectId: 'chat-gpt-ui-34c67',
  storageBucket: 'chat-gpt-ui-34c67.appspot.com',
  messagingSenderId: '315598682904',
  appId: '1:315598682904:web:872ca3295a3ad8c74abc6d',
}

const app = initializeApp(firebaseConfig)

const firebaseAuth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)
export { firebaseAuth, provider, db }
