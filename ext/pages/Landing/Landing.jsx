import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

import Header from '../Header/Header.jsx';

import logo from '../../images/logo.png'
import bgImg from '../../images/farmers.jpg'

import useAuth from '@wasp/auth/useAuth.js'

const Landing = () => {
    const { data: user } = useAuth()

    if (user) {
        return <Redirect to="/home" />
    } else {
        return (
        <div>
            <Header />
            <div id="home" style={{background: "url(" + bgImg + ") no-repeat center fixed"}}>
                <div className="landing-text">
                    <h1>FARNANCE</h1>
                    <h3>Funding Farmers and Smallholders through Digital Assets</h3>
                </div>
            </div>
            <div className="padding">
                <div className="container">
                    <div className="row my-10">
                        <div className="col-sm-6">
                            <img src={logo} style={{"width":"300px","height":"300px"}} />
                        </div>
                        <div className="col-sm-6 text-center">
                            <p className="lead" style={{"paddingTop": "100px"}}>Powered by blockchain, our platform aims to give farmers access to wider range of financing options.</p>
                        </div>
                    </div>
                    <div className="row my-10">
                        <div className="col-sm-6">
                            <p className="lead" style={{"paddingTop": "100px"}}>Farmers secure loans based on production instead of land.</p>
                        </div>
                        <div className="col-sm-6 text-center">
                            <img src="/images/loan.png" style={{"width":"300px","height":"300px"}} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <img src="/images/banksfarms.png" style={{"width":"300px","height":"300px"}} />
                        </div>
                        <div className="col-sm-6 text-center">
                            <p className="lead" style={{"paddingTop": "100px"}}>Banks get direct access to farmers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Landing;