import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      asaasCustomerId: {
        type: String,
        required: false,
      },
    },

    products: [
      {
        id: Number,
        name: String,
        price: Number,
        category: String,
        url: String,
        quantity: Number,
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    paid: {
      type: Boolean,
      default: false,
    },

    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
