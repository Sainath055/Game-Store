
import connectMongo  from '@/database/db.js';
import mongoose from 'mongoose';
import banNsideModel from '@/models/banner&sidesec';


export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const _id = params.id
    try {
        await connectMongo();
        // Check the _id
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return new Response("No data, Check ID", { status: 404 });
        }
        // Update the prompt with new data
        const updatedData = await banNsideModel.findByIdAndUpdate(_id, {...data, _id}, {new: true });

        return new Response("Successfully updated the Banner and Side-Section Data", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Banner and Side-Section Data", { status: 500 });
    }
};