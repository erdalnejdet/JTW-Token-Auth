import { Navigate, Outlet } from "react-router-dom"

function isTokenExpired(token:any) {
  const arrayToken = token.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
}

const ProtectedRouter=({user,children,redirectTo='/login'}:any)=>{
    // contexten oku 1
    //redfuxtan oku 2
    //props olarak oku 3
    //auth/login
    //auth/asd
    // TOKEN IS TOKEN OR NOT CHECK THIS LINE NEJO TODO !!
    // user is user ? token var mı ? var geçerli mi ? geçerli  ozaman geç yoska baybay
    //ilk önce token is token kontrolü ardıdnan || isTokenExpired(user?.token)
    if(!user){
    return <Navigate to={redirectTo} replace={true} />
  }
  //(if token is token  &&  isTokenExpired(user?.token))
  return children ? children : <Outlet />
}
export default ProtectedRouter