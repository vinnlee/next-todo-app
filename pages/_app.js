import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NProgress from 'nprogress'
import UserProvider from '../context/useUser'
import 'nprogress/nprogress.css'
import '../styles/globals.css'

const theme = createMuiTheme({
  spacing: 5,
  palette: {
    primary: {
      main: '#0277bd'
    },
    secondary: {
      main: '#00838f'
    },
    error: {
      main: '#e53935'
    },
    background: {
      default: '#fafafa'
    }
  }
})

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())

    return () => {
      Router.events.off('routeChangeStart', () => NProgress.start())
      Router.events.off('routeChangeComplete', () => NProgress.done())
      Router.events.off('routeChangeError', () => NProgress.done())
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Todo App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
