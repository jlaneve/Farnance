import React, { useState } from 'react'
import { Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header.jsx'

import products from '../../products.json';

import createOffer from '@wasp/actions/createOffer';
const productNames = Object.keys(products)

const qualities = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-"];


const NewOffer = () => {
    const [selectedProduct, selectProduct] = useState(productNames[0])
    const [quality, selectQuality] = useState(qualities[0])
    const [amount, setAmount] = useState(0)
    const [rate, setRate] = useState(0)

    const history = useHistory()

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await createOffer({
                amount: parseInt(amount),
                rate: parseFloat(rate),
                productType: selectedProduct,
                quality: quality
            })
            history.push("/home")
        } catch (err) {
            console.log(err)
        }
    }
    

    return (<div>
        <Header />
        <Container maxWidth="md">
            <form onSubmit={handleSubmit}>
                <h3>Product</h3>
                <select value={selectedProduct} onChange={e => selectProduct(e.target.value)}>
                    {productNames.map(productName => 
                        <option key={productName} value={productName}>{products[productName].name}</option>
                    )}
                </select>


                <h3>Quality</h3>
                <select value={quality} onChange={e => selectQuality(e.target.value)}>
                    {qualities.map(quality => 
                        <option key={quality} value={quality}>{quality}</option>
                    )}
                </select>


                <h3>Loan Amount</h3>
                <input type='text' value={amount} onChange={e => setAmount(e.target.value)} />

                <h3>Interest Rate (%)</h3>
                <input type='text' value={rate} onChange={e => setRate(e.target.value)} />

                <br /><br />

                <input type='submit' value='Create financing offer' />
            </form>
        </Container>
    </div>);
}

export default NewOffer;