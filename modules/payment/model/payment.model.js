const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionId:{
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed","succeeded"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["card", "paypal", "bank_transfer"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
