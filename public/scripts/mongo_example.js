"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We can just get the results as an array all at once:
  db.collection("tweets").find().toArray((err, results) => {
    if (err) throw err;

    console.log("results array: ", results);

    // This is the end...
    db.close();
  });

});