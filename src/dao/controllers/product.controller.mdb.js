import mongoose from "mongoose";
import productsModel from "../models/productModel.js";

export default class ProductManager {
    getProducts = async () => {
        try {
            return await productsModel.find().lean();
        } catch (error) {
            return error
        }
    }

    async getProdPaginated (type){
            try {
                return await productsModel.paginate(
                        { $match: { size: type }},
                        { $group: { _id: '$name', totalQuantity: { $sum: '$quantity' }}},
                        { $sort: { totalQuantity: 1 }},
                        { $group: { _id: 1, orders: { $push: '$$ROOT' }}},
                        { $project: { _id: 0, orders: '$orders' }},
                ) 
            } catch (error) {
                    return error
                }
        }

    getProductById = async (id) => {
        try {
            return await productsModel.findById(id)

        } catch (error) {
            return { error: error.message }
        }

    }

    addProduct = async (product) => {
        try {
            await productsModel.create(product);
            return await productsModel.findOne({ title: product.title })
        }
        catch (error) {
            return error
        }

    }

    updateProduct = async (id, product) => {
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: product });
        } catch (error) {
            return error
        }

    }

    deleteProduct = async (id) => {
        try {
            return await productsModel.findByIdAndDelete(id);
        } catch (error) {
            return error
        }

    }

}