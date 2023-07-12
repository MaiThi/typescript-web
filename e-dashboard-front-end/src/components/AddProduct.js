import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
    const navigate = useNavigate();
    const [proName, setProName] = useState('');
    const [proPrice, setProPrice] = useState('');
    const [proCate, setProCate] = useState('');
    const [proCom, setProCom] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {

        if (!proName || !proPrice || !proCate || !proCom) {
            setError(true);
            return false;
        }

        await axios({
            method: "post",
            url: "http://localhost:5000/products/create",
            data: JSON.stringify({
                name: proName,
                price: proPrice,
                userId: JSON.parse(localStorage.getItem('user'))._id,
                company: proCom,
                category: proCate
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((res) => {
            if (res.data) {
                navigate('/');
            }

            console.log(res);

        });
    }
    return (
        <div className="product">
            <h1>Add Product</h1>

            <input type="text" onChange={(e) => setProName(e.target.value)}
                value={proName} className="inputBox" placeholder="Enter Product Name"></input>
            {error && !proName && <span className="error">Enter valid name</span>}
            <input type="text" pattern="[0-9]*" onChange={(e) => setProPrice(e.target.value)}
                value={proPrice} className="inputBox" placeholder="Enter Product Price"></input>
            {error && !proPrice && <span className="error">Enter valid price</span>}

            <input type="text" onChange={(e) => setProCate(e.target.value)}
                value={proCate} className="inputBox" placeholder="Enter Product Category"></input>
            {error && !proCate && <span className="error">Enter valid category</span>}


            <input type="text" onChange={(e) => setProCom(e.target.value)}
                value={proCom} className="inputBox" placeholder="Enter Product Company"></input>
            {error && !proCom && <span className="error">Enter valid company</span>}

            <button className="appButton" onClick={addProduct} type="button">Add Product</button>

        </div>
    )
}

export default AddProduct;