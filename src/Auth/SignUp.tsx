import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [registerUser,setRegisterUser]=useState({
    name:'',
    surname:'',
    email:'',
    password:''
  })
  const auth=useSelector((state:any)=>state.auth)
  const [errors,setErrors]=useState([])
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
 

  const handleRegister=()=>{
    
  }

  useEffect(()=>{
    if(auth && auth.user){
      navigate('/')
    }
  },[auth, navigate])

  return (
    <main className="h-screen flex items-center justify-center bg-red-500">
      <div className="min-h-screen flex items-center flex justify-center w-full relative z-20 ">
        <div className="container flex items-center flex-col md:flex-row w-full">
          <div className="w-full p-4  max-w-[521px] mx-auto">
            <div className="bg-white rounded-2xl md:p-custom p-6 ">
              <h3 className="text-2xl mb-4 text-custom-dark font-semibold">
                Sign up to your account
              </h3>
              <p className="text-sm text-gray">
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit. Donec id enim ac felis porttitor
                <br />
                dictum.
              </p>
              <div className="mt-[19px]">
                <Input
                  label="Your Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholdertext="name@company.com"
              
                />
                  <Input
                  label="Name"
                  name="name"
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholdertext="John"
              
                />
                  <Input
                  label="Surname"
                  name="surname"
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholdertext="Doe"
              
                />
                <div className="relative">
                      <Input
                        label="Password"
                        name="password"
                        type={visible ? "text" : "password"}
                        value={password}
                    
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholdertext="password"
                      />
                      <span
                        onClick={() => setVisible(!visible)}
                        className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
                      >
                        {visible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>

                <Button
                  Title="Kayıt ol"
                  onClick={handleRegister}
                  className="w-full mt-8 bg-red-500 h-14 text-white rounded text-sm font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;