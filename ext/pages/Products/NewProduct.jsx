import React, { useState } from 'react'
import { Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header.jsx'

import products from '../../products.json';

import createProduct from '@wasp/actions/createProduct';
const productNames = Object.keys(products)

const qualities = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-"];


const NewProduct = () => {
    const [selectedProduct, selectProduct] = useState(productNames[0])
    const [quality, selectQuality] = useState(qualities[0])
    const [quantity, setQuantity] = useState()

    const history = useHistory()

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await createProduct({ product: selectedProduct, name: products[selectedProduct].name, quality, quantity: parseInt(quantity) })
            history.push("/home")
        } catch (err) {
            console.log(err)
        }
    }

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    

    return (<div>
        <Header />
        <Container maxWidth="sm">
            <br /><br />
            <Typography variant="h6" style={{textAlign: "center"}}>
                Register a new product
            </Typography>

            <br /><br />
            <form onSubmit={handleSubmit}>
                
                <FormControl style={{width: "40%"}}>
                    <InputLabel id="product-type">Product Type</InputLabel>
                    <Select
                        labelId="product-type"
                        value={selectedProduct}
                        onChange={e => selectProduct(e.target.value)}
                        style={{width: "100%", marginBottom: "20px"}}
                    >
                        {productNames.map(productName => 
                            <MenuItem key={productName} value={productName}>{products[productName].name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl style={{width: "25%", marginLeft: "5%"}}>
                    <InputLabel id="quality">Quality</InputLabel>
                    <Select
                        labelId="quality"
                        value={quality}
                        onChange={e => selectQuality(e.target.value)}
                        style={{width: "100%", marginBottom: "20px"}}
                    >
                        {qualities.map(quality => 
                            <MenuItem key={quality} value={quality}>{quality}</MenuItem>
                        )}
                    </Select>
                </FormControl>


                <TextField
                    required
                    id="quantity"
                    label="Quantity"
                    defaultValue={0}
                    value={quantity}
                    onChange={e => setQuantity(addCommas(removeNonNumeric(e.target.value)))}
                    style={{width: "25%", marginLeft: "5%"}}
                />

                <br /><br />
                <div style={{width: "100%", flex: 1, textAlign: "center"}}>
                    <Button type='submit' variant="contained" color="primary">Add product</Button>
                </div>
            </form>
        </Container>
    </div>);
}

export default NewProduct;