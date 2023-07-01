
import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product'


export const GET = async (request, { params }) => {
    const userId = params.userId
    try {
        await connectMongo()

        const allLibraryItems = await ProductModal.find( { library: userId },{
            _id:1, title:1, mainImg:1
        } );

        return new Response(JSON.stringify(allLibraryItems), { status: 200 })

    } catch (error) {
        return new Response("Error in get in favourites route", { status: 500 });
    }
}