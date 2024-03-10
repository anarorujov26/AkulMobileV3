import RetioDiscount from "./RetioDiscount";

const getAmountDiscount = async (data) => {
    if (data.Positions[0]) {
        let objectData = { ...data };
        let ps = [...data.Positions];

        let basicAmount = 0;
        let amount = Number(objectData.Amount);


        for (let index = 0; index < ps.length; index++) {
            basicAmount += String(ps[index].BasicPrice) * String(ps[index].Quantity);
        }


        return RetioDiscount(basicAmount, amount);
    } else {
        return 0;
    }

}

export default getAmountDiscount;