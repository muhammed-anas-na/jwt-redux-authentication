import {Navigate , Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProviteRoute() {
    const {userInfo} = useSelector((action)=>action.auth)
  return userInfo? <Outlet/> : <Navigate to='/login' replace />
}

export default ProviteRoute
