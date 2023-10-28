import {useState, useEffect} from 'react'
import {Link , useNavigate} from 'react-router-dom';
import {Form , Button} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import {useDispatch , useSelector} from 'react-redux'
import { setCredentials } from '../slices/adminSlice';
import {toast} from 'react-toastify';
import { useAdminLoginMutation } from '../slices/adminApiSlice';
import LoginScreen from './LoginScreen';

function AdminLoginScreen() {
    const [email,setEmail]  = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {adminInfo} = useSelector((state)=>state.admin)
    const [admin , {isLoading}] = useAdminLoginMutation();
    console.log(adminInfo)
    useEffect(()=>{
      if(adminInfo){
        navigate('/admin-dash');
      }
    } , [navigate , adminInfo])


    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
          const res = await admin({email,password}).unwrap();
          dispatch(setCredentials({...res}))
          navigate('/admin-dash')
        }catch(err){
          console.log("Errorrr : ",err.data.message)
          toast.error(err.data.message);
        }

    }
  return (
    <FormContainer>  
      <h1>Admin login</h1>
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
            {isLoading && <p>Loading....</p>}
            <Button type='submit' variant='primary' className='mt-3'>
                Login as admin
            </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default AdminLoginScreen
