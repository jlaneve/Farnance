import React from 'react';
import { Card, CardContent, Typography, DataGrid } from '@material-ui/data-grid';

import getBankMarket from '@wasp/queries/getBankMarket'
import { useQuery } from '@wasp/queries'

const addCommas = ({ value }) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const columns = [
    { field: 'id', headerName: 'Product ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'quality', headerName: 'Quality', width: 150 },
    { field: 'quantity', headerName: 'Quantity', type: "number", width: 150, valueFormatter: addCommas },
    { field: 'owner', headerName: 'Owner', width: 150, valueFormatter: ({ value }) => value.username }
]

const BankMarket = (props) => {
    const { market } = props;

    const { data: bankMarket, isFetching, error } = useQuery(getBankMarket)

    return (
        <div style={{width: "100%"}}>
            {bankMarket && <DataGrid
                rows={bankMarket}
                columns={columns}
                autoHeight={true}
            />}
        </div>
    );
}

export default BankMarket;