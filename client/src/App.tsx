import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar/NavBar';
import {Routes, Route} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Inventory from './components/Inventory/Inventory';
import AddProduct from './components/Inventory/AddProduct';
import UploadInventory from './components/Inventory/UploadInventory';
import DownloadInventory from './components/Inventory/DownloadInventory';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';
import Authentication from './components/Authentication/Authentication';
import SignUpWithEmail from './components/Authentication/SignUp/SignUpWithEmail/SignUpWithEmail';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/inventory">
          <Route path="" element={<Inventory/>}/>
          <Route path="new" element={<AddProduct/>}/>
          <Route path="upload" element={<UploadInventory/>}/>
          <Route path="download" element={<DownloadInventory/>}/>
        </Route>
        <Route path="/authentication">
          <Route path="" element={<Authentication/>}/>
          <Route path="signup/email" element={<SignUpWithEmail/>}/>
        </Route>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </>
  );
}

export default App;
