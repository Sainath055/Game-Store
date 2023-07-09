
import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product.js'; 
import banNsideModel from '@/models/banner&sidesec'

export const GET = async (request) => {
    try {
        await connectMongo()

        const Products = await ProductModal.find({}, {
            _id:1, title:1, rating:1, price:1, discount:1, mainImg:1, saved:1, library:1
        })
        
        const getBanNsideIds = await banNsideModel.find({}, {
            bannerList:1, sideSecList:1, sideHeading:1
        })    
        const bannerList = getBanNsideIds[0].bannerList
        const sideSecList = getBanNsideIds[0].sideSecList
        const sideHeading = getBanNsideIds[0].sideHeading

        const allListIds = [...bannerList, ...sideSecList]
      
        const bannerListProducts = await ProductModal.find({ _id: { $in: bannerList } }, {
            _id:1, title:1, rating:1, price:1, discount:1, mainImg:1, description:1,
            platform:1, genre:1, year:1, videoLinkKey:1, saved:1, library:1
        })    
        const sideSecListProducs = await ProductModal.find({ _id: { $in: sideSecList } }, {
            _id:1, title:1, rating:1, price:1, discount:1, mainImg:1
        })   

        const updatedProducts = Products.filter((item) => !allListIds.includes(item.id));
        
        return new Response(JSON.stringify({
            allProducts:updatedProducts.splice(0,18), 
            bannerProducts:bannerListProducts,
            sideSecProducts:sideSecListProducs,
            sideSecHeading:sideHeading,
        }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Products", { status: 500 })
    }
} 
