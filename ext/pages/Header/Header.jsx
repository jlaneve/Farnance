import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Container } from '@material-ui/core';

import useAuth from '@wasp/auth/useAuth.js'
import logout from '@wasp/auth/logout.js'

const Header = () => {
    const { data: user } = useAuth()

    if (user) {
        return (
            <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" style={{flex: 1, color: "inherit", textDecoration: "none"}}>
                        Farnance
                    </Typography>



                    {user.farmer ?
                        (<Button component={Link} to="new-product">Add Product</Button>) :
                        (<Button component={Link} to="new-offer">Create Financing Offer</Button>)}
                    <Button onClick={() => logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            </div>
        );
    } else {
        return (
            <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" style={{flex: 1, color: "inherit", textDecoration: "none"}}>
                        Farnance
                    </Typography>

                    <Button component={Link} to="/login">Login</Button>
                    <Button component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

export default Header;