import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

import Header from '../Header/Header.jsx';

import useAuth from '@wasp/auth/useAuth.js'

const Landing = () => {
    const { data: user } = useAuth()

    if (user) {
        return <Redirect to="/home" />
    } else {
        return (<div>
            <Header />
        </div>);
    }
}

export default Landing;