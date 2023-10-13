import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthenticationProvider';
import Dashboard from '../../pages/private/Dashboard/Dashboard';
import Inventory from '../../pages/private/Inventory/Inventory';
import { AddProduct } from '@features/inventory';
import { UploadInventory } from '@features/inventory';
import { DownloadInventory } from '@features/inventory';
import Reports from '../../pages/private/Reports/Reports';
import UserAccount from '../../pages/private/UserAccount/UserAccount';
import Logout from '../../pages/private/UserAccount/Logout/Logout';
import Home from '../../pages/public/Home/Home';
import Authentication from '../../pages/public/Authentication/Authentication';
import SignUpWithEmail from '../../pages/public/SignUp/SignUpWithEmail/SignUpWithEmail';
import Login from '../../pages/public/Login/Login';
import SignUp from '../../pages/public/SignUp/SignUp';
import Demo from '../../pages/public/Demo/Demo';
import Price from '../../pages/public/Price/Price';
import NotFound from '../../pages/public/NotFound/NotFound';

export default function NavRoutes() {
  const { user } = useContext(AuthenticationContext);
  const navigateToAuthentication = <Navigate to={'/authentication/login'} />;

  return (
    <Routes>
      <Route
        path="/"
        element={user.isLoggedIn ? <Navigate to={'/dashboard'} /> : <Home />}
      />
      <Route
        path="/dashboard"
        element={user.isLoggedIn ? <Dashboard /> : navigateToAuthentication}
      />
      <Route path="/inventory">
        <Route
          path="/inventory"
          element={user.isLoggedIn ? <Inventory /> : navigateToAuthentication}
        />
        <Route
          path="new"
          element={user.isLoggedIn ? <AddProduct /> : navigateToAuthentication}
        />
        <Route
          path="upload"
          element={
            user.isLoggedIn ? <UploadInventory /> : navigateToAuthentication
          }
        />
        <Route
          path="download"
          element={
            user.isLoggedIn ? <DownloadInventory /> : navigateToAuthentication
          }
        />
      </Route>
      <Route
        path="/authentication/*"
        element={
          user.isLoggedIn ? (
            <Navigate to={'/dashboard'} />
          ) : (
            <Routes>
              <Route>
                <Route path="/" element={<Authentication />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="signup/email" element={<SignUpWithEmail />} />
              </Route>
            </Routes>
          )
        }
      ></Route>
      <Route
        path="/reports"
        element={user.isLoggedIn ? <Reports /> : navigateToAuthentication}
      />
      <Route path="/user">
        <Route
          path="logout"
          element={user.isLoggedIn ? <Logout /> : navigateToAuthentication}
        />
        <Route
          path="account"
          element={user.isLoggedIn ? <UserAccount /> : navigateToAuthentication}
        />
      </Route>
      <Route path="/demo" element={<Demo />} />
      <Route path="/price" element={<Price />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
