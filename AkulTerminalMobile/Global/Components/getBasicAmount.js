const getBasicAmount = async (data) => {
    if (data.Positions[0]) {
        let ps = [...data.Positions];

        let basicAmount = 0;


        for (let index = 0; index < ps.length; index++) {
            basicAmount += String(ps[index].BasicPrice) * String(ps[index].Quantity);
        }
        
        return basicAmount;
    } else {
        return 0;
    }
}

export default getBasicAmount;