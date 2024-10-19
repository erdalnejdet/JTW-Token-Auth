import { Navigate, Outlet } from "react-router-dom"


const ProtectedRouter=({user,children,redirectTo='/login'}:any)=>{
    // contexten oku 1
    //redfuxtan oku 2
    //props olarak oku 3
    //auth/login
    //auth/asd
    // user is user ? token var mı ? var geçerli mi ? geçerli  ozaman geç yoska baybay
  if(!user){
    return <Navigate to={redirectTo} replace={true} />
  }
  return children ? children : <Outlet />
}
export default ProtectedRouter