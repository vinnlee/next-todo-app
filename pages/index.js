import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Container, Button, Typography } from '@material-ui/core'
import Link from 'next/link'

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

function Home() {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography component="h1" variant="h2" align="center" gutterBottom>
        Todo App
      </Typography>
      <Link href="/login" passHref>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          style={{ marginBottom: theme.spacing(2) }}
        >
          Login
        </Button>
      </Link>
      <Link href="/signup" passHref>
        <Button fullWidth variant="outlined" color="primary">
          Register
        </Button>
      </Link>
    </Container>
  )
}

export default Home
