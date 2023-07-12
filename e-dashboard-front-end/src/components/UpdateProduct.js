import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [proName, setName] = useState('');
    const [proPrice, setPrice] = useState('');
    const [proCate, setCate] = useState('');
    const [proCom, setCom] = useState('');
   
}

export default UpdateProduct;