import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationProvider';
import Dashboard from '../components/Dashboard/Dashboard';
import Inventory from '../components/Inventory/Inventory';
import AddProduct from '../components/Inventory/AddProduct';
import UploadInventory from '../components/Inventory/UploadInventory';
import DownloadInventory from '../components/Inventory/DownloadInventory';
import Reports from '../components/Reports/Reports';
import UserAccount from '../components/UserAccount/UserAccount';
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
      <Route
        path="/dashboard"
        element={
          user.isLoggedIn ? (
            <Dashboard />
          ) : (
            <Navigate to={'/authentication/login'} />
          )
        }
      />
      <Route
        path="/inventory"
        element={
          user.isLoggedIn ? (
            <Inventory />
          ) : (
            <Navigate to={'/authentication/login'} />
          )
        }
      >
        <Route path="new" element={<AddProduct />} />
        <Route path="upload" element={<UploadInventory />} />
        <Route path="download" element={<DownloadInventory />} />
      </Route>
      <Route
        path="/authentication"
        element={
          user.isLoggedIn ? <Navigate to={'/dashboard'} /> : <Authentication />
        }
      >
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login/>} />
        <Route path="signup/email" element={<SignUpWithEmail />} />
      </Route>
      <Route
        path="/reports"
        element={
          user.isLoggedIn ? (
            <Reports />
          ) : (
            <Navigate to={'/authentication/login'} />
          )
        }
      />
      <Route path="/user">
        <Route
          path="logout"
          element={
            user.isLoggedIn ? (
              <Logout />
            ) : (
              <Navigate to={'/authentication/login'} />
            )
          }
        />
        <Route
          path="account"
          element={
            user.isLoggedIn ? (
              <UserAccount />
            ) : (
              <Navigate to={'/authentication/login'} />
            )
          }
        />
      </Route>
      <Route path="/demo" element={<Demo />} />
      <Route path="/price" element={<Price />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
