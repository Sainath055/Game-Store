

import connectMongo  from '@/database/db.js'
import OrderModal from '@/models/orders'
import ProductModal from '@/models/product'


export const GET = async (request, { params }) => {
    const _id = params.userId
    try {
        await connectMongo()

        const allOrders = await OrderModal.find( { userId: _id } );

        return new Response(JSON.stringify(allOrders), { status: 200 })

    } catch (error) {
        return new Response("Error in get in favourites route", { status: 500 });
    }
}


export const POST = async (request, { params }) => {
    const data = await request.json();
    const products = data.products;
    const userId = data.userId;

    try {
        await connectMongo();

        const updateProduct = async (productId, userId) => {
            const product = await ProductModal.findOne({ _id: productId });
          
            product.library = [...product.library, userId];

            product.saved = product.saved.filter((item) => item !== userId)

            await product.save();
        };

        if(data.paymentStatus === 'Payment successful') {
            products.forEach((product) => {
                updateProduct(product._id, userId);
            });
        }
        

        const newOrder = new OrderModal(data);
        await newOrder.save();
        
        return new Response(JSON.stringify(newOrder), { status: 201 })
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}


// export const PATCH = async (request, { params }) => {
//     const data = await request.json();
//     const productId = data.productId
//     const _id = params.userId
//     try {
//         await connectMongo();

//         const user = await UserModal.findById(_id);
 
//         const index = user.cartItems.findIndex((val) => val === String(productId));
       
//         if (index === -1) {
//             user.cartItems = [...user.cartItems, productId]
//         } else {
//             return new Response("Item already in cart", { status: 404 });
//         }
//         const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

//         return new Response("Successfully Added To Bag", { status: 200 });
//     } catch (error) {
//         return new Response("Error Adding to Bag", { status: 500 });
//     }
// };