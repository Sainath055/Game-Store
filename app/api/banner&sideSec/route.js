
import connectMongo  from '@/database/db.js'
import banNsideModel from '@/models/banner&sidesec'

export const GET = async (request) => {
    try {
        await connectMongo()

        const data = await banNsideModel.find({}, { sideHeading:1 ,sideSecTitles:1, bannerTitles:1 })

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch banner and sideSec titles", { status: 500 })
    }
} 