import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Orders = () => {
    const [loggedInUser,setLoggedInUser] =  useContext(UserContext);
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        fetch('https://fast-beach-99961.herokuapp.com/allOrders?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setLoading(false)
                console.log(data,'data')
            })
    }, []);
    
    return (
       <div>
           {
               loading? <p>Loading....</p>
               : <div className="form-container">
               <h3>{loggedInUser.buyer} ordered {orders.length} here:</h3>
           
             <TableContainer >
                   <Table >
                       <TableHead>
                           <TableRow>
                               <TableCell>Product Name</TableCell>
                               <TableCell align="right">Size</TableCell>
                               <TableCell align="right">Price&nbsp;($)</TableCell>
                               <TableCell align="right">Placed Order</TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {
                               orders.map(order =>
   
                                   <TableRow >
                                       <TableCell component="th" scope="row">
                                           {order.productName} </TableCell>
   
                                       <TableCell align="right">{'XL'}</TableCell>
   
                                       <TableCell align="right">$&nbsp;{order.price}</TableCell>
                                       <TableCell align="right">{(new Date(order.date).toDateString('dd/MM/yyy'))}</TableCell>
                                      
   
                                   </TableRow>
   
                               )}
                       </TableBody>
                   </Table>
               </TableContainer>
           </div>
           }
       </div>
    );
};

export default Orders;