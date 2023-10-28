import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPrivate(){
    const {adminInfo} = useSelector((action)=>action.admin);
    return adminInfo ? <Outlet/> : <Navigate to='/admin'/>
}

export default AdminPrivate;