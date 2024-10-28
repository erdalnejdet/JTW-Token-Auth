const express=require('express')
const cors=require('cors')
const PORT=3030
const app=express()
const jwt=require('jsonwebtoken')
//env devops
const MY_SECRET='mYzJGDDkSgJT25Fo55ve6iEYK2bQhTrk'
const connectDb=require('./db')
const Todo=require('./todo')

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

app.delete('/api/todo/:id',verifyToken,async(req,res)=>{
    const {id}=req.params
    const deletedTodo=await Todo.findByIdAndDelete(id)
    console.log('deletedTodo',deletedTodo)
    res.json({message:'Kayıt silindi'})
})

app.put('/api/todo/:id',verifyToken,async(req,res)=>{
    const {id}=req.params
    const updateTodo=await Todo.findByIdAndUpdate(id,{
        estimate:req.body.estimate,
        description:req.body.description,
        title:req.body.title,
        status:req.body.status,
        isDone:false
    },{
        new: true
    })
    res.json(updateTodo)
})


app.get('/api/todo',verifyToken, async(req,res)=>{
    const allTodos=await Todo.find({})
    res.json(allTodos)
})
//FORM VALIDASYONU ! MIDDLEWARE TODO NEJO !
app.post('/api/todo',verifyToken,async (req,res)=>{
     const todo=new Todo({
         estimate:req.body.estimate,
         description:req.body.description,
         title:req.body.title,
         status:req.body.status,
         isDone:false
     })
     const save=await todo.save()
     res.json(save).status(201)

})


app.listen(PORT,()=>{
    connectDb()

    console.log(`Application running on port ${PORT}`)
})