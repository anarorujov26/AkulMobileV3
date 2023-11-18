import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Api from "./Api";
import { ConvertFixedTable } from "./ConvertFixedTable";

const DocumentStockBalanceControl = async (data) => {
  let documentData = { ...data };
  let documentDataPositions = [...data.Positions];
  if (documentDataPositions[0]) {
    let obj = {
      moment: moment(documentData.Moment).format("YYYY-MM-DD HH:mm:ss"),
      stockid: documentData.StockId,
      token: await AsyncStorage.getItem("token")
    }
    let ids = [];

    documentDataPositions.forEach((element,index) => {
      documentDataPositions[element,index].StockBalance = null
    })

    documentDataPositions.forEach(element => {
      ids.push(element.ProductId);
    });

    obj.productids = ids;

    const result = await Api('stockbalancebyid/get.php', obj);
    let stockInfo = [...result.data.Body.List];

    for (let index = 0; index < documentDataPositions.length; index++) {
      for (let indexStock = 0; indexStock < stockInfo.length; indexStock++) {
        if (documentDataPositions[index].ProductId == stockInfo[indexStock].ProductId) {
          documentDataPositions[index].StockBalance = ConvertFixedTable(Number(stockInfo[indexStock].Quantity));
        } else {
        }
      }
    }

    documentData.Positions = documentDataPositions;

    return documentData;
  } else {
    return documentData;
  }

}

export default DocumentStockBalanceControl