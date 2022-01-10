import { Request, Response, NextFunction } from "express";
import { Product, IProduct } from "../models/product";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: IProduct = req.body;

    const productModel = new Product(product);
    const createdProduct = await productModel.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};
