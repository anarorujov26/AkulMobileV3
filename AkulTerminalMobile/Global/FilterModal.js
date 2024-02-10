import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomColors from './Colors/CustomColors';
import CustomerModal from './Components/Modals/CustomerModal';
import Api from './Components/Api';
import { ActivityIndicator } from 'react-native';
import GroupModal from './Components/Modals/GroupModal';
import IsWeightModal from './Components/Modals/IsWeightModal';
import CustomTextInput from './UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ArchivModal from './Components/Modals/ArchivModal';
import ProductModal from './Components/Modals/ProductModal';
import StockFilterModal from './Components/Modals/StockFilterModal';
import OwnerModal from './Components/Modals/OwnerModal';
import CustomerGroupsModal from './Components/Modals/CustomerGroupsModal';
import SalePointsModal from './Components/Modals/SalePointsModal';
import AccountsModal from './Components/Modals/AccountsModal';
import SpendItemModal from './Components/Modals/SpendItemModal';
import SpendTypeModal from './Components/Modals/SpendModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterDate from './UI/FilterDate';
import PayTypeModal from './Components/Modals/PayTypeModa';
import PaydirModal from './Components/Modals/PaydirModal';
import ZerosModal from './Components/Modals/ZerosModal';
import EmployeesModal from './Components/Modals/EmployeesModa';

const FilterModal = ({
  modalVisible,
  setModalVisible,
  obj,
  customer,
  customerName,
  group,
  ar,
  isWeight,
  products,
  stock,
  setState,
  owner,
  stockFrom,
  stockTo,
  customerGroup,
  salePoints,
  accounts,
  spendItem,
  spendType,
  momentFirst,
  momentEnd,
  api,
  pay,
  paydir,
  price,
  zeros,
  employees,
  supplier,
  supplierName
}) => {

  const [thisObj, setThisObj] = useState({});
  const [customerModal, setCustomerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [groupModal, setGroupModal] = useState(false)
  const [isWModal, setIsWModal] = useState(false);
  const [archivModal, setArchivModal] = useState(false);
  const [productsModal, setProductsModal] = useState(false);
  const [stockModal, setStockModal] = useState(false)
  const [ownerModal, setOwnerModal] = useState(false);
  const [stockFromModal, setStockFromModal] = useState(false);
  const [stockToModal, setStockToModal] = useState(false);
  const [customerGP, setCustomerGP] = useState(false);
  const [salePointModal, setSalePointModal] = useState(false);
  const [cashModal, setCashModal] = useState(false);
  const [spendItemModal, setSpendItemModal] = useState(false)
  const [spendTypeModal, setSpendTypeModal] = useState(false);
  const [momentFirstModal, setMomentFirstModal] = useState(false);
  const [momentEndModal, setMomentEndModal] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [paydirModal, setPaydirModal] = useState(false);
  const [zerosModal, setZerosModal] = useState(false);
  const [employeesModal, setEmployeesModal] = useState(false);
  const [supplierModal, setSupplierModal] = useState(false);

  const getAPI = async () => {
    setIsLoading(true);
    let obj = { ...thisObj };
    if (customer) {
      if (obj.cus) {
        delete obj.customerName
        obj.cusId = obj.cus;
        obj.customer = obj.cus;
      }
    }
    if (group) {
      delete obj.groupName
    }
    if (customerGroup) {
      delete obj.customerGroup
    }
    if (products) {
      if (obj.productId) {
        obj.productName = obj.productId
      }
    }
    if (stock) {
      if (obj.stockName) {
        delete obj.stockNAME
      }
    }
    if (owner) {
      if (obj.ownerName) {
        delete obj.ownerNAME
      }
    }
    if (stockTo) {
      if (obj.stockNameTo) {
        delete obj.stockNAMETo
      }
    }
    if (stockFrom) {
      if (obj.stockNameFrom) {
        delete obj.stockNAMEFrom
      }
    }
    if (salePoints) {
      if (obj.slpntName) {
        delete obj.slpntName
      }
    }
    if (accounts) {
      if (obj.cashid) {
        delete obj.cashname
      }
    }
    if (spendItem) {
      if (obj.spendItem) {
        delete obj.spendName
      }
    }
    if (spendType) {
      if (obj.sales) {
        delete obj.salesName
      }
    }
    if (obj.employeeId) {
      delete obj.employeeName
    }
    if (!obj.token) {
      obj.token = await AsyncStorage.getItem("token")
    }
    if (obj.momb) {
      if (!obj.mome) {
        alert("Bitmə tarixi əlavə edilməyib!")
        setIsLoading(false)
        return
      }
    }
    if (obj.mome) {
      if (!obj.momb) {
        alert("Başlama tarixi əlavə edilməyib!")
        setIsLoading(false)
        return
      }
    }
    if (obj.amb) {
      if (!obj.ame) {
        alert("Max.Qiymət əlavə edilməyib!")
        setIsLoading(false)
        return
      }
    }
    if (obj.ame) {
      if (!obj.amb) {
        alert("Min.Qiymət əlavə edilməyib!")
        setIsLoading(false)
        return
      }
    }

    const result = await Api(api, obj)
    if (result.data.Headers.ResponseStatus == "0") {
      if (result.data.Body.List[0]) {
        setState(result.data.Body.List);
      } else {
        setState(null)
      }
    } else {
      alert(result.data.Body)
    }
    setModalVisible(false);
    setIsLoading(false)
  }

  const getCLEAR = async () => {
    let obj2 = { ...obj }
    if (!obj2.token) {
      obj2.token = await AsyncStorage.getItem('token')
    }
    const result = await Api(api, obj2);
    if (result.data.Headers.ResponseStatus == "0") {
      setThisObj(obj);
      if (result.data.Body.List[0]) {
        setState(result.data.Body.List);
      } else {
        setState(null)
      }
    } else {
      alert(result.data.Body)
    }
    setModalVisible(false);
  }

  useEffect(() => {
    if (modalVisible && thisObj == null) {
      setThisObj({ ...obj })
    }
  }, [modalVisible])

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {
              thisObj == null ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size={30} color={CustomColors.primary} />
                </View>
                :
                <>
                  {
                    products &&
                    <>

                      <TouchableOpacity onPress={() => { setProductsModal(true) }}>
                        <CustomTextInput editable={false} text={"Məhsul"} width={'100%'} value={thisObj.productId ? thisObj.productName : "Məhsul"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    stock &&
                    <>

                      <TouchableOpacity onPress={() => { setStockModal(true) }}>
                        <CustomTextInput editable={false} text={"Anbar"} width={'100%'} value={thisObj.stockName ? thisObj.stockNAME : "Anbar"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dc dcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    stockFrom &&
                    <>

                      <TouchableOpacity onPress={() => { setStockFromModal(true) }}>
                        <CustomTextInput editable={false} text={"Anbardan"} width={'100%'} value={thisObj.stockNameFrom ? thisObj.stockNAMEFrom : "Anbardan"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    spendType &&
                    <>
                      <TouchableOpacity onPress={() => { setSpendTypeModal(true) }}>
                        <CustomTextInput editable={false} text={"Satış növü"} width={'100%'} value={thisObj.sales ? thisObj.salesName : "Satış Növü"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    stockTo &&
                    <>
                      <TouchableOpacity onPress={() => { setStockToModal(true) }}>
                        <CustomTextInput editable={false} text={"Anbara"} width={'100%'} value={thisObj.stockNameTo ? thisObj.stockNAMETo : "Anbara"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    salePoints &&
                    <>
                      <TouchableOpacity onPress={() => { setSalePointModal(true) }}>
                        <CustomTextInput editable={false} text={"Satış nöqtəsi"} width={'100%'} value={thisObj.slpnt ? thisObj.slpntName : "Satış nöqtəsi"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    owner &&
                    <>

                      <TouchableOpacity onPress={() => { setOwnerModal(true) }}>
                        <CustomTextInput editable={false} text={"Cavabdeh"} width={'100%'} value={thisObj.ownerName ? thisObj.ownerNAME : "Cavabdeh"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    pay &&
                    <>

                      <TouchableOpacity onPress={() => { setPayModal(true) }}>
                        <CustomTextInput editable={false} text={"Ödəniş növü"} width={'100%'} value={thisObj.paytype == "p" ? "Nağd" : thisObj.paytype == "i" ? "Köçürmə" : "Hamısı"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    paydir &&
                    <>
                      <TouchableOpacity onPress={() => { setPaydirModal(true) }}>
                        <CustomTextInput editable={false} text={"Əməliyyat"} width={'100%'} value={thisObj.paydir == "i" ? "Mədaxil" : thisObj.paydir == "o" ? "Məxaric" : "Hamısı"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    customer &&
                    <>

                      <TouchableOpacity onPress={() => { setCustomerModal(true) }}>
                        <CustomTextInput editable={false} text={customerName} width={'100%'} value={thisObj.customerName ? thisObj.customerName : "Təchizatçı"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    customerGroup &&
                    <>

                      <TouchableOpacity onPress={() => { setCustomerGP(true) }}>
                        <CustomTextInput editable={false} text={'Müştəri qrupu'} width={'100%'} value={thisObj.gp ? thisObj.customerGroup : "Müştəri qrupu"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    supplier &&
                    <>

                      <TouchableOpacity onPress={() => { setSupplierModal(true) }}>
                        <CustomTextInput editable={false} text={supplierName} width={'100%'} value={thisObj.supplierId ? thisObj.supplier : supplierName} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    group &&
                    <>
                      <TouchableOpacity onPress={() => { setGroupModal(true) }}>
                        <CustomTextInput editable={false} text={'Qrup'} width={'100%'} value={thisObj.gp ? thisObj.groupName : "Qrup"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    spendItem &&
                    <>
                      <TouchableOpacity onPress={() => { setSpendItemModal(true) }}>
                        <CustomTextInput editable={false} text={'Xərc maddələri'} width={'100%'} value={thisObj.spendItem ? thisObj.spendName : "Xərc maddələri"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    accounts &&
                    <>
                      <TouchableOpacity onPress={() => { setCashModal(true) }}>
                        <CustomTextInput editable={false} text={'Hesab'} width={'100%'} value={thisObj.cashid ? thisObj.cashname : "Hesab"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    ar &&
                    <>
                      <TouchableOpacity onPress={() => { setIsWModal(true) }}>
                        <CustomTextInput editable={false} text={'Arxiv'} width={'100%'} value={thisObj.ar == "1" ? "Arxivli" : thisObj.ar == "0" ? "Arxivsiz" : "Hamısı"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    isWeight &&
                    <>
                      <TouchableOpacity onPress={() => { setIsWModal(true) }}>
                        <CustomTextInput editable={false} text={'Çəki'} width={'100%'} value={thisObj.wg == "1" ? "Çəkili" : thisObj.wg == "0" ? "Çəkisiz" : "Hamısı"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    employees &&
                    <>
                      <TouchableOpacity onPress={() => { setEmployeesModal(true) }}>
                        <CustomTextInput editable={false} text={'Əməkdaşlar'} width={'100%'} value={thisObj.employeeId ? thisObj.employeeName : "Əməkdaşlar"} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    zeros &&
                    <>
                      <TouchableOpacity onPress={() => { setZerosModal(true) }}>
                        <CustomTextInput editable={false} text={'Siyahı'} width={'100%'} value={
                          thisObj.zeros ?
                            thisObj.zeros == "4" ? "0 olanlar"
                              : thisObj.zeros == "3" ? "0 olmayanlar"
                                : thisObj.zeros == "2" ? "Borc (verəcək)"
                                  : thisObj.zeros == "1" ? "Borc (alacaq)"
                                    : "Bütün borclar" : 'siyahı'
                        } end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    price &&
                    <>
                      <TouchableOpacity>
                        <CustomTextInput keyboardType={'numeric'} placeholder={'məbləğ'} text={'Min.Məbləğ'} width={'100%'} onChangeText={(e) => {
                          setThisObj(rel => ({ ...rel, ['amb']: e }))
                        }} value={thisObj.amb} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    price &&
                    <>
                      <TouchableOpacity >
                        <CustomTextInput onChangeText={(e) => {
                          setThisObj(rel => ({ ...rel, ['ame']: e }))
                        }} keyboardType={'numeric'} placeholder={'məbləğ'} text={'Max.Məbləğ'} width={'100%'} value={thisObj.ame} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    momentFirst &&
                    <>
                      <TouchableOpacity onPress={() => { setMomentFirstModal(true) }}>
                        <CustomTextInput editable={false} text={'Başlama Tarixi'} width={'100%'} value={thisObj.momb ? thisObj.momb : 'Tarix'} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  {
                    momentEnd &&
                    <>
                      <TouchableOpacity onPress={() => { setMomentEndModal(true) }}>
                        <CustomTextInput editable={false} text={'Bitmə Tarixi'} width={'100%'} value={thisObj.mome ? thisObj.mome : 'Tarix'} end={true} endText={<AntDesign name='right' size={15} />} />
                      </TouchableOpacity>
                      <View style={{ width: '95%', height: 1, backgroundColor: "#dcdcdc", alignSelf: 'center' }} />
                    </>
                  }
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                    <TouchableOpacity onPress={getCLEAR} style={styles.button}>
                      <Text style={styles.text}>Təmizlə</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={getAPI} style={styles.button}>
                      {
                        isLoading ?
                          <ActivityIndicator size={20} color={CustomColors.primary} />
                          :
                          <Text style={styles.text}>Axtar</Text>

                      }
                    </TouchableOpacity>
                  </View>
                </>
            }
          </View>
        </View>
      </Modal>
      <CustomerModal modalVisible={customerModal} setModalVisible={setCustomerModal} nameType={'customerName'} idType={'cus'} state={setThisObj} />
      <CustomerModal modalVisible={supplierModal} setModalVisible={setSupplierModal} nameType={'supplier'} idType={'supplierId'} state={setThisObj} />
      <GroupModal modalVisible={groupModal} setModalVisible={setGroupModal} nameType={'groupName'} idType={'gp'} state={setThisObj} />
      <IsWeightModal modalVisible={isWModal} setModalVisible={setIsWModal} setState={setThisObj} />
      <ArchivModal modalVisible={archivModal} setModalVisible={setArchivModal} setState={setThisObj} />
      <ProductModal modalVisible={productsModal} setModalVisible={setProductsModal} state={setThisObj} nameType={'productName'} idType={'productId'} />
      <StockFilterModal modalVisible={stockModal} setModalVisible={setStockModal} state={setThisObj} idType={'stockName'} nameType={'stockNAME'} />
      <StockFilterModal modalVisible={stockFromModal} setModalVisible={setStockFromModal} state={setThisObj} idType={'stockNameFrom'} nameType={'stockNAMEFrom'} />
      <StockFilterModal modalVisible={stockToModal} setModalVisible={setStockToModal} state={setThisObj} idType={'stockNameTo'} nameType={'stockNAMETo'} />
      <OwnerModal modalVisible={ownerModal} setModalVisible={setOwnerModal} state={setThisObj} nameType={'ownerNAME'} idType={'ownerName'} />
      <CustomerGroupsModal modalVisible={customerGP} setModalVisible={setCustomerGP} state={setThisObj} nameType={'customerGroup'} idType={'gp'} />
      <SalePointsModal modalVisible={salePointModal} setModalVisible={setSalePointModal} state={setThisObj} nameType={'slpntName'} idType={'slpnt'} />
      <AccountsModal modalVisible={cashModal} setModalVisible={setCashModal} state={setThisObj} nameType={'cashname'} idType={'cashid'} />
      <SpendItemModal modalVisible={spendItemModal} setModalVisible={setSpendItemModal} state={setThisObj} nameType={'spendName'} idType={'spendItem'} />
      <SpendTypeModal modalVisible={spendTypeModal} setModalVisible={setSpendTypeModal} state={setThisObj} nameType={'salesName'} idType={'sales'} />
      <FilterDate s={1} setDate={setThisObj} date={thisObj.momb ? thisObj.momb : new Date()} type={'momb'} open={momentFirstModal} setOpen={setMomentFirstModal} />
      <FilterDate s={2} setDate={setThisObj} date={thisObj.mome ? thisObj.mome : new Date()} type={'mome'} open={momentEndModal} setOpen={setMomentEndModal} />
      <PayTypeModal modalVisible={payModal} setModalVisible={setPayModal} setState={setThisObj} />
      <PaydirModal modalVisible={paydirModal} setModalVisible={setPaydirModal} setState={setThisObj} />
      <ZerosModal modalVisible={zerosModal} setModalVisible={setZerosModal} setState={setThisObj} />
      <EmployeesModal modalVisible={employeesModal} setModalVisible={setEmployeesModal} idType={'employeeId'} nameType={'employeeName'} state={setThisObj} />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: '9%',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  modalText: {
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: "grey",
    marginBottom: 20
  },
  input_text: {
    marginBottom: 10,
    color: "grey"
  },
  button: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',

  },
  text: {
    fontSize: 20,
    color: CustomColors.primary,
  }
});

export default FilterModal;