

export default function getCardType(cardNumber) {
  let re = /^4\d{0,15}/;
  if (re.test(cardNumber)) return "Visa";

  re = /^3[47]\d{0,13}/;
  if (re.test(cardNumber)) return "Amex";

  re = /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/;
  if (re.test(cardNumber)) return "Mastercard";

  re = /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/;
  if (re.test(cardNumber)) return "Discover";

  re = /^62\d{0,14}/;
  if (re.test(cardNumber)) return "Unionpay";

  re = /^(?:35\d{0,2})\d{0,12}/;
  if (re.test(cardNumber)) return "Jcb";

  re = /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/;
  if (re.test(cardNumber)) return "Maestro";

  re = /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/;
  if (re.test(cardNumber)) return "Diners";

  return "Unknown"; // default type
}
