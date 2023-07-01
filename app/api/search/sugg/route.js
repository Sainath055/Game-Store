

import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product.js'; 

export const GET = async (request) => {

    const suggQueryString = request.nextUrl.searchParams.get('suggQuery');
    const suggQuery = JSON.parse(suggQueryString);

    try {
        await connectMongo()

        const Products = await ProductModal.find(
            {
                $or: [
                { title: { $regex: suggQuery, $options: 'i' } }
                ]
            },
            { _id: 1, title: 1, mainImg: 1 }
        );
        

        return new Response(JSON.stringify(Products), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch Suggestions", { status: 500 })
    }
} 