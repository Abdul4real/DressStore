let procModel = require('../models/product');


module.exports.home = function (req, res, next) {
    res.json({
        success: true,
        message: "Welcome to DressStore Application"
    }
    );
}

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
        let id = req.params.itemId;
        let item = await procModel.findById(id);
        res.json(item)
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
        let newId = req.params.itemId;
        let updatedId= procModel(req.body);
        updatedId._id = newId;

        let result = await procModel.updateOne({ _id: newId }, updatedId);
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
        let newId = req.params.itemId;
        let result = await procModel.findByIdAndDelete(newId);
        if (!result) { throw new Error('Item not deleted. Are you sure it exists?')
        }
        else {
            // Express will catch this on its own.
            res.json(
                {success: true, message: "Item deleted successfully."}
            );
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}