import {
  addDoc,
  collection,
  Timestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase.js'


export const addToFirestore = async (title, description, urlToImage) => {
  try {
    await addDoc(collection(db, 'newsapp'), {
      title: title,
      description: description,
      image: urlToImage,
      created_at: Timestamp.now(),
    })
    console.log('Info stored in Firestore:', { title, description, urlToImage })
    return true
  } catch (error) {
    console.error('Error saving data to Firestore:', error)
    return false
  }
}

export const deleteFromFirestore = async (title) => {
  try {
    await deleteDoc(doc(db, 'newsapp', title))
    console.log('Info removed from Firestore:', title)
    return true
  } catch (error) {
    console.error('Error deleting data from Firestore:', error)
    return false
  }
}
