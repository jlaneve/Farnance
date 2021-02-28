import React from 'react';
import { Card, CardContent, Typography, DataGrid } from '@material-ui/data-grid';



const columns = [
    { field: 'id', headerName: 'Product ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'quality', headerName: 'Quality', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'financingAgreement', headerName: 'Rate (%)', width: 150, valueFormatter: ({ value }) => value.rate }
]

const MarketList = (props) => {
    const { market } = props;
    return (
        <div style={{width: "100%"}}>
            <DataGrid rows={market} columns={columns} autoHeight={true} />
        </div>
    );
}

export default MarketList;