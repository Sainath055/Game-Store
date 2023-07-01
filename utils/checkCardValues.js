

export default function checkCardValues(cardData) {

  const validations = {
    cardNumber: cardData.cardNumber.length >= 15,
    cardHolder: cardData.cardHolder.length >= 4,
    exp_month: cardData.exp_month.length === 2,
    exp_year: cardData.exp_year.length === 4,
    cvc: cardData.cvc.length >= 3,
  };
    
  return Object.values(validations).every((val) => val);
}