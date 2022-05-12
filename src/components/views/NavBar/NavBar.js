import { NavLink } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="d-flex justify-content-between my-4 rounded">
      <Navbar.Brand as={NavLink} to="/" className="px-2">Waiter.app</Navbar.Brand>
      <Nav>
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
