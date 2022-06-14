'use strict';

/**
 * inventoryService.js process the data received from controllers and to store it in the database after
 * performing appropriate.
 */

const InventoryModel = require("../models/inventorySchema");

/**
 * getAllItems - Return all the items present in the Inventory collection.
 * @returns {list} - Items in inventory
 */

const getAllItems = async () => {
    try {
        return InventoryModel.find({});
    }
    catch (error) {
        return error;
    }
};

/**
 * getSingleItem - Return a single item from the Inventory collection.
 * @param {string} itemID - A hexadecimal unique identifier key of mongoDB objects.
 * @returns {Object} - A single item object
 */

const getSingleItem = async (itemID) => {
    try {
        const getItem = await InventoryModel.findById(itemID);
        if (!getItem){
            return "Item ID does not exist";
        } else {
        return getItem;
        }
    } catch (error) {
        return error;
    }
};

/**
 * createNewItem - It creates the item object in the Inventory collection.
 * @param {JSON object} createItem - A JSON based request body is passed to create a inventory item in the collection
 * @returns {JSON object} - It returns the newly created item.
 */

const createNewItem = async (createItem) => {
    const createdItem = new InventoryModel(createItem);
    try {
        await createdItem.save();
        return createdItem;
    } catch (error) {
        return error;
    }
};

/**
 * updateSingleItem - It updates the existing items present in the database. 
 * @param {string} itemID
 * @param {JSON Object} body - A JSON object with key value pairs of the item to be updated.
 * @returns {JSON Object} - Returns the updated item object from the collection.
 */

const updateSingleItem = async (itemID,body) => {
    try {
        const updatedItem = await InventoryModel.findByIdAndUpdate(itemID,body);
        if (!updatedItem){
            return "Item ID does not exist";
        } else {
        return InventoryModel.findById(itemID);
        }
    } catch (error) {
        return error;
    }
};

/**
 * deleteSingleItem - It deletes the existing item present in the database
 * @param {*} itemID 
 * @returns {string} - It returns the response messages abut the operation.
 */

const deleteSingleItem = async (itemID) => {
    try{
        const deletedItem = await InventoryModel.findByIdAndDelete(itemID);
        if (!deletedItem){
            return "Item ID does not exist";
        } else {
            return "Item deleted Successfully";
        }
    } catch(error) {
        return error;
    }
};

module.exports = {
    getAllItems,
    getSingleItem,
    createNewItem,
    updateSingleItem,
    deleteSingleItem
};