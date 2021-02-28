import React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Grid, Container, Button, Link, AppBar, Toolbar } from '@material-ui/core';

import Header from '../Header/Header.jsx';

import Favorite from '@material-ui/icons/Favorite';


import logo from '../../images/logo.png'
import bgImg from '../../images/farmers.jpg'
import collateral from '../../images/collateral.png'
import loan from '../../images/loan.png'


import useAuth from '@wasp/auth/useAuth.js'

import '../../Main.css'

const Landing = () => {
    const { data: user } = useAuth()

    if (user) {
        return <Redirect to="/home" />
    } else {
        return (
        <div>
            <Header />
            <div id="home" style={{background: "url(" + bgImg + ") no-repeat center fixed", height: "500px"}}>
                <div className="landing-text">
                    <Typography variant="h1">
                        Farnance
                    </Typography>
                    <Typography variant="h5">
                        Funding Farmers and Smallholders through Digital Assets
                    </Typography>
                </div>
            </div>

            <Container maxWidth="md">
                <Grid container spacing={3} style={{paddingTop: "100px"}}>
                    <Grid item xs={6}>
                        <img src={logo} style={{ width: "50%", marginLeft: "25%" }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6" style={{top: "50%", transform: "translateY(-50%)", position: "relative"}}>
                            Powered by blockchain, our platform aims to give farmers access to wider range of financing options.
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6" style={{top: "60%", transform: "translateY(-70%)", position: "relative"}}>
                            Farmers can secure loans based on production instead of land.
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <img src={collateral} style={{ width: "50%", marginLeft: "25%", marginTop: "25%" }} />
                    </Grid>

                    <Grid item xs={6}>
                        <img src={loan} style={{ width: "50%", marginLeft: "25%", marginTop: "25%" }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6" style={{top: "60%", transform: "translateY(-70%)", position: "relative"}}>
                            Banks get direct access to farmers, can create loans on the open markets, and understand what their customers are willing to pay.
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant="h4" style={{paddingTop: "100px", textAlign: "center"}}>
                    Ready to give it a try?
                </Typography>

                <div style={{marginTop: "30px", marginBottom: "30px", textAlign: "center"}}>
                    <Button style={{fontSize: "125%"}} variant="contained" component={Link} href="/login">Login</Button>
                    <Button style={{marginLeft: "40px", fontSize: "125%"}} variant="contained" color="primary" component={Link} href="/register">Register</Button>
                </div>

                <br /><br /><br /><br /><br />
            </Container>

            <AppBar position="static" style={{top: "auto", bottom: 0}}>
                <Toolbar>
                    <div style={{textAlign: "center", margin: "auto"}}>Made with <Favorite style={{fontSize: "14px"}} /> at <a href="hacklbs.org" style={{color: "white", textDecoration: "underline white dotted 3px"}}>HackLBS 2021</a>.</div>
                </Toolbar>
            </AppBar>
        </div>);
    }
}

export default Landing;