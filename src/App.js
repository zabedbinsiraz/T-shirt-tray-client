import './App.css'
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import Home from "./components/Home/Home";
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import Deals from './components/Deals/Deals'
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



export const UserContext = createContext();
const App = () => { 
  const [loggedInUser,setLoggedInUser]= useState({});
 
  return (
   
     <UserContext.Provider value={[loggedInUser,setLoggedInUser]} >
    <h2>{loggedInUser.name}</h2>
      <Router>
    
      <Header></Header>
     
      <Switch>

      <Route path="/home">
       <Home></Home>
        </Route>
        <PrivateRoute path="/admin">
          <Admin></Admin>
        </PrivateRoute>
        <PrivateRoute path="/orders">
          <Orders></Orders>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/deals">
          <Deals></Deals>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
  
      </Switch>
    
  </Router>
   </UserContext.Provider>
   
  );
};

export default App;
