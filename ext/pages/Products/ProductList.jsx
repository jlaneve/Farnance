import React from 'react';
import { Card, CardContent, Typography, DataGrid } from '@material-ui/data-grid';



const farmerColumns = [
    { field: 'id', headerName: 'Product ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'quality', headerName: 'Quality', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'agreementId', headerName: 'Collateral?', width: 150, valueFormatter: ({ value }) => value ? "Yes" : "No" },
]

const bankColumns = [
    { field: 'id', headerName: 'Product ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 225 },
    { field: 'quality', headerName: 'Quality', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'owner', headerName: 'Farmer', width: 250, valueFormatter: ({ value }) => value.username },
]

const ProductList = (props) => {
    const { products, farmer } = props;
    console.log(products)
    return (
        <div style={{width: "100%"}}>
            <DataGrid rows={products} columns={farmer ? farmerColumns : bankColumns} autoHeight={true} />
        </div>
    );
}

export default ProductList;