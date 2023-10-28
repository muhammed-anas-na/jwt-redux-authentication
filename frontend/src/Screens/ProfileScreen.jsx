import {useState , useEffect} from 'react'
import {Link , useNavigate} from 'react-router-dom';
import {Form , Button} from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import {useDispatch , useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import { setCredentials } from '../slices/authSlices';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

function ProfileScreen() {
    const [email,setEmail]  = useState('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const { userInfo } = useSelector((state)=>state.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch();
     
    const [updateProfile , {isLoading}] = useUpdateUserMutation();
    const submitHandler = async(e) =>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Enter the same password");
        }else{
            try{
                const res = await updateProfile({
                    _id:userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Profile updated")
            }catch(err){
                console.log(err)
            }
        }
    }

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.setName , userInfo.setEmail])
  return (
    <FormContainer>  
      <h1>Update profile</h1>
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
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen
