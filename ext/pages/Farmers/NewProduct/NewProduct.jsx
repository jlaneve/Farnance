import React, { useState } from 'react'
import { Button } from '@material-ui/core';

import Header from '../../Header/Header.jsx'

import products from '../../../products.json';

import createProduct from '@wasp/actions/createProduct';
const productNames = Object.keys(products)

const qualities = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-"];


const NewProduct = () => {
    const [selectedProduct, selectProduct] = useState(productNames[0])
    const [quality, selectQuality] = useState(qualities[0])
    const [quantity, setQuantity] = useState(0)

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await createProduct({ product: selectedProduct, name: products[selectedProduct].name, quality, quantity: parseInt(quantity) })
        } catch (err) {
            console.log(err)
        }
    }
    

    return (<div>
        <Header />
        <form onSubmit={handleSubmit}>
            <h3>Product Type</h3>
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


            <h3>Quantity</h3>
            <input type='text' value={quantity} onChange={e => setQuantity(e.target.value)} />

            <br /><br />

            <input type='submit' value='Add product' />
        </form>
    </div>);
}

export default NewProduct;