import Table from 'react-bootstrap/Table';
import { useGetUsersMutation } from '../slices/adminApiSlice';
import { useEffect , useState } from 'react';
import { logout } from '../slices/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminDash() {
    const [userData , setUserData] = useState([]);
    const [users , {isLoading,error}] = useGetUsersMutation();
    const [data,setData] = useState()
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const {data} = await users();
          setUserData(data.data)
          console.log(data)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [users]);

    function search(value){
      if(!value){
        setData(null);
      }
      let searchResult = userData.filter((serchData)=>{
        return serchData.name == value
      })
      setData(searchResult);
    }
    function adminLogout(){
      try{
        dispatch(logout())
        navigate('/');
      }catch(err){
        console.log(err)
      }
    }
    
  return (  
    <>
    <h1>Admin Dashboard</h1> 
    <button onClick={adminLogout}>Logout</button>
        {isLoading?(<>Loading...</>):(

          <>
            <input onChange={(e)=>{search(e.target.value)}} type='text'/>
          {
            data?(
              <Table striped bordered hover className='container mt-5'>
              <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((value,i)=>{
                  return(
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.createdAt}</td>
                    </tr>
                  )                
                })
              }
            </tbody>
            </Table>
            ):(
              <Table striped bordered hover className='container mt-5'>
            <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {
              userData.map((value,i)=>{
                return(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.createdAt}</td>
                  </tr>
                )                
              })
            }
          </tbody>
          </Table>
            )
          }
            
          </>
        )}
      
    
    </>
  );
}

export default AdminDash;