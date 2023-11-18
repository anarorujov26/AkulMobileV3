const PriceTypeProses = (priceId) => {
    let id = Number(priceId);
    if(id == 9998){
        return "Price"
    }else if(id ==  9999){
        return "BuyPrice"
    }else if(id == 9997){
        return "MinPrice"
    }else{
        return "SelectedTypePrice"
    }
}

export default PriceTypeProses;