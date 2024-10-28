import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setToken } from "../store/auth"

const initialFormData={
    title: "", 
    estimate: 1,
    description: "",
    status:"",
}

const Home=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const auth=useSelector((state:any)=>state.auth)
    const [data,setData]=useState([])
    const [formData,setFormatData]=useState({...initialFormData})
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

    const handleSubmit=async(event:any)=>{
        event.preventDefault()
        const _res:any=await  axios.post('http://localhost:3030/api/todo',formData, {
            headers:{
                'Authorization':`Bearer ${auth.user.token}`
            }
          })
          const arr=[...data]
          arr.push(_res.data as never)
          setData(arr)
          setFormatData({...initialFormData})

    }
    return(
        <div className="p-8 w-full bg-zinc-900">
         

<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input value={formData.title} onChange={(e)=>{setFormatData({...formData,title:e.target.value})}} type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="number" name="repeat_password"
      value={formData.estimate} onChange={(e)=>{setFormatData({...formData,estimate:+e.target.value})}}
      id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estimate</label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desc</label>
  <textarea
  value={formData.description} onChange={(e)=>{setFormatData({...formData,description:e.target.value})}}
  id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="floating_password"
  value={formData.status} onChange={(e)=>{setFormatData({...formData,status:e.target.value})}}
      id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>


<pre className="bg-white">

    {JSON.stringify(data,null,2)}
</pre>
        </div>
    )
}
export default Home