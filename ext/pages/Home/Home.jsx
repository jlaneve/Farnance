import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

import useAuth from '@wasp/auth/useAuth.js'

import Header from '../Header/Header.jsx';

const Home = () => {
    const { data: user } = useAuth()

    console.log(user)

    return (<div>
        <Header />
        <Typography variant="h6">
            Welcome {user.username}
        </Typography>
    </div>);
}

export default Home;