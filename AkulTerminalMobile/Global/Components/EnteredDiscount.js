import { ConvertFixedTable } from "./ConvertFixedTable";

const EnteredDiscount = (basicPrice, discount) => {
    if (basicPrice == 0) return 0;
    let totalDisc = discount * basicPrice;
    totalDisc = totalDisc / 100;
    return ConvertFixedTable(Number(basicPrice - totalDisc));
}

export default EnteredDiscount;