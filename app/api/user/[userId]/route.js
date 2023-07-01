
import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user.js'

export const GET = async (request, { params }) => {
    const _id = params.userId
    try {
        await connectMongo()

        const user = await UserModal.findById({_id},{
            name:1, email:1, cardList:1,
        })
        if (!user) return new Response("user Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Error in get in cardList route", { status: 500 });
    }
}
 

export const DELETE = async (request, { params }) => {
    const _id = params.userId
    try {
        await connectMongo();

        const user = await UserModal.findOneAndDelete({_id:_id})

        const userCheck = await UserModal.findById(_id)

        if(userCheck===null) {
            return new Response(JSON.stringify("User account successfully DELETED"), { status: 200 });            
        }

    } catch (error) {
        return new Response("Error deleting User account", { status: 500 });
    }
};