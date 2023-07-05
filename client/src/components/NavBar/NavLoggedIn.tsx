import { GiAbstract089 } from 'react-icons/gi';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/AuthenticationProvider';
import { useContext } from 'react';

export default function NavLoggedIn() {
  const {user} = useContext(AuthenticationContext);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">
            <GiAbstract089 className="navbar-icon" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <NavDropdown title="Inventory" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/inventory">
                View Inventory
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/inventory/new">
                Add Product
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/inventory/upload">
                Upload
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/inventory/download">
                Download
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/reports">Reports</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={user.name} id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
