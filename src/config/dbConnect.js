'use strict';
/**
 * MongoDb connector using mongoose library
 */
var mongoose = require('mongoose');

const connectDb = async () => {
try {
      await mongoose.connect('mongodb+srv://test1:xOaDQUCtM6jpUIwi@cluster0.ofkyd.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); 
      console.log("MongoDB connected Successfully")   
} catch (error) {
     console.log("MongoDB failed Connection",error);
}};

module.exports = connectDb;