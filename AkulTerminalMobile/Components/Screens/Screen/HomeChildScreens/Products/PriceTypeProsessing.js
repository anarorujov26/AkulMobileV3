const PriceTypeProsessing = (data, priceTypes) => {
    let priceData = { ...data };

    for (let index = 0; index < priceData.Prices.length; index++) {
        for (let indexPriceData = 0; indexPriceData < priceTypes.length; indexPriceData++) {
            if (priceTypes[indexPriceData].Id == priceData.Prices[index].PriceType) {
                priceData.Prices[index].PriceName = priceTypes[indexPriceData].Name;
            }
        }
    }

    return priceData;
}

export default PriceTypeProsessing;