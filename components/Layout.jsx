import React from 'react'
import { Container } from '@material-ui/core'
import Head from 'next/head'
import MenuBar from './MenuBar'

export default function Layout({ children, title = '' }) {
  return (
    <React.Fragment>
      <Head>
        <title>{title} - Todo App</title>
      </Head>
      <Container maxWidth={false} disableGutters={true}>
        <MenuBar title={title} />
        {children}
      </Container>
    </React.Fragment>
  )
}
