const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const transactionSchema = new mongoose.Schema({
  walletId: { type: String, unique: true, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  sourceId: { type: String, required: true },
  currency: { type: String, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, required: true },
  networkFee: { type: String, required: true },
});

module.exports = transactionSchema;
