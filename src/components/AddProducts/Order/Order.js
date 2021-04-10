import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './Order.css';

const Order = (props) => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { productName, price } = props.shirt;
  const [placeOrder, setPlaceOrder] = useState(false);

  const handleOrderNow = () => {
    const orderDetails = { ...props.shirt, ...loggedInUser };
    const newOrder = {
      productName: orderDetails.productName,
      productPhoto: orderDetails.imageURL,
      price: orderDetails.price,
      desc: orderDetails.desc,
      buyerName: orderDetails.buyer,
      buyerEmail: orderDetails.email,
      date: new Date(),
    }
    fetch('http://localhost:5555/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(data => console.log(data))

    setPlaceOrder(true);
  }

  const classes = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  function createData(name, carbs, protein) {
    return { name, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 24, 4.0),
  ];



  return (
    <div className="checkout-container">
      {
        placeOrder ? <h3>Order Placed Successfully.</h3>
          : <div>
            <div>
              <h2>CHECKOUT</h2>
            </div>

            <div className="checkout-btn">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell align="right">Size</TableCell>
                      <TableCell align="right">Price&nbsp;($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow >
                      <TableCell component="th" scope="row">
                        {productName}
                      </TableCell>
                      <TableCell align="right">{'XL'}</TableCell>
                      <TableCell align="right">$&nbsp;{price}</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {'Total Price'}
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">$&nbsp;{price}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="checkout-btn">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleOrderNow}
              >
                Checkout
         </Button>
            </div>
          </div>
      }

    </div>
  );
};

export default Order;