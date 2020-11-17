import React from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import firebase from '../firebase'
import { removeUserCookie, setUserCookie } from '../utils/cookies'

const UserContext = React.createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [loadingUser, setLoadingUser] = React.useState(true)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const register = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/login')
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'warning'
        })
      })
  }

  const login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/dashboard')
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'warning'
        })
      })
  }

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/login')
      })
  }

  const uploadAvatar = async (file) => {
    try {
      const uploadSnapshot = await firebase
        .storage()
        .ref(`user/${firebase.auth().currentUser.uid}/avatar/${file.name}`)
        .put(file)
      const imageUrl = await uploadSnapshot.ref.getDownloadURL()
      updateProfile({ photoURL: imageUrl })
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'warning'
      })
    }
  }

  const updateProfile = (profile) => {
    const currentUser = firebase.auth().currentUser

    currentUser
      .updateProfile(profile)
      .then(() => {
        setUser({ ...user, ...profile })
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'warning'
        })
      })
  }

  const updatePassword = (password, newPassword) => {
    const currentUser = firebase.auth().currentUser

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    )

    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        currentUser.updatePassword(newPassword).then(() => {
          enqueueSnackbar('The password was changed successfully!', {
            variant: 'success'
          })
        })
      })
      .catch((e) => {
        enqueueSnackbar(
          "Your password haven't change yet. Please check your current password and try again!",
          {
            variant: 'error'
          }
        )
      })
  }

  React.useEffect(() => {
    const unsubscriber = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const { displayName, email, photoURL } = user
        setUserCookie(token)
        setUser({ displayName, email, photoURL, token })
        setLoadingUser(false)
      } else {
        removeUserCookie()
        setUser(null)
        setLoadingUser(false)
      }
    })

    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        register,
        login,
        logout,
        uploadAvatar,
        updateProfile,
        updatePassword
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => React.useContext(UserContext)
