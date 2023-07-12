const Product = require('../models/Product');

const createProduct = (req, res) => {
    const productReq = req.body;
    const proSchema = new Product({
        name:productReq.name,
        price:productReq.price,
        category:productReq.category,
        userId: productReq.userId,
        company: productReq.company
    });

    return proSchema
        .save()
        .then((prod) => res.status(201).json({ prod }))
        .catch((error) => res.status(500).json({ error }));
};


module.exports = { createProduct }