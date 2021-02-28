import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../Header/Header.jsx'

import { Container } from '@material-ui/core'

import login from '@wasp/auth/login.js'


// TODO: Convert to material ui

const LoginPage = () => {
  const history = useHistory()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [submitError, setSubmitError] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError(null)
    try {
      await login(email, password)
      history.push('/')
    } catch (err) {
      // TODO: If error is 401, inform user that either username or password is not right.
      setSubmitError(err)
    }
  }

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        { submitError && (
            <p> { submitError.message || submitError } </p>
        ) }

        <form onSubmit={handleSubmit}>
          <h2> Email </h2>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

          <h2> Password </h2>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <br />
          <input type='submit' value='Sign in' />
        </form>
      </Container>
    </div>
  )
}

export default LoginPage