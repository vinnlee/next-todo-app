import React from 'react'
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { useUser } from '../context/useUser'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function Login() {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { login } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Typography component="h1" variant="h2" align="center">
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Create one now.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
