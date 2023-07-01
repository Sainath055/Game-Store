
import connectMongo  from '@/database/db.js'
import mongoose from 'mongoose';
import ProductModal from '@/models/product.js';


export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const userId = data.userId
    const _id = params.id
    try {
        await connectMongo();
        // Check the _id
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return new Response("Product not found", { status: 404 });
        }

        const product = await ProductModal.findById(_id);

        const index = product.saved.findIndex((val) => val === String(userId));

        if (index === -1) {
            product.saved.push(userId);
        } else {
            product.saved = product.saved.filter((val) => val !== String(userId));
        }
       
        const updatedProduct = await ProductModal.findByIdAndUpdate(_id, product, {new: true });

        return new Response("Successfully Added To Fav", { status: 200 });
    } catch (error) {
        return new Response("Error Adding to Fav", { status: 500 });
    }
};
