import React, { useContext, useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import Order from '../AddProducts/Order/Order';
import Shirts from '../Shirts/Shirts';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const Home = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [buyNow, setBuyNow] = useState(false);
    const [shirt,setShirt] = useState({});
    const [loading,setLoading] = useState(true);
    

const classes = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
    


    useEffect(() => {
        fetch('http://localhost:5555/tShirts')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
            setLoading(false);
    }, [])

    
   
    const handleBuyNow = id => {
        console.log('buy now', id)

        setBuyNow(true);

        fetch(`http://localhost:5555/tShirt/${id}`)
            .then(res => res.json())
            .then(data => {
              setShirt(data)
              console.log(data)
            })
    }

    return (
        <div>
            {
                loading? <div className={classes.root}>
                <CircularProgress />
                <CircularProgress color="secondary" />
              </div>
                :  <div>
                {  buyNow ? <PrivateRoute>
                     <Order shirt={shirt}></Order>
                 </PrivateRoute>
     
                     : <div className="card-container">
                         {
                             products.map(tShirt => <Shirts handleBuyNow={handleBuyNow} tShirt={tShirt}></Shirts>)
                         }
                     </div>
                 }
                </div>
            }
          

        </div>
    );
};

export default Home;