
import connectMongo  from '@/database/db.js'
import mongoose from 'mongoose';
import ProductModal from '@/models/product.js';

export const GET = async (request, { params }) => {
    try {
        await connectMongo()

        const product = await ProductModal.findById(params.id)
        if (!product) return new Response("Product Not Found", { status: 404 });

        return new Response(JSON.stringify(product), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
 
export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const _id = params.id
    try {
        await connectMongo();
        // Check the _id
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return new Response("Product not found", { status: 404 });
        }
        // Update the Product data with new data
        const updatedProduct = await ProductModal.findByIdAndUpdate(_id, {...data, _id}, {new: true });

        return new Response("Successfully updated the Products", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Products", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectMongo();

        // Find the prompt by ID and remove it
        await ProductModal.findByIdAndRemove(params.id);

        return new Response("Product deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Product", { status: 500 });
    }
};