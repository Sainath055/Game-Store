
import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user';
// import { compare, hash } from 'bcrypt';

export const GET = async (request) => {
    try {
        await connectMongo()

        const data = await UserModal.find({ isAdmin: true, email: { $ne: 'admin@default.com' } }, 
            { _id:1 ,name:1, email:1, password:1 })

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Admins", { status: 500 })
    }
} 

