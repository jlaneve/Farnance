import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

import useAuth from '@wasp/auth/useAuth.js'

import Header from '../Header/Header.jsx';

import FarmersHome from '../Farmers/Home/Home.jsx';

const Home = () => {
    const { data: user } = useAuth()

    return (<div>
        <Header />
        {user.farmer ? <FarmersHome user={user} /> : "Welcome bank"}
    </div>);
}

export default Home;