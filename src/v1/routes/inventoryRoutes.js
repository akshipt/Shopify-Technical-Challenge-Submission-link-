'use strict';
/**
 * Pre defined Routes of the Inventory API.
 */
const express = require("express");
const inventoryController = require("../../controllers/inventoryController")

const router = express.Router();

router.get("/", inventoryController.getAllItems);

router.get("/:itemID", inventoryController.getSingleItem);

router.post("/", inventoryController.createNewItem);

router.patch("/:itemID", inventoryController.updateSingleItem);

router.delete("/:itemID", inventoryController.deleteSingleItem);

module.exports = router;