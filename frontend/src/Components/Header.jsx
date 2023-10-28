import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link , useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlices'


import { useDispatch } from 'react-redux';

function Header() {

  const { userInfo } = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  async function logoutHandler(){
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Authentication System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to='/' className='px-2'>
              <Navbar.Text>Home</Navbar.Text>
            </Link>
            {userInfo ? (
              <>
              Welcome {userInfo.name}
              <Navbar.Text onClick={logoutHandler}>Logout</Navbar.Text>
              </>
            ) : (
              <>
              <Link to='/Login' className='px-2'>
              <Navbar.Text>Login</Navbar.Text>
            </Link>

            <Link to='/register' className='px-2'>
              <Navbar.Text>Register</Navbar.Text>
            </Link>
              </>
            )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
