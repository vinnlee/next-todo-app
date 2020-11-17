import React from 'react'
import {
  Typography,
  Card,
  Button,
  Divider,
  Grid,
  FormControl,
  TextField,
  Box,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { useUser } from '../context/useUser'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: `${theme.spacing(8)}px auto 0`,
    padding: '15px 15px 30px'
  },
  progress: {
    display: 'flex',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    fontSize: '3rem',
    cursor: 'pointer'
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 'bold'
  },
  editBox: {
    position: 'relative'
  },
  editIcon: {
    position: 'absolute',
    top: '-12px',
    right: 0
  },
  uploadAvatar: {
    position: 'relative',
    cursor: 'pointer',
    '&::before': {
      position: 'absolute',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      zIndex: '1',
      content: '""'
    },
    '&:hover::before': {
      background:
        "rgba(0,0,0,0.3) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='24px' height='24px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Ccircle cx='12' cy='12' r='3.2'/%3E%3Cpath d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: ' center center'
    }
  }
}))

export default function Dashboard() {
  const classes = useStyles()
  const router = useRouter()
  const { loadingUser, user, uploadAvatar, updatePassword } = useUser()
  const avatarRef = React.useRef(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')

  const handleUploadAvatar = () => {
    avatarRef.current.files.length && uploadAvatar(avatarRef.current.files[0])
  }

  const handleUpdatePassword = () => {
    updatePassword(password, newPassword)
    setOpenDialog(false)
    setPassword('')
    setNewPassword('')
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setPassword('')
    setNewPassword('')
  }

  React.useEffect(() => {
    if (!user && !loadingUser) {
      router.push('/login')
    }
  }, [user, loadingUser])

  return (
    user && (
      <Layout title="Profile">
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <Divider style={{ margin: '8px 0 20px' }} />
          {loadingUser ? (
            <Box className={classes.progress}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <FormControl fullWidth style={{ alignItems: 'center' }}>
                  <input
                    id="upload-avatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                    ref={avatarRef}
                    onChange={handleUploadAvatar}
                  />
                  <label
                    htmlFor="upload-avatar"
                    className={classes.uploadAvatar}
                  >
                    <Avatar
                      src={user.photoURL ? user.photoURL : '/batman.svg'}
                      className={classes.avatar}
                    />
                  </label>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  className={classes.bold}
                >
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  className={classes.bold}
                >
                  Password
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  style={{ marginTop: 8 }}
                  onClick={() => setOpenDialog(true)}
                >
                  Change password
                </Button>
                <Dialog
                  open={openDialog}
                  // onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                  fullWidth
                >
                  <DialogTitle id="form-dialog-title">
                    Change password
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      label="New password"
                      type="password"
                      style={{ marginBottom: '20px' }}
                      fullWidth
                      autoFocus
                      onChange={(e) => setNewPassword(e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      label="Current password"
                      type="password"
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdatePassword}
                      color="primary"
                      disabled={!password || !newPassword}
                    >
                      Change
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          )}
        </Card>
      </Layout>
    )
  )
}
