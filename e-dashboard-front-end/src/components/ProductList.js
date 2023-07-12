import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/products/get/",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setProducts(res.data.results);
            //console.log(products);  
        });
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/delete/${id}`)
            getProducts();
            console.log('Item successfully deleted.')
          } catch (error) {
            alert(error)
          }
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>

            <ul>
                <li>S.No</li>
                <li>Name </li>
                <li>Price </li>
                <li>Category </li>
                <li>Operation</li>
            </ul>
            {products.map((item, index) =>
                <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name} </li>
                    <li>{item.price} </li>
                    <li>{item.category} </li>
                    <li>
                        <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={"/update/" + item._id}>Update</Link>    
                    </li>
                </ul>)
            }
        </div>
    )
}

export default ProductList;