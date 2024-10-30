import { Link } from "react-router-dom";
import { setToken } from "../store/auth";
import { useDispatch } from "react-redux";
const Navigation = () => {
    const dispatch=useDispatch()


    return (
        <nav className="flex items-center gap-4 underline text-blue-700 font-bold">
            <Link to="/">Home</Link>
           <Link to="/dashboard">Dashboard</Link>
            <Link to="/public">Public</Link>
           <Link to="/protected">Protected</Link>
           <Link to="/login" onClick={()=>{
                  dispatch(setToken(null))
                localStorage.clear()
            }}>Logout</Link>

        </nav>
    );
};

export default Navigation;
