'use strict';

/**
 * Pre defined Routes of the Shipment API.
 */

const express = require("express");
const shipmentController = require("../../controllers/shipmentContoller")

const router = express.Router();

router.get("/", shipmentController.getAllShipments);

router.post("/", shipmentController.createNewShipment);

router.delete("/:shipmentID", shipmentController.deleteSingleShipment);

module.exports = router;