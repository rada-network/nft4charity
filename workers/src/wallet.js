const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true, index: true },
  balance: { type: String, required: true },
  currency: { type: String, required: true },
  userId: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

module.exports = walletSchema;
