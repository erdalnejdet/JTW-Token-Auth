const mongoose=require('mongoose')
const connectToDatabase=async()=>{
    try {
        const db=await mongoose.connect('mongodb://localhost:9001/mydatabase',{
            connectTimeoutMS:1000*10
        })
        return db
    } catch (error) {
        throw new Error(error)
    }
}

module.exports=connectToDatabase