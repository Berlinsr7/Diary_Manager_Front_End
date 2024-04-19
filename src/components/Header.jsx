import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Header() {
  let navigate = useNavigate()
  return <>
  <div className='container-fluid text-center'>
    <h1 className="h2 bg-black text-light p-3 fw-bold permanent-marker-regular">My Diary</h1>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src="diaryLogo.jpg" className='me-2 mb-1' style={{height:"30px"}}/>My Diary</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate("/calander")}>Calander</Nav.Link>
            <Nav.Link onClick={()=>navigate("/notes")}>Notes</Nav.Link>
            <Nav.Link onClick={()=>{
              toast.success("Logout Successfull")
              navigate("/login")
            }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  </>
}

export default Header