import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

export const Product = model<IProduct>("Product", productSchema);
