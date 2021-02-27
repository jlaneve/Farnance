import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';

import useAuth from '@wasp/auth/useAuth.js'
import logout from '@wasp/auth/logout.js'

const Header = () => {
    const { data: user } = useAuth()

    if (user) {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" style={{color: "inherit", textDecoration: "none"}}>
                        Farnance
                    </Typography>

                    <Button component={Link} to="/new">Add Product</Button>

                    <Button onClick={() => logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
        );
    } else {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" style={{color: "inherit", textDecoration: "none"}}>
                        Farnance
                    </Typography>

                    <Button component={Link} to="/login">Login</Button>
                    <Button component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;