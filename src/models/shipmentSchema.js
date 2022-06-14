'use strict';
/**
 * MongoDB Schema for the Shipment collection which is used to store shipments.
 */

const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({

    // Cutomer name for the shipment
    cust_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    //Cutomer address 
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    //Customer Phone Number
    phone: {
        type: Number,
        validate(value) {
            if (value.length == 10) throw new Error("Phone number is not in correct format");
        },
    },

    //Array of items to be shipped
    items: []
    ,

    //Total price of the shipment
    total_price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error("Price cannot be negative");
        }
    },
},
    { timestamps: true });

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;