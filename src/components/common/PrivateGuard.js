import { useAuthContext } from "../../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";


const PrivateGuard=()=>{
const {isAuthenticated} = useAuthContext();

if (!isAuthenticated) {
    return  <Navigate to='/login' replace />
 }

return <Outlet/>
}
export default PrivateGuard;