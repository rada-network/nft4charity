const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const walletSchema = new mongoose.Schema({
  address: { type: String, required: true, index: true },
  balance: { type: Number, required: true },
  currency: { type: String, required: true },
  userId: { type: String, required: true },
  campaignId: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

module.exports = walletSchema;
