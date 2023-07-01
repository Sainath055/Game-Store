
import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user.js'

export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const userName = data.userName
    const _id = params.userId
    try {
        await connectMongo();

        const user = await UserModal.findById(_id);

        user.name = userName

        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response(JSON.stringify("Username successfully updated"), { status: 200 });
    } catch (error) {
        return new Response("Error updating the username", { status: 500 });
    }
};