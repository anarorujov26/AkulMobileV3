let obj = {
    enters:"Daxilolma",
    loss:"Silinme",
    moves:"Yerdəyişmə",
    supplys:"Alış",
    supplyreturns:"Alış Qiyməti",
    demands:"Satış",
    demandreturns:"Satış Qiyməti",
    sales:"Pərakəndə Satış",
    returns:"Qaytarma"
}

const DocumentReturn = (type) => {
    return obj[type]
}

export default DocumentReturn