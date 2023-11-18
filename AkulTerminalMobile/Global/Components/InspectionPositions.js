const InspectionPositions = (positions, productId) => {

    let obj = {
        result: false,
        index: null
    }
    let ps = [...positions];
    ps.forEach(((element, index) => {
        if (element.ProductId == productId) {
            obj.result = true
            obj.index = index;
        }
    }))

    return obj;

}

export default InspectionPositions;