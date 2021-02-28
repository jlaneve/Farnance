import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../Header/Header.jsx'
import { Container } from '@material-ui/core'

import login from '@wasp/auth/login'
import signup from '@wasp/auth/signup'

export default () => {
  const history = useHistory()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [submitError, setSubmitError] = useState()
  const [userType, setUserType] = useState("farmer")

  // TODO: Do validation in form and show validation errors.
  // TODO: Turn into material-ui

  const handleSubmit = async (event) => {
    console.log({ username, email, password, userType })
    event.preventDefault()
    setSubmitError(null)
    try {
      await signup({ username, email, password, farmer: userType == "farmer" })
      await login(email, password)
      history.push('/')
    } catch (err) {
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
          <h2> Full Name </h2>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

          <h2> Email </h2>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

          <h2> Password </h2>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <h2> User Type </h2>
          <select value={userType} onChange={e => setUserType(e.target.value)}>
              <option value="farmer">Farmer</option>
              <option value="bank">Bank</option>
          </select>


          <br />
          <input type='submit' value='Sign up' />
        </form>
      </Container>
    </div>
  )
}