
import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product'

export const GET = async (request, { params }) => {
    const _id = params.userId
    try {
        await connectMongo()

        const favProducts = await ProductModal.find({ saved: _id },{
            _id:1, title:1, rating:1, price:1, discount:1, mainImg:1, platform:1,
        });

        return new Response(JSON.stringify(favProducts), { status: 200 })

    } catch (error) {
        return new Response("Error in get in favourites route", { status: 500 });
    }
}


export const DELETE = async (request, { params }) => {

    const prodIdString = request.nextUrl.searchParams.get('prodId');
    const prodId = JSON.parse(prodIdString);
    const _id = params.userId

    try {
        await connectMongo();

        const product = await ProductModal.findById(prodId);
        if (!product) return new Response(JSON.stringify("Product Not Found"), { status: 404 });

        product.saved = product.saved.filter((item) => item !== _id);
        
        const updatedProduct = await ProductModal.findByIdAndUpdate(prodId, product, {new: true });

        return new Response(JSON.stringify("Item successfully Removed"), { status: 200 });
    } catch (error) {
        return new Response("Error deleting Card form cardList", { status: 500 });
    }
};