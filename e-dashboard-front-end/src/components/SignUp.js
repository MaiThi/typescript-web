import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    }, []);

    const collectData= async()=>{
        await axios({
            method:"post",
            url:"http://localhost:5000/users/create",
            data:JSON.stringify({
                name: name, 
                email: email, 
                password: password}),
            headers:{
                'Content-Type':'application/json'
            }

        }).then((res)=>{
            localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log(res);
            navigate('/');
        });
        
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} 
                   placeholder="Enter Name"></input>
            <input className="inputBox" type="text"  value={email} onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter Email"></input>
            <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} 
                    placeholder="Enter Password"></input>
            <button className="appButton" onClick={collectData} type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;