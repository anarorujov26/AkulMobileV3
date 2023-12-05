const GetAddUnits = (result) => {
    let units = { ...result.data.Body.PositionUnits }
    let products = [...result.data.Body.List[0].Positions]

    for (let index = 0; index < products.length; index++) {
        products[index].units = units[products[index].ProductId];
        for (let indexU = 0; indexU < units[products[index].ProductId].length; indexU++) {
            if (Number(products[index].UnitId) === Number(units[products[index].ProductId][indexU].Id)) {
                products[index].UnitName = units[products[index].ProductId][indexU].Name
                products[index].UnitTitle = units[products[index].ProductId][indexU].Title
            }
        }
    }

    return products;
}

export default GetAddUnits;