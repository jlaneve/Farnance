import React from 'react';
import { Typography, Container } from '@material-ui/core';

import getMarket from '@wasp/queries/getMarket'
import { useQuery } from '@wasp/queries'

import MarketList from "./MarketList.jsx"
import { Redirect } from 'react-router';

import Header from '../Header/Header.jsx';


const Market = (props) => {
    const { user } = props;
    const { data: market, isFetching, error } = useQuery(getMarket)

    console.log(market)

    if (!user) return <Redirect to="/" />

    return (
        <div>
            <Header />
            <Container maxWidth="md" style={{ "marginTop": 50 }}>
                <Typography variant="h6">
                    Welcome to the market!
                </Typography>

                <br /><br />

                {market && <MarketList market={market} />}

                {isFetching && "Fetching..."}

                {error}
            </Container>
        </div>);
}

export default Market;