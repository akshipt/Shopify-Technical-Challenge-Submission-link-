'use strict';

/**
 * Shipment Request and Response Middleware which takes in input through routes and gives appropriate response code.
 */

const shipmentService = require("../services/shipmentService")

/**
 * getAllShipments asynchronous function receives data thorugh router and forwards to the controller.
 * and returns appropriate responses.
 * @param {*} req 
 * @param {*} res 
 */

const getAllShipments = async (req, res) => {
    const allShipments = await shipmentService.getAllShipments();
    try {
        res.status(200).send({status: "OK", data: allShipments });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

/**
 * createNewShipment function
 * @param {*} req 
 * @param {*} res 
 */

const createNewShipment = async (req, res) => {
    const { body } = req;
    try {
        const newShipment = {
            cust_name: body.cust_name,
            address: body.address,
            phone: body.phone,
            total_price: body.total_price
        }

        const shipmentItem = {
            items: body.items,
        }
        const createdShipment = await shipmentService.createNewShipment(newShipment,shipmentItem);
        res.status(201).send({ status: "OK", data: createdShipment });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};

/**
 * deleteSingleShipment function
 * @param {*} req 
 * @param {*} res 
 */

const deleteSingleShipment = async (req, res) => {
    const { params: { shipmentID } } = req;
    try {
    const deleteShipment = await shipmentService.deleteSingleShipment(shipmentID);
    res.status(200).send({Status: "OK", data: deleteShipment});
    } catch (error) {
        res.status(500).send({data: error})
    }
};

module.exports = {
    getAllShipments,
    createNewShipment,
    deleteSingleShipment
};