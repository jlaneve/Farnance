import React from 'react';
import { AppBar, Typography, Container } from '@material-ui/core';

import getOffers from '@wasp/queries/getOffers'
import getProducts from '@wasp/queries/getProducts'
import { useQuery } from '@wasp/queries'

import OfferList from "../Offers/OfferList.jsx"
import { Redirect } from 'react-router';

import ProductList from "../Products/ProductList.jsx";


const BankHome = (props) => {
    const { user } = props;
    const { data: offers, isFetching, error } = useQuery(getOffers)
    const { data: products, isFetchingProducts, errorProducts } = useQuery(getProducts)

    if (!user) return <Redirect to="/" />

    return (
        <Container maxWidth="md" style={{ "marginTop": 50 }}>
            <Typography variant="h6">
                Welcome, {user.username}. Here are your extended offers:
            </Typography>

            <br /><br />

            {offers && <OfferList bank={true} offers={offers} />}

            <br /><br />

            <Typography variant="h6">
                Here are the products you have as collateral:
            </Typography>

            <br /><br />

            {products && <ProductList products={products} />}

            {isFetching && "Fetching..."}
            {error && "Error: " + error}

            <br /><br />
        </Container>);
}

export default BankHome;