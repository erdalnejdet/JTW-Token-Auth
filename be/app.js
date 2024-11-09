const express=require('express')
const cors=require('cors')
const PORT=3030
const app=express()
const jwt=require('jsonwebtoken')
//env devops
const MY_SECRET='mYzJGDDkSgJT25Fo55ve6iEYK2bQhTrk'
const connectDb=require('./db')
const Todo=require('./todo')
const User=require('./user')

const { check,validationResult } = require('express-validator')


const createToken=(username)=>{
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

const validateAuth = () => {
    return [
            check("username").isString(),
            check("username").notEmpty(),
            check("username").isLength({ min: 3 }),
            check("password").isString(),
            check("password").notEmpty(),
            check("password").isLength({ min: 3 }),
    ]
};

app.get('/api/todo/statuses',(req,res)=>{
    res.status(200).json([{id:1,text:'Complated'},{id:2,text:'Pending'},{id:3,text:'Cancelled'}])
})

app.post('/auth/login',validateAuth(), (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors.array({ onlyFirstError: true }))
        return
    }
    const _token=createToken(req.body.username)
    res.json({...req.body,token:_token}).status(200)
})


app.post('/aıth/register',async (req,res)=>{
    const user = new User({
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:req.body.password
    });
    const save = await user.save();
    res.status(201).json(save);
})

app.delete('/api/todo/:id',verifyToken,async(req,res)=>{
    const {id}=req.params
    const deletedTodo=await Todo.findByIdAndDelete(id)
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


app.put('/api/todo/updateIsDone/:id',verifyToken,async(req,res)=>{
    const {id}=req.params
    const updateTodo=await Todo.findByIdAndUpdate(id,{
        isDone:true
    },{
        new: true
    })
    res.json(updateTodo)
})



app.get('/api/todo',verifyToken, async(req,res)=>{
     const filterQuery= req.query.title  === undefined ? { isDone: req.query.isDone}:{ isDone: req.query.isDone, $or:[
        {
            title: {$regex: new RegExp(req.query.title, 'i')},

        },
        {
            description: {$regex: new RegExp(req.query.title, 'i')},

        }
     ]}
    const allTodos=await Todo.find(filterQuery)
    res.json(allTodos)
})



app.post('/api/todo', verifyToken, async (req, res) => {
    const todo = new Todo({
        estimate: req.body.estimate,
        description: req.body.description,
        title: req.body.title,
        status: req.body.status,
        isDone: false,
    });
    const save = await todo.save();
    res.status(201).json(save);
});



app.listen(PORT,()=>{
    connectDb()

    console.log(`Application running on port ${PORT}`)
})