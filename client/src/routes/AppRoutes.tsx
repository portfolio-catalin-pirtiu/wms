import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationProvider';
import Dashboard from '../components/Dashboard/Dashboard';
import Inventory from '../components/Inventory/Inventory';
import AddProduct from '../components/Inventory/AddProduct';
import UploadInventory from '../components/Inventory/UploadInventory';
import DownloadInventory from '../components/Inventory/DownloadInventory';
import Reports from '../components/Reports/Reports';
import Settings from '../components/Settings/Settings';
import Logout from '../components/Logout/Logout';
import Home from '../components/Home/Home';
import Authentication from '../components/Authentication/Authentication';
import SignUpWithEmail from '../components/Authentication/SignUp/SignUpWithEmail/SignUpWithEmail';
import Login from '../components/Authentication/Login/Login';
import SignUp from '../components/Authentication/SignUp/SignUp';
import Demo from '../components/public/Demo';
import Price from '../components/public/Price';
import NotFound from '../components/NotFound/NotFound';

export default function AppRoutes() {
  const { user } = useContext(AuthenticationContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={user.isLoggedIn ? <Dashboard /> : <Login/>} />
      <Route path="/inventory">
        <Route path="" element={<Inventory />} />
        <Route path="new" element={<AddProduct />} />
        <Route path="upload" element={<UploadInventory />} />
        <Route path="download" element={<DownloadInventory />} />
      </Route>
      <Route path="/authentication">
        <Route path="" element={<Authentication />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="signup/email" element={<SignUpWithEmail />} />
      </Route>
      <Route path="/reports" element={<Reports />} />
      <Route path="/user">
        <Route path="logout" element={<Logout />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/demo" element={<Demo />} />
      <Route path="/price" element={<Price />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
