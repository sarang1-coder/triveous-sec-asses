import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { firebaseAuth } from './firebase'
const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({})

  function logIn(email, password) {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }
  function logOut() {
    return signOut(firebaseAuth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentuser) => {
      console.log('Auth', currentuser)
      setUser(currentuser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
