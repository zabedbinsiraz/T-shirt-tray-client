import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Order from '../Order/Order';
import Shirts from '../Shirts/Shirts';
import './Home.css';


const Home = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [buyNow, setBuyNow] = useState(false);
    const [shirt,setShirt] = useState({});
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        fetch('https://fast-beach-99961.herokuapp.com/tShirts')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
            setLoading(false);
    }, [])

    
   
    const handleBuyNow = id => {
        console.log('buy now', id)

        setBuyNow(true);

        fetch(`https://fast-beach-99961.herokuapp.com/tShirt/${id}`)
            .then(res => res.json())
            .then(data => {
              setShirt(data)
              console.log(data)
            })
    }

    return (
        <div>
            
            {
                loading? <p style={{color:'yellow'}}>Loading....</p>
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