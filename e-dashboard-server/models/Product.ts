import mongoose, { Document, Schema } from "mongoose";


export interface IProduct {
    name: string;
    price: string,
    category: string,
    userId: string,
    company: string
}

export interface IProductModel extends IProduct, Document { }

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        category: { type: String, required: true },
        userId: { type: String, required: true },
        company: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);

