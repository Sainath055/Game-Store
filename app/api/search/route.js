

import connectMongo  from '@/database/db.js'
import ProductModal from '@/models/product.js'; 

export const GET = async (request) => {

    const searchQuery = request.nextUrl.searchParams.get('q');
    const priceQuery = request.nextUrl.searchParams.get('p')
    const discountQuery = request.nextUrl.searchParams.get('d');
    const genreQuery = request.nextUrl.searchParams.get('g');
    const platformQuery = request.nextUrl.searchParams.get('pt');

    const pageQuery = request.nextUrl.searchParams.get('page') || 1;
    const page = Number(pageQuery)

    const title = searchQuery
    let price = null
    let discount = null
    const genre = genreQuery ? genreQuery.split(',') : null
    const platform = platformQuery ? platformQuery.split(',') : null

    switch (priceQuery) {
        case 'p-u-2000':
            price = 2000
            break;
        case 'p-u-3000':
            price = 3000
            break;
        case 'p-u-4000':
            price = 4000
            break;
        default:
            price = null
            break;
    }


    switch (discountQuery) {
        case 'd-20-a':
            discount = 20
            break;
        case 'd-30-a':
            discount = 30
            break;
        case 'd-50-a':
            discount = 50
            break;
        default:
            discount = null
            break;
    }
    
    try {
        await connectMongo()

        const query = {};

        if (title) {
        query.title = { $regex: title, $options: 'i' };
        }

        if (price) {
        query.finalPrice = { $lte: price };
        }

        if (discount) {
        query.discount = { $gte: discount };
        }

        if (genre && genre.length > 0) {
        query.genre = { $in: genre };
        }

        if (platform && platform.length > 0) {
        query.platform = { $in: platform };
        }

        let Products;

        if (Object.keys(query).length > 0) {
            const LIMIT = 12;
            const startIndex = (Number(page) - 1) * LIMIT;
            const aggregationPipeline = [
                {
                    $addFields: {
                        finalPrice: {
                            $cond: {
                                if: { $eq: [null, "$discount"] },
                                then: "$price",
                                else: { $multiply: ["$price", { $subtract: [1, { $divide: ["$discount", 100] }] }] }
                            }
                        }
                    }
                },
                {
                    $match: query
                },
                {
                    $project: {
                        _id:1, title:1, rating:1, price:1, discount:1, mainImg:1, saved:1, library:1
                    }
                }
            ];
            const countPipeline = [...aggregationPipeline];
            countPipeline.push(
              {
                $group: {
                  _id: null,
                  totalDocuments: { $sum: 1 }
                }
              }
            );
          
            const countResult = await ProductModal.aggregate(countPipeline);
            const totalDocuments = countResult.length > 0 ? countResult[0].totalDocuments : 0;
          
            aggregationPipeline.push(
              {
                $skip: startIndex
              },
              {
                $limit: LIMIT
              }
            );

            const searchedProducts = await ProductModal.aggregate(aggregationPipeline);
            Products = {
                allGames : false,
                allProducts : searchedProducts,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(totalDocuments / LIMIT)
            }

        } else {
            const LIMIT = 12;
            const startIndex = (Number(page) - 1) * LIMIT;
            const total = await ProductModal.countDocuments({});
            const limitProducts = await ProductModal.find({}, {
                _id:1, title:1, rating:1, price:1, discount:1, mainImg:1, saved:1, library:1
            }).sort({ _id: 1 }).limit(LIMIT).skip(startIndex);
            Products = {
                allGames : true,
                allProducts : limitProducts,
                currentPage: Number(page), 
                numberOfPages: Math.ceil(total / LIMIT)
            }
        }

        return new Response(JSON.stringify(Products), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Searched Products", { status: 500 })
    }
} 