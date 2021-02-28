import React from 'react';
import { Card, CardContent, Typography, DataGrid } from '@material-ui/data-grid';


import products from '../../products.json';

const bankColumns = [
    { field: 'id', headerName: 'Offer ID', width: 120 },
    { field: 'productType', headerName: 'Product Type', width: 180, valueFormatter: ({ value }) => products[value].name},
    { field: 'quality', headerName: 'Quality', width: 120 },
    { field: 'totalCapacity', headerName: 'Original Capacity', width: 175 },
    { field: 'remainingCapacity', headerName: 'Remaining Capacity', width: 180 },
    { field: 'rate', headerName: 'Rate (%)', width: 120 },
]

const farmerColumns = [
    { field: 'id', headerName: 'Offer ID', width: 120 },
    { field: 'productType', headerName: 'Product Type', width: 360, valueFormatter: ({ value }) => products[value].name},
    { field: 'quality', headerName: 'Quality', width: 120 },
    { field: 'remainingCapacity', headerName: 'Amount', width: 180 },
    { field: 'rate', headerName: 'Rate (%)', width: 120 },
]

const OfferList = (props) => {
    const { offers, selection, onSelectionChange, bank } = props;
    return (
        <div style={{width: "100%"}}>
            <DataGrid
                rows={offers}
                columns={bank ? bankColumns : farmerColumns}
                autoHeight={true}
                disableClickEventBubbling={!selection}
                onSelectionModelChange={({ selectionModel }) => onSelectionChange(selectionModel[0])}
            />
        </div>
    );
}

export default OfferList;