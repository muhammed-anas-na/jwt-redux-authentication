import {useState , useEffect} from 'react'
import {Link , useNavigate} from 'react-router-dom';
import {Form , Button , Row, Col} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import {useDispatch , useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlices';

function RegisterScreen() {
    const [email,setEmail]  = useState('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //const {userInfo} = useSelector((state)=>{state.auth})
    const [register , {isLoading}] = useRegisterMutation();
     

    const submitHandler = async(e) =>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Enter the same password");
        }else{
            try{
                const res = await register({name,email,password}).unwrap();
                console.log(res);
                dispatch(setCredentials({...res}))
                navigate('/');
            }catch(err){
                toast.error(err.data.message);
            }
        }
    }

  return (
    <FormContainer>  
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

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
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>
            <Row className='py-3'>
                <Col>Already have an account<Link to='/login'>Login?</Link></Col>
            </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
