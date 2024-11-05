const mongoose=require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    name: String, 
    surname: String,
    email: String,
    password:String,
},{
    timestamps:true,
});
const User = mongoose.model('User', userSchema,'users');
module.exports=User
