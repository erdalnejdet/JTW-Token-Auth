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
        expiresIn:'24h',
        issuer:"hebele"
    });
    }catch(e){
        throw new Error(e)
    }
    

}
const verifyToken=(req,res,next)=>{
     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        try {
            const token=req.headers.authorization.split(' ')[1]
            var decoded = jwt.verify(token, MY_SECRET);
            console.log(decoded)
            next()
          } catch(err) {
            return res.status(401).json({ msg: "UnAuthroization"});
          }
    }else{
            return res.status(401).json({ msg: "UnAuthroization"});
    }
}

app.use(express.json({}))
app.use(cors({}))



app.post('/auth/login',(req,res)=>{
    console.log(req.body)
    const _token=createToken(req.body.username)
    res.json({...req.body,token:_token}).status(200)
})

app.get('/api/todo',verifyToken, (req,res)=>{
    console.log(req.headers.authorization)
    res.json([{id:1,text:'qweqwewqe'},{id:2,text:'lgkjfjkgfhj'}])
})

app.listen(PORT,()=>{
    console.log(`Application running on port ${PORT}`)
})