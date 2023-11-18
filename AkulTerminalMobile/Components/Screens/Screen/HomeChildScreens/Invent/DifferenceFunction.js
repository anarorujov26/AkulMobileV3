const DifferenceFunction = (stock, quantity) => {
    let difference;
    let stockBalance = Number(stock);
    let quantityNumber = Number(quantity);

    if (stockBalance < 0) {
        difference = Math.abs(stockBalance) + quantityNumber;
    } else if (stockBalance >= 0) {
        difference = quantityNumber - stockBalance;
    }

    return difference;
}

export default DifferenceFunction;