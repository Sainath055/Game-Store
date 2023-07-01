
import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product.js'; 


export const GET = async (request) => {
    try {
        await connectMongo()

        const Products = await ProductModal.find({}, {_id:1, 
            title:1, rating:1,
            price:1, discount:1,})

        return new Response(JSON.stringify(Products), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch GET LESS DATA", { status: 500 })
    }
} 