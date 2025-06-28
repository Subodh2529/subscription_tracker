/* eslint-disable no-undef */
import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the mongodb URI environment variable inside .env.<development/production>.local"
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to database in ${NODE_ENV} mode.`);
  } catch (err) {
    console.log("Error connecting to DB", err);
    process.exit(1);
  }
};

export default connectDB;
