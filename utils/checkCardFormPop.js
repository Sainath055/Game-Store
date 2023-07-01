import getCardType from "./getCardType";

export function similarCardCheck(newData, oldData) { // for CardFormPop.jsx
    const validations = {
        cardNumber: oldData.cardNumber === newData.cardNumber,
        cardHolder: oldData.cardHolder.trim() === newData.cardHolder.trim(),
        exp_month: oldData.exp_month === newData.exp_month,
        exp_year: oldData.exp_year === newData.exp_year,
    };
  
    return Object.values(validations).every((val) => val);
  }
  
export function checkCardValuesNoCvc(cardData) { // for CardFormPop.jsx

  var cardType = getCardType(cardData.cardNumber)

    const validations = {
      cardNumber: cardData.cardNumber.length >= (cardType === 'Amex' ? 15 : 16),
      cardHolder: cardData.cardHolder.trim().length >= 4,
      exp_month: cardData.exp_month.length === 2,
      exp_year: cardData.exp_year.length === 4,
    };
      
    return Object.values(validations).every((val) => val);
  }

export function SameCardNumcheck(cardNumber, allCardsObjs) { // for CardFormPop.jsx

  const foundCard = allCardsObjs.find((card) => card.cardNumber === cardNumber);
  return !!foundCard;

}