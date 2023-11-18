import { ConvertFixedTable } from "./ConvertFixedTable";

const RetioDiscount = (basicPrice, price) => {
    if (basicPrice === 0) return 0;

    let totalDISC = 100 - price * 100 / basicPrice

    return ConvertFixedTable(Number(totalDISC));
}

export default RetioDiscount;