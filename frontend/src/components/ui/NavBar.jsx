import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function NavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        
          <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/transactions">Your Transactions</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        
      </Navbar>
    </>
  );
}
export default NavBar;