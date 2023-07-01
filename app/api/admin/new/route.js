

import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user';
import { compare, hash } from 'bcrypt';

export const POST = async (request) => { 
    const data = await request.json();
    try {
        await connectMongo();

        // check user existance
        const oldAdmin = await UserModal.findOne({ email: data.email });
        if (oldAdmin) throw new Error("User already exists.")
        
        // create user
        const hashedPassword = await hash(data.password, 12)
        const newAdmin = await UserModal.create({ email: data.email, 
            password: hashedPassword, name: data.name, isAdmin: true });

        // await newAdmin.save();
        return new Response(JSON.stringify(newAdmin), { status: 201 })
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}


