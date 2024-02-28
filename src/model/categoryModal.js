import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    data: [
      {
        product_name: {
          type: String,
          require: true,
        },
        product_desc: {
          type: String,
          require: true,
        },
        product_images: [
          {
            filename: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
        product_stock: {
          type: Number,
          require: true,
        },
        product_price: {
          type: Number,
          require: true,
        },
        product_discount: {
          type: Number,
        },
        category_name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("category", categorySchema);
