const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, required: true },
});

module.exports = campaignSchema;
