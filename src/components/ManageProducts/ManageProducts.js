import React, { useState } from 'react';
import './ManageProducts.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const ManageProducts = () => {

    const [shirts, setShirts] = useState([]);
    const [editProduct, setEditProduct] = useState({});

    const loadProducts = () => {
        fetch('http://localhost:5555/tShirts')
            .then(res => res.json())
            .then(data => {
                setShirts(data)
            })
    }
    loadProducts();

    const handleDelete = (id) => {
        fetch(`http://localhost:5555/deleteProduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    loadProducts();
                }
            })

    }

    const handleEditProduct = (id) => {
        console.log(id)

    }


    return (
        <div >
            <TableContainer >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Price&nbsp;($)</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            shirts.map(shirt =>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        {shirt.productName}
                                    </TableCell>

                                    <TableCell align="right">{'XL'}</TableCell>

                                    <TableCell align="right">$&nbsp;{shirt.price}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleDelete(shirt._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton fontSize='small' onClick={() => handleEditProduct(shirt._id)}>
                                            <EditIcon />
                                        </IconButton></TableCell>

                                </TableRow>

                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageProducts;