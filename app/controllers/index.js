module.exports.home = function (req, res, next) {
    res.send("Welcome to DressStore Application");
}
let procModel = require('../models/product');
//let procModel = require('../models/category');

//add product
module.exports.addNew = async function (req, res, next) {
    try {
        let newItem = new procModel(req.body);
        let result = await procModel.create(newItem);
        console.log(result);
        res.json(
            {
                success: true,
                message: "Item added successfully."
            }
        );
    } catch (error) {
        console.log(error);
        next(error);
    }

}


//Get all product
module.exports.getProduct = async function (req, res, next) {
    try {
        let list = await procModel.find();
        res.json(list);
    } catch (error) {
        next(error);
    }
}


//get by Id
module.exports.getProductById = async function (req, res, next) {
    try {
        let productId = req.params.id;
        req.user = await procModel.findByid(id);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.read = async function (req, res, next) {
    res.json(req.user);
}


//update product
module.exports.updateProduct = async (req, res, next) => {
    try {
        let itemid = req.params.id;
        let updatedId= procModel(req.body);
        updatedId._id = itemid;

        let result = await procModel.updateOne({ _id: itemid }, updatedid);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Item updated successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Item not updated. Are you sure thsi Item exists?. ')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//remove product
module.exports.removeProduct = async (req, res, next) => {
    try {
        let itemid = req.params.id;

        let result = await procModel.deleteOne({ _id: itemid });

        //console.log(result);
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Item deleted successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Item not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}