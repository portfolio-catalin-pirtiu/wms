import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { GiAbstract089 } from 'react-icons/gi';

export default function NavPublic() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <GiAbstract089 className="navbar-icon" />
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/demo">
              Demo
            </Nav.Link>
            <Nav.Link href="/price">Price</Nav.Link>
            <Nav.Link as={Link} to="/authentication/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/authentication/signup">
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
