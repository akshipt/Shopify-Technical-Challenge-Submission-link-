'use strict';
/**
 * index.js file contains the server and request router. 
 */
const express = require("express");
const connectDb = require("./config/dbConnect");
const bodyParser = require("body-parser");
const v1InventoryRouter = require("./v1/routes/inventoryRoutes");
const v1ShipmentRouter = require("./v1/routes/shipmentRoutes");

connectDb();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/v1/inventory/",v1InventoryRouter);
app.use("/api/v1/shipment/",v1ShipmentRouter);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})