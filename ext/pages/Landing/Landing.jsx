import React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Grid, Container } from '@material-ui/core';

import Header from '../Header/Header.jsx';

import logo from '../../images/logo.png'
import bgImg from '../../images/farmers.jpg'

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
                    <h1>FARNANCE</h1>
                    <h3>Funding Farmers and Smallholders through Digital Assets</h3>
                </div>
            </div>

        <Container maxWidth="md">
            <Grid container spacing={3}>

            </Grid>
            {/* <div class="row my-10">
                <div class="col-sm-6">
                    <img src="images/logo.png" style="width:300px;height:300px" />
                </div>
                <div class="col-sm-6 text-center">
                    <p class="lead" style="padding-top: 100px;">Powered by blockchain, our platform aims to give farmers access to wider range of financing options.</p>
                </div>
            </div>
            <div class="row my-10">
                <div class="col-sm-6">
                    <p class="lead" style="padding-top: 100px;">Farmers secure loans based on production instead of land.</p>
                </div>
                <div class="col-sm-6 text-center">
                    <img src="images/loan.png" style="width:300px;height:300px">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <img src="images/banksfarms.png" style="width:300px;height:200px">
                </div>
                <div class="col-sm-6 text-center">
                    <p class="lead" style="padding-top: 100px;">Banks get direct access to farmers.</p>
                </div> */}
            </Container>
        </div>);
    }
}

export default Landing;