const express=require('express')
const cors=require('cors')
const PORT=3030
const app=express()
const jwt=require('jsonwebtoken')
//env devops
const MY_SECRET='mYzJGDDkSgJT25Fo55ve6iEYK2bQhTrk'

const createToken=(username)=>{
    console.log('username',username)
    try{
        return jwt.sign({user_name:username },MY_SECRET,{
        expiresIn:'1h',
        issuer:"hebele"
    });
    }catch(e){
        throw new Error(e)
    }
    

}


app.use(express.json({}))
app.use(cors({}))

app.get('/',(req,res)=>{
    res.json([{id:1111}])
})

app.post('/auth/login',(req,res)=>{
    console.log(req.body)
    const _token=createToken(req.body.username)
    res.json({...req.body,token:_token}).status(200)
})

app.listen(PORT,()=>{
    console.log(`Application running on port ${PORT}`)
})