import { Route, Routes } from 'react-router-dom'
import Home from '../views/HomeView'
import Dashboard from '../views/DashboarView'
import Public from '../views/PublicView'
import Protected from '../views/ProtectedView'
import ProtectedRouter from './ProtectedRouter'
import Login from '../Auth/Login'

const Router=(props:any)=>{
    return(
        <Routes>
        <Route path='login'  element={<Login />}/>
        <Route index element={
             <ProtectedRouter>
             <Home/>
         </ProtectedRouter>
        } />
    
        <Route path='dashboard' element={
            <ProtectedRouter>
                <Dashboard/>
            </ProtectedRouter>
        } />
        <Route path='public'  element={<Public />}/>
        <Route path='protected' element={
            <ProtectedRouter  >
                <Protected />
            </ProtectedRouter>
        } />

    </Routes>
    )
}
export default Router



