import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img className="logo" alt="Logo" src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png">
            </img>
            {
                auth ?
                    <>
                        <ul className="nav-ul">
                            <li><Link to="/">Products</Link></li>
                            <li><Link to="/add">Add Products</Link></li>
                            <li><Link to="/update">Update Products</Link></li>
                            <li></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                        </ul>
                    </>

                    :
                    <>
                        <ul className="nav-ul nav-right">
                            <li><Link to="/signup">Sign up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </>
            }
        </div >
    )
}

export default Nav;