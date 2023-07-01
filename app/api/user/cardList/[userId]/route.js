
import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user.js'

export const GET = async (request, { params }) => {
    const _id = params.userId
    try {
        await connectMongo()

        const user = await UserModal.findById(_id)
        if (!user) return new Response("user Not Found", { status: 404 });

        const cardsData = user.cardList

        return new Response(JSON.stringify(cardsData), { status: 200 })

    } catch (error) {
        return new Response("Error in get in cardList route", { status: 500 });
    }
}
 
export const POST = async (request, { params }) => {
    const data = await request.json();
    const cardData = data.cardData
    const _id = params.userId
    try {
        await connectMongo()

        const user = await UserModal.findById(_id)
        if (!user) return new Response(JSON.stringify("user Not Found"), { status: 404 });

        user.cardList = [...user.cardList, cardData];

        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response(JSON.stringify('Card successfully ADDED'), { status: 200 })
    } catch (error) {
        return new Response("Error in get in cardList route", { status: 500 });
    }
}
 
export const PATCH = async (request, { params }) => {
    const data = await request.json();
    const selectedCardNumber = data.selectedCardNumber
    const cardData = data.cardData
    const _id = params.userId
    try {
        await connectMongo();

        const user = await UserModal.findById(_id);

        const index = user.cardList.findIndex((obj) => obj.cardNumber === selectedCardNumber);
       
        if (index === -1) {
            return new Response(JSON.stringify("Selected card not found in cardList"), { status: 404 });
        } else {
            user.cardList.splice(index, 1, cardData);
        }

        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response(JSON.stringify("Card successfully UPDATED"), { status: 200 });
    } catch (error) {
        return new Response("Error Adding card to cardList", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {

    const cardNumberString = request.nextUrl.searchParams.get('cardNumber');
    const cardNumber = JSON.parse(cardNumberString);
    const _id = params.userId

    try {
        await connectMongo();

        const user = await UserModal.findById(_id);
        const index = user.cardList.findIndex((obj) => obj.cardNumber === cardNumber);
 
        if (index === -1) {
            return new Response(JSON.stringify("Card Not Found in the cardList"), { status: 404 });
        } else {
            user.cardList = user.cardList.filter((obj) => obj.cardNumber !== cardNumber);
        }

        const updatedUser = await UserModal.findByIdAndUpdate(_id, user, {new: true });

        return new Response(JSON.stringify("Card successfully DELETED"), { status: 200 });
    } catch (error) {
        return new Response("Error deleting Card form cardList", { status: 500 });
    }
};