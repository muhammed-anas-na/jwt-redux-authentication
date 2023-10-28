import {useState, useEffect} from 'react'
import {Link , useNavigate} from 'react-router-dom';
import {Form , Button , Row, Col} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import {useDispatch , useSelector} from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlices';
import {toast} from 'react-toastify';



function LoginScreen() {
    const [email,setEmail]  = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login , {isLoding , error}] = useLoginMutation();
    
    const {userInfo} = useSelector((state)=>state.auth)
    
    useEffect(()=>{
      if(userInfo){
        navigate('/');
      }
    } , [navigate , userInfo])


    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
          const res = await login({email , password}).unwrap();
          console.log(res)
          dispatch(setCredentials({...res}))
          navigate('/')
        }catch(err){
          console.log(err.data.message)
          toast.error(err.data.message)
        }
    }
  return (
    <FormContainer>  
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            >
            </Form.Control>
            {isLoding && <h2>Loading....</h2>}
            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>
            <Row className='py-3'>
                <Col>New Customer?<Link to='/register'>Register</Link></Col>
            </Row>
            <Row><Link to='/admin'>Admin?</Link></Row>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
