import React from 'react';
import { Card, CardContent, Typography, DataGrid } from '@material-ui/data-grid';


import products from '../../products.json';

const addCommas = ({ value }) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const bankColumns = [
    { field: 'id', headerName: 'Offer ID', width: 120 },
    { field: 'productType', headerName: 'Product Type', width: 180, valueFormatter: ({ value }) => products[value].name},
    { field: 'quality', headerName: 'Quality', width: 120 },
    { field: 'totalCapacity', headerName: 'Original Capacity', type: "number", width: 175, valueFormatter: addCommas },
    { field: 'remainingCapacity', headerName: 'Remaining Capacity', type: "number", width: 180, valueFormatter: addCommas },
    { field: 'rate', headerName: 'Rate (%)', type: "number", width: 120 },
]

const farmerColumns = [
    { field: 'id', headerName: 'Offer ID', width: 120 },
    { field: 'productType', headerName: 'Product Type', width: 360, valueFormatter: ({ value }) => products[value].name},
    { field: 'quality', headerName: 'Quality', width: 120 },
    { field: 'remainingCapacity', headerName: 'Amount', type: "number", width: 180, valueFormatter: addCommas },
    { field: 'rate', headerName: 'Rate (%)', type: "number", width: 120 },
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
                onSelectionModelChange={selection ? ({ selectionModel }) => onSelectionChange(selectionModel[0]) : true}
            />
        </div>
    );
}

export default OfferList;