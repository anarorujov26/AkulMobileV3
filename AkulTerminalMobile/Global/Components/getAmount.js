const getAmount = (positions) => {
    if (positions[0]) {
        let amount = 0;
        const ps = [...positions]

        for (let index = 0; index < ps.length; index++) {
            amount = Number(ps[index].Price) * Number(ps[index].Quantity);
        }

        return amount
    } else {
        return 0;
    }
}