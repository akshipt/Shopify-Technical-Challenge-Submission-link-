'use strict';
/**
 * Inventory Request and Response Middleware which takes in input through routes and gives appropriate response code.
 */
const inventoryService = require("../services/inventoryService")

/**
 * getAllItems asynchronous function receives data thorugh router and forwards to the controller.
 * and returns appropriate responses.
 * @param {*} req 
 * @param {*} res 
 */
const getAllItems = async (req, res) => {
    const allItems = await inventoryService.getAllItems();
    try {
        res.status(200).send({status: "OK", data: allItems });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

/**
 * getSingleItem function 
 * @param {*} req 
 * @param {*} res 
 */

const getSingleItem = async (req, res) => {
    const { params: {itemID} } = req;
    const getItem = await inventoryService.getSingleItem(itemID);
    try {
        res.status(200).send({status: "OK", data: getItem});
    } catch (error) {
        res.Status(500).send(error);
    }
};

/**
 * createNewItem function
 * @param {*} req 
 * @param {*} res 
 */

const createNewItem = async (req, res) => {
    const { body } = req;
    try {
        const newItem = {
            name: body.name,
            quantity: body.quantity,
            price: body.price,
            description: body.description,
            // image: body.image,
            batch_code: body.batch_code
        }
        const createdItem = await inventoryService.createNewItem(newItem);
        res.status(201).send({ status: "OK", data: createdItem });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};

/**
 * updateSingleItem function
 * @param {*} req 
 * @param {*} res 
 */

const updateSingleItem = async (req, res) => {
    const { body ,params: { itemID } } = req;
    const updatedItem = await inventoryService.updateSingleItem( itemID ,body);
    try{
        res.status(200).send({Status: "OK", data: updatedItem});
    }
    catch (error) {
        res.status(500).send({ data: error });
    }
};

/**
 * deleteSingleItem function
 * @param {*} req 
 * @param {*} res 
 */

const deleteSingleItem = async (req, res) => {
    const { params: { itemID } } = req;
    try {
    const deleteItem = await inventoryService.deleteSingleItem(itemID);
    res.status(200).send({Status: "OK", data: deleteItem});
    } catch (error) {
        res.status(500).send({data: error})
    }
};

module.exports = {
    getAllItems,
    getSingleItem,
    createNewItem,
    updateSingleItem,
    deleteSingleItem
};