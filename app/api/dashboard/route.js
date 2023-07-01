

import connectMongo  from '@/database/db.js'
import OrderModal from '@/models/orders'
import ProductModal from '@/models/product'
import UserModal from '@/models/user'

export const GET = async () => {
    try {
        await connectMongo()

        const allOrders = await OrderModal.find({},{paymentStatus:1});
        const allProducts = await ProductModal.find({},{genre:1, platform:1});
        const allUsers = await UserModal.find({},{googleAccount:1, isAdmin:1});

        return new Response(JSON.stringify({
            allOrders: allOrders,
            allProducts : allProducts,
            allUsers: allUsers
        }), { status: 200 })

    } catch (error) {
        return new Response("Error in get in favourites route", { status: 500 });
    }
}