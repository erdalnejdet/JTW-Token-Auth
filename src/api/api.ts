// TODO
import axios from 'axios'
const BASE_URL='http://localhost:3030/'
const api=async(config:any)=>{

    try{
      const res=await  axios({
            method:config.method,
            url:BASE_URL+config.url,
            data:config.data
        })
        return res
    }catch(e:any){
        throw new Error(e.toString())
    }
  
}   
export default api