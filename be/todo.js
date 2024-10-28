const mongoose=require('mongoose')
const { Schema } = mongoose;


const todoSchema = new Schema({
  title: String, 
  estimate: Number,
  description: String,
  status:String,
  isDone:Boolean
},{
    timestamps:true,
});
const Todo = mongoose.model('Todo', todoSchema,'todos');
module.exports=Todo
