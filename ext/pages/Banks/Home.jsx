import React from 'react';
import { AppBar, Typography, Container } from '@material-ui/core';

import getProducts from '@wasp/queries/getOffers'
import { useQuery } from '@wasp/queries'

import ProductList from "../Products/ProductList.jsx"
import { Redirect } from 'react-router';


const BankHome = (props) => {
    const { user } = props;
    const { data: products, isFetching, error } = useQuery(getProducts)

    if (!user) return <Redirect to="/" />

    return (
        <Container maxWidth="md" style={{ "marginTop": 50 }}>
            <Typography variant="h6">
                Welcome {user.username}. Here are your products:
            </Typography>

            <br /><br /><br />
            {products && <ProductList products={products} />}

            {isFetching && "Fetching..."}
            {error && "Error: " + error}
        </Container>);
}

export default BankHome;