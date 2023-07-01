
import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product.js'; 

export const GET = async (request) => {
    try {
        await connectMongo()

        const Products = await ProductModal.find({}, {_id:1, 
            title:1, genre:1, rating:1, platform:1, year:1,
            price:1, discount:1, description:1, mainImg:1, 
            videoLinkKey:1, images:1, createdAt:1, updatedAt:1})

        return new Response(JSON.stringify(Products), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Products", { status: 500 })
    }
} 
