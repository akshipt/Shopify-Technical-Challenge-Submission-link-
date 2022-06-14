'use strict';
/**
 * MongoDB Schema for the Inventory collection which is used to store inventory items.
 */
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    
    //Name of the Item
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    //Quantity of the Item
    quantity: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error("Quantity cannot be negative");
        },
    },

    //Price of the Item
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error("Price cannot be negative");
        }
    },

    //Description of the Item
    description: {
        type: String
    },

    //Batch_Code of the Item
    batch_code: {
        type: String
    }
}, 

//CreatedAt and UpdatedAt timestamps will be automatically created.
{ timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;