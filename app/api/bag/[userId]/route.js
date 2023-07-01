
import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user';

export const GET = async (request, { params }) => {
    const _id = params.userId
    try {
        await connectMongo()

        const user = await UserModal.findById(_id)
        if (!user) return new Response("user Not Found", { status: 404 });

        const bagItems = user.cartItems

        return new Response(JSON.stringify(bagItems), { status: 200 })

    } catch (error) {
        return new Response("Error in get in bag route", { status: 500 });
    }
}
 
export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const productId = data.productId
    const _id = params.userId
    try {
        await connectMongo();

        const user = await UserModal.findById(_id);
 
        const index = user.cartItems.findIndex((val) => val === String(productId));
       
        if (index === -1) {
            user.cartItems = [...user.cartItems, productId]
        } else {
            return new Response("Item already in cart", { status: 404 });
        }
        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response("Successfully Added To Bag", { status: 200 });
    } catch (error) {
        return new Response("Error Adding to Bag", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {

    const productIdString = request.nextUrl.searchParams.get('productId');
    const productId = JSON.parse(productIdString);
    const _id = params.userId

    try {
        await connectMongo();

        const user = await UserModal.findById(_id);
        const index = user.cartItems.findIndex((val) => val === String(productId));
 
        if (index === -1) {
            return new Response("Item Not Found in the Bag_database", { status: 404 });
        } else {
            user.cartItems = user.cartItems.filter((val) => val !== String(productId));
        }

        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response("Product deleted successfully from Bag", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Product form Bag", { status: 500 });
    }
};