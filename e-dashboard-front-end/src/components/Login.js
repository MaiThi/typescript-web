import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    }, []);

    const handleLogin = async () => {
        await axios ({
            method:"post",
            url:"http://localhost:5000/users/login",
            data:JSON.stringify({
                email: email, 
                password: password}),
            headers:{
                'Content-Type':'application/json'
            }

        }).then((res)=>{
            if(res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.auth));
                navigate('/');
            } else {
                alert("Please enter connect detail");
            }
            
            console.log(res);
            
        });
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="inputBox" placeholder="Enter Email"></input>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="inputBox" placeholder="Enter pasword"></input>
            <button className="appButton" onClick={handleLogin} type="button">Sign Up</button>

        </div>
    )
}

export default Login;