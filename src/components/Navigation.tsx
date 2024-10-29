import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setToken } from "../store/auth";

const Navigation = () => {
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.auth.user); 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setToken(JSON.parse(storedUser)));
        }
        setIsReady(true);
    }, [dispatch]);

    if (!isReady) return null; 
    
    //hocaya sor!!

    return (
        <nav className="flex items-center gap-4 underline text-blue-700 font-bold">
            {user &&  <Link to="/">Home</Link>}
            {user && <Link to="/dashboard">Dashboard</Link>} 
            {user &&  <Link to="/public">Public</Link>}
            {user && <Link to="/protected">Protected</Link>} 
        </nav>
    );
};

export default Navigation;
