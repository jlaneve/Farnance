import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../Header/Header.jsx'
import { Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'

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
      <Container maxWidth="sm">
        <br />
        { submitError && (
            <p style={{color: "red", textAlign: "center"}}> { submitError.message || submitError } </p>
        ) }

        <br />


        <Typography variant="h6" style={{textAlign: "center"}}>
            Register for Farnance
        </Typography>

        <br /><br />

        <form style={{width: "100%"}} onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            label="Full Name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{width: "100%", marginBottom: "20px"}}
          />

          <br />

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

          <FormControl>
            <InputLabel id="user-type">User Type</InputLabel>
            <Select
              labelId="user-type"
              value={userType}
              onChange={e => setUserType(e.target.value)}
              style={{width: "100%", marginBottom: "20px"}}
              >
                <MenuItem value="farmer">Farmer</MenuItem>
                <MenuItem value="bank">Bank</MenuItem>
            </Select>
          </FormControl>


          <br />

          <div style={{flex: 1, textAlign: "center"}}>
            <Button href="/login" variant="contained" style={{marginRight: "25px"}}>Sign In</Button>
            <Button type='submit' variant="contained" color="primary">Sign Up</Button>
          </div>
        </form>
      </Container>
    </div>
  )
}