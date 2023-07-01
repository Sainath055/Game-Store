

export default function getPrice(price, discount) {
    var totalValue = price - (price * (discount / 100))
    return totalValue.toFixed();
}