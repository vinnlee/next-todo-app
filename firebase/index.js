import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCVl96afxxy0nt4cl3R6C52rH9t38Hd3Cg',
  authDomain: 'todo-app-dce9a.firebaseapp.com',
  databaseURL: 'https://todo-app-dce9a.firebaseio.com',
  projectId: 'todo-app-dce9a',
  storageBucket: 'todo-app-dce9a.appspot.com',
  messagingSenderId: '908309350570',
  appId: '1:908309350570:web:feb43bcb76fb312af368d3'
}

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
