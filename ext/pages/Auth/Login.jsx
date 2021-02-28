import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../Header/Header.jsx'

import { Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'

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
      <Container maxWidth="sm">
        <br />
        { submitError && (
            <p style={{color: "red", textAlign: "center"}}> { submitError.message || submitError } </p>
        ) }

        <br />


        <Typography variant="h6" style={{textAlign: "center"}}>
            Sign in to Farnance
        </Typography>

        <br /><br />

        <form onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{width: "100%", marginBottom: "20px"}}
          />

          <TextField
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{width: "100%", marginBottom: "20px"}}
          />

          <br />
          <div style={{flex: 1, textAlign: "center"}}>
            <Button type="submit" variant="contained" color="primary" style={{marginRight: "25px"}}>Sign In</Button>
            <Button href='/register' variant="contained">Sign Up</Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default LoginPage