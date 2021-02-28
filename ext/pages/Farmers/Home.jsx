import React, { useState } from 'react';
import { Button, Typography, Container } from '@material-ui/core';

import getProducts from '@wasp/queries/getProducts'
import getAvailableFinancing from '@wasp/queries/getAvailableFinancing'
import acceptFinancingOffer from '@wasp/actions/acceptFinancingOffer';
import { useQuery } from '@wasp/queries'

import ProductList from "../Products/ProductList.jsx"
import { Redirect } from 'react-router';

import OfferList from "../Offers/OfferList.jsx"


const FarmerHome = (props) => {
    const { user } = props;
    const { data: products, isFetching, error } = useQuery(getProducts)
    const { data: availableFinancing, isFetchingFinancing, errorFinancing } = useQuery(getAvailableFinancing)

    const [offerId, setOfferId] = useState()

    if (!user) return <Redirect to="/" />

    return (
        <Container maxWidth="md" style={{ "marginTop": 50 }}>
            <Typography variant="h6">
                Welcome, {user.username}. Here are your products:
            </Typography>

            <br /><br />

            {products && <ProductList products={products} farmer={true} />}

            <br /><br />

            <Typography variant="h6">
                Here are the available financing offers for your products:
            </Typography>

            <br /><br />

            {availableFinancing && <OfferList
                offers={availableFinancing}
                selection={true}
                onSelectionChange={offerId => setOfferId(parseInt(offerId))} // returns offer id
                />}

            {offerId ? <Button variant="contained" color="primary" onClick={() => acceptFinancingOffer({ offerId })}>Accept Offer</Button> : ""}

            {isFetching && "Fetching..."}
            {error && "Error: " + error}

            <br /><br />
        </Container>);
}

export default FarmerHome;