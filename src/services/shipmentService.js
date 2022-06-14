'use strict';
/**
 * shipmentService.js process the data received from the controllers and store it in the database after
 * performing appropriate.
 */
const ShipmentModel = require("../models/shipmentSchema");
const InventoryModel = require("../models/inventorySchema");

/**
 * getAllShipments - Return all the shipments present in the Shipment collection
 * @returns 
 */
const getAllShipments = async () => {
    try {
        return ShipmentModel.find({});
    }
    catch (error) {
        return error;
    }
};

/**
 * createNewShipment - It creates the shipment object in the Shipment collection ,it adds the existing
 * inventory items to the shipment and substract the values from the Inventory items to maintain the records.
 *  
 *  @param {JSON object} - createShipment - Request body of the Shipment creation.
 *  @param {List} - shipmentItem - List of inventory items to be added to shipments.
 * @returns {JSON object} - It will return the newly created shipment object.
 */
const createNewShipment = async (createShipment, shipmentItem) => {
    const shippingItems = shipmentItem.items;
    const items = await shippingItems.map(({ _id, quantity }) => ({ _id, quantity }));

    // Iterate the values of item array. If the quantity of items from inventory is less than zero or the shipment the
    // value, ths shipment order will not be accepted.
    try {
        for (const item of items) {
            const quantityCheck = await InventoryModel.findById(item._id);
            console.log(quantityCheck.quantity);
            if (quantityCheck.quantity > 0 && quantityCheck.quantity >= item.quantity) {
                await InventoryModel.findByIdAndUpdate(item._id, { $inc: { quantity: -item.quantity } });
            } else {
                return "Quantity is less add more items.";
            }
        }
    }
    catch (error) {
        console.log(error)
    }

    //Used to create shipment and pushing the values of items from the inventory to the shipment.
    try {
        const createdShipment = new ShipmentModel(createShipment);
        await createdShipment.save();
        for (const shippingItem of shippingItems) {
            await ShipmentModel.findByIdAndUpdate(createdShipment.id, { $push: { items: shippingItem } });
        }
        return await ShipmentModel.findById(createdShipment.id);
    } catch (error) {
        return error;
    }
};

/**
 * deleteSingleShipment - It allows use to delete the created shipment with their itemID.
 * @param {*} itemID 
 * @returns - It returns appropriate message after execution.
 */

const deleteSingleShipment = async (itemID) => {
    try {
        const deletedShipment = await ShipmentModel.findByIdAndDelete(itemID);
        if (!deletedShipment) {
            return "Shipment ID does not exist";
        } else {
            return "Shipment deleted Successfully";
        }
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllShipments,
    createNewShipment,
    deleteSingleShipment
};