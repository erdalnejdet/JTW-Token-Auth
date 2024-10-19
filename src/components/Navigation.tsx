import { Link } from "react-router-dom"

const Navigation=()=>{
    return(
        <nav className="flex items-center gap-4 underline text-blue-700 font-bold">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/public">Public</Link>
            <Link to="/protected">Protected</Link>

        </nav>
    )
}
export default Navigation   