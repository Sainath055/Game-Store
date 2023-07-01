
import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user.js'
import { compare, hash } from 'bcrypt';

export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const oldPass = data.oldPass
    const newPass = data.newPass
    const _id = params.userId

    try {
        await connectMongo();

        const user = await UserModal.findById(_id);

        const checkOldPass = await compare(oldPass, user.password);
        const newHashedPassword = await hash(newPass, 12)

        if(!checkOldPass) {
            return new Response(JSON.stringify("Incorrect Old Password"), { status: 404 });
        } else {
            user.password = newHashedPassword
        }
   
        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response(JSON.stringify("Password successfully updated"), { status: 200 });
    } catch (error) {
        return new Response("Error in updating password", { status: 500 });
    }
};