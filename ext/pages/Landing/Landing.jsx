import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';


const Landing = () => {
    return (<AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Farnance
            </Typography>
        </Toolbar>
    </AppBar>);
}

export default Landing;