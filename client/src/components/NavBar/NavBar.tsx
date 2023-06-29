import {GiAbstract089} from "react-icons/gi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      {/* <h1>NavBar</h1> */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">
            <GiAbstract089 className="navbar-icon"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-nav-bar"/>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard" >Dashboard</Nav.Link>
              <NavDropdown title="Inventory" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/inventory">View Inventory</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/inventory/new">Add Product</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to="/inventory/upload">Upload</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/inventory/download">Download</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/reports">Reports</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              <NavDropdown title="User" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}