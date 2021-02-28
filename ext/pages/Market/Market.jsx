import React from 'react';
import { Typography, Container } from '@material-ui/core';

import getMarket from '@wasp/queries/getMarket'
import { useQuery } from '@wasp/queries'

import MarketList from "./MarketList.jsx"
import BankMarket from "./BankMarket.jsx"
import { Redirect } from 'react-router';

import Header from '../Header/Header.jsx';


const Market = (props) => {
    const { user } = props;
    const { data: market, isFetching, error } = useQuery(getMarket)

    if (!user) return <Redirect to="/" />

    return (
        <div>
            <Header />
            <Container maxWidth="md" style={{ "marginTop": 50 }}>
                <Typography variant="h6">
                    Welcome to the market! Here, you'll find anonymized previous transactions to add transparency to loan rates.
                </Typography>

                <br /><br />

                {market && <MarketList market={market} />}

                {isFetching && "Fetching..."}

                {error}

                {user.farmer == false ? <div>
                    <br /><br />
                    <Typography variant="h6">
                        As a bank, you also have access to all products that haven't been used as collateral! Click on a product to make a financing offer.
                    </Typography>
                    <br /><br />
                    <BankMarket />
                    <br /><br />
                </div> : ""}
            </Container>
        </div>);
}

export default Market;