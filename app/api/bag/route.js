
import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product'
import UserModal from '@/models/user';

export const GET = async (request) => {

    const bagDataString = request.nextUrl.searchParams.get('bagData');
    const bagData = JSON.parse(bagDataString);

    try {
        await connectMongo()

        const products = await ProductModal.find({ _id: { $in: bagData } },{
            _id:1, title:1, rating:1, price:1, discount:1, mainImg:1,
            platform:1, genre:1,
        })

        return new Response(JSON.stringify(products), { status: 200 })

    } catch (error) {
        return new Response("Error in get in bag route", { status: 500 });
    }
}


// when Orderd from bag and payment succeded then DELETE will remove all the cart data

export const DELETE = async (request, { params }) => {

    const userIdString = request.nextUrl.searchParams.get('userId');
    const userId = JSON.parse(userIdString);
    
    try {
        await connectMongo();

        const user = await UserModal.findById(userId);
        if(!user) return new Response(JSON.stringify("User not found"), { status: 401 });

        user.set({ cartItems: [] });
        
        const updatedUser = await UserModal.findByIdAndUpdate(userId, user, { new: true });

        return new Response("All Products from bag are deleted", { status: 200 });
    } catch (error) {
        return new Response("Error deleting all Products form Bag", { status: 500 });
    }
};