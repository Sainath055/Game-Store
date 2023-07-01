

import connectMongo  from '@/database/db.js'
import OrderModal from '@/models/orders'

export const GET = async () => {
    try {
        await connectMongo()

        const allOrders = await OrderModal.find({});

        return new Response(JSON.stringify(allOrders), { status: 200 })

    } catch (error) {
        return new Response("Error in get in favourites route", { status: 500 });
    }
}