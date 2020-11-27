// Comments
// Import Dependancies
const mongoose = require('mongoose');
const Product = require('../models/product');


// Comment
// Handling get-request for all items
exports.products_get_all = (req, res, next) => {
    Product.find()
        .select("_id name price productImage")
        .exec()
        .then(data => {
            let dataLength = data.lengthz
            res.status(200).json({
                status: 200,
                Items: dataLength,
                product: data.map(
                    doc => {
                        return {
                            id: doc._id,
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            request: {
                                type: "GET BY ID",
                                url: "http://localhost:3000/products/" + doc._id
                            }
                        }
                    }
                )
            })
        })
        .catch(
            err => {
                errorFunction(err, res);
            }
        )
}


// comment
// Handling get-equest for one item
exports.product_get_one = (req, res, next) => {
    Product.findById(req.params.id)
        .select("_id name price productImage")
        .exec()
        .then(data => {
            if (data)
                return res.status(200).json({
                    status: 200,
                    message: "Success getted",
                    product: {
                        id: data._id,
                        name: data.name,
                        price: data.price,
                        productImage: data.productImage,
                        request: {
                            type: "GET",
                            description: "Get all products",
                            url: "http://localhost:3000/products"
                        }
                    },
                })
            res.status(404).json({
                status: 404,
                message: "Product not found"
            })

        })
        .catch(
            err => {
                errorFunction(err, res);
            }
        )

}

// Comment
// Handling post-request
exports.product_create = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(
            result => {
                console.log(result);
                res.status(200).json({
                    status: 200,
                    message: 'Product successfully created',
                    createdProduct: {
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + result._id
                        }
                    }
                });
            })
        .catch(
            err => {
                errorFunction(err, res);
            }
        )
}

// Comment
// Handling delete-request
exports.product_delete = (req, res, next) => {
    let id = req.params.id;
    Product.deleteOne({ _id: id }).exec().then(
        result => {
            if (result.n != 0)
                return res.status(200).json({
                    status: 200,
                    message: "Successfully Deleted",
                    request: {
                        type: "Post-request",
                        url: "http://localhost:3000/products",
                        body: {
                            name: "STRING",
                            price: "NUMBER"
                        }
                    }
                })
            res.status(404).json({
                error: {
                    status: 404,
                    message: "Product not exist"
                }
            })
        })
        .catch(
            err => {
                errorFunction(err, res);
            }
        )
}

// Comment
// Handling patch-request
exports.product_update = (req, res, next) => {
    let id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.opsKey] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(
            result => {
                if (!result)
                    return res.status(404).json({
                        status: 404,
                        error: {
                            message: "Product not found"
                        }
                    })
                res.status(200).json({
                    status: 200,
                    message: "Product Sucscess Updated",
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + id
                    }
                });
            }
        )
        .catch(
            err => {
                errorFunction(err, res);
            })
}

// Comment
// Error for try catch
function errorFunction(err, res) {
    console.log(err);
    res.status(500).json({
        status: 500,
        error: {
            message: err.message
        }
    });
}