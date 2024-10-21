import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setToken } from "../store/auth"


const Home=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const auth=useSelector((state:any)=>state.auth)
    const [data,setData]=useState([])
    const getTodos=async()=>{
            try{
                const _res=await  axios.get('http://localhost:3030/api/todo',{
                    headers:{
                        'Authorization':`Bearer ${auth.user.token}`
                    }
                  })
                  setData(_res.data)
            }catch(e:any){
                if(e.response.status===401){
                    localStorage.removeItem('user')
                    dispatch(
                        setToken(null)
                    )
                    navigate('/login')
                }
            }
    }
    useEffect(()=>{
        getTodos()
    },[])
    return(
        <div>
            <pre>
                {JSON.stringify(data)}
            </pre>
        </div>
    )
}
export default Home