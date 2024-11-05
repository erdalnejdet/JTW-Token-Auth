import { Route, Routes } from 'react-router-dom'
import Home from '../views/HomeView'
import Dashboard from '../views/DashboarView'
import Public from '../views/PublicView'
import Protected from '../views/ProtectedView'
import ProtectedRouter from './ProtectedRouter'
import Login from '../Auth/Login'
import { useSelector } from 'react-redux'
import SignUp from '../Auth/SignUp'

const Router=()=>{
    const auth=useSelector((state:any)=>state.auth)
    return(
        <Routes>
        <Route path='login'  element={<Login />}/>
        <Route path='signup'  element={<SignUp />}/>
        <Route index element={
             <ProtectedRouter user={auth.user}>
             <Home/>
         </ProtectedRouter>
        } />
    
        <Route path='dashboard' element={
            <ProtectedRouter user={auth.user}>
                <Dashboard/>
            </ProtectedRouter>
        } />
        <Route path='public'  element={<Public />}/>
        <Route path='protected' element={
            <ProtectedRouter user={auth.user}  >
                <Protected />
            </ProtectedRouter>
        } />

    </Routes>
    )
}
export default Router



