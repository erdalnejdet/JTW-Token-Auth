import { useEffect, useState } from "react"
import Navigation from "./components/Navigation"
import Router from "./router/router"
import { useDispatch, useSelector } from "react-redux"
import { setToken } from "./store/auth"

function App() {
    const auth=useSelector((state:any)=>state.auth)
    const [isReady,setIsReady]=useState(false)
    const dispatch=useDispatch()
    const user = useSelector((state:any) => state.auth.user); 
    useEffect(()=>{
        const _user=localStorage.getItem('user')
        if(_user){
            dispatch(setToken(JSON.parse(_user)))
        }else{
            setIsReady(true)
        }
    },[dispatch])

    useEffect(()=>{
        if(auth && auth.user){
            setIsReady(true)
        }
    },[auth])
return (
<div >
    {user &&  <Navigation />}
    {isReady && <Router />}
</div>
)
}

export default App