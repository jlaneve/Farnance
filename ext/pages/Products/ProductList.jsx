import React from 'react';
import { Card, CardContent, Typography, DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 360 },
    { field: 'quality', headerName: 'Quality', width: 180 },
    { field: 'quantity', headerName: 'Quantity', width: 180 },
]

const ProductList = (props) => {
    const { products } = props;
    return (
        <div style={{width: "100%", height: 800}}>
            <DataGrid rows={products} columns={columns} autoHeight={true} />
        </div>
    );
}

export default ProductList;