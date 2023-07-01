
import connectMongo  from '@/database/db.js'
import mongoose from 'mongoose';
import UserModal from '@/models/user';

export const DELETE = async (request, { params }) => {
    try {
        await connectMongo();

        // Find the prompt by ID and remove it
        await UserModal.findByIdAndRemove(params.id);

        return new Response("Admin deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Admin", { status: 500 });
    }
};