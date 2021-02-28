import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Link } from "@material-ui/core"

import { useHistory } from 'react-router-dom'

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
    const history = useHistory()

    const { data: bankMarket, isFetching, error } = useQuery(getBankMarket)
    const [selection, setSelection] = useState()

    const selectedProduct = selection ? bankMarket.filter(product => product.id == selection)[0] : null;

    return (
        <div style={{width: "100%"}}>
            {bankMarket && <DataGrid
                rows={bankMarket}
                columns={columns}
                autoHeight={true}
                onSelectionModelChange={({ selectionModel }) => setSelection(selectionModel[0])}
            />}
            <br />

            {selectedProduct ?
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/new-offer/?product=" + selectedProduct.type + "&quality=" + selectedProduct.quality)}
                >
                    Create offer for {selectedProduct.quality} {selectedProduct.name}
                </Button>
            : ""}
        </div>
    );
}

export default BankMarket;