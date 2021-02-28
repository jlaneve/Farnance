import React, { useState } from 'react'
import { Container, TextField, InputAdornment, Typography, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
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

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    

    return (<div>
        <Header />
        <Container maxWidth="sm">
            <br /><br />
            <Typography variant="h6" style={{textAlign: "center"}}>
                Make a new open financing offer
            </Typography>

            <br /><br />
            <form onSubmit={handleSubmit}>
                <FormControl style={{width: "70%"}}>
                    <InputLabel id="product-type">Product Type</InputLabel>
                    <Select
                        required
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
                        required
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

                <br />

                <TextField
                    required
                    id="amount"
                    label="Loan Amount"
                    value={amount}
                    onChange={e => setAmount(addCommas(removeNonNumeric(e.target.value)))}
                    style={{width: "48%"}}
                />

                <TextField
                    required
                    id="rate"
                    label="Interest Rate"
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                    style={{width: "48%", marginLeft: "4%"}}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                    }}
                />

                <br /><br />
                <div style={{width: "100%", flex: 1, textAlign: "center", marginTop: "20px"}}>
                    <Button type='submit' variant="contained" color="primary">Create offer</Button>
                </div>
            </form>
        </Container>
    </div>);
}

export default NewOffer;