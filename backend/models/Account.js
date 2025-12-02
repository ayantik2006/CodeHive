import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, default: "" },
  name: { type: String, default: "" },
  password: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  verificationLinkSendingTime: { type: Number, default: 0 },
});

export default mongoose.model("Account", schema);
