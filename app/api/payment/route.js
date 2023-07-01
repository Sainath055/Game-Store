
import Stripe from 'stripe';


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


export const POST = async (request) => {
    const data = await request.json();
    const { amount, cardNumber, exp_month, exp_year, cvc } = data;

    try {
      // create card details token...
      const token = await stripe.tokens.create({
          card: {
            number: cardNumber,
            exp_month: exp_month,
            exp_year: exp_year, 
            cvc: cvc,
          },
        });

      const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'inr',
      });

      return new Response(JSON.stringify({ 
          clientSecret: paymentIntent.client_secret,
          token: token
      }), { status: 201 })
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return new Response(JSON.stringify('Your card number is incorrect'), { status: 500 });
    }
}


