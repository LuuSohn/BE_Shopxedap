import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const orderSchema = new Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        count: Number,
      },
    ],
    status: {
      type: String,
      default: 'Processing',
      enum: ['Cancelled', 'Processing', 'Succeed'],
    },
    total: Number,
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Export the model
export default model("Order", orderSchema);
