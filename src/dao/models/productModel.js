import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null)

const collection = 'products';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    code: { type: String, required: true },
    stock: { type: Number, required: true }
})
productsSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collection, productsSchema); 

export default productsModel;