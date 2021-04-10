import React from 'react';
import './Admin.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddProducts from '../AddProducts/AddProducts';
import ManageProducts from '../ManageProducts/ManageProducts';


const Admin = () => {
    return (



        <Router>


           <div className="admin-container">
           <div className="manage-section">
                <Link to="/manageProducts"># Manage Products</Link>
                <Link to="/addProducts">+ Add Products</Link>

            </div>

            <Switch>

                <Route path="/manageProducts">
                    <ManageProducts></ManageProducts>
                </Route>
                <Route path="/addProducts">
                    <AddProducts></AddProducts>
                </Route>


            </Switch>
           </div>


        </Router>



    );
};

export default Admin;