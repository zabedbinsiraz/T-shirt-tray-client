import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <div className="shop-header">

        <h4 className="heading-title"><strong>T-Shirt Tray</strong></h4>

   <nav>
     <ul>
       <li>
         <Link to="/">Home</Link>
       </li>
       <li>
         <Link to="/admin">Admin</Link>
       </li>
       <li>
         <Link to="/orders">Orders</Link>
       </li>
       <li>
         <Link to="/deals">Deals</Link>
       </li>
       <li>
         <Link to="/login">{loggedInUser.email? <strong>{loggedInUser.buyer}</strong> : 'Login'}</Link>
       </li>
       
      
     </ul>
   </nav>
   </div>
    );
};

export default Header;