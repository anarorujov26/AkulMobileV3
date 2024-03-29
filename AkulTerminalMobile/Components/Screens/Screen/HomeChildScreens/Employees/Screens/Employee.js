import { ActivityIndicator, StyleSheet, Switch, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import { InputItem, List } from '@ant-design/react-native';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import { CustomToLowerCase } from '../../../../../../Global/Components/CustomToLowerCase';
import CustomSuccessButton from '../../../../../../Global/UI/CustomSuccessButton';
import getOwner from '../../../../../../Global/Components/getOwner';
import getDepartment from './../../../../../../Global/Components/getDepartment';
import getSalePoint from './../../../../../../Global/Components/getSalePoint';
import DepratmentModal from './../../../../../../Global/Components/Modals/DepratmentModal';
import OwnerModal from './../../../../../../Global/Components/Modals/OwnerModal';
import SalePointsModal from './../../../../../../Global/Components/Modals/SalePointsModal';
import { EmployeesGlobalContext } from '../EmployeesGlobalState';


const Employee = ({ route, navigation }) => {

  const {employee, setEmployee, empsListRender, setEmpsListRender } = useContext(EmployeesGlobalContext);

  const { id } = route.params;

  const [saveButton, setSaveButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ownerModal, setOwnerModal] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [salepointModal, setSalepointModal] = useState(false);

  const getEmp = async (empId) => {
    if (empId !== null) {
      const result = await Api('employees/get.php', {
        id: empId,
        token: await AsyncStorage.getItem('token')
      })


      if (result.data.Body.List[0]) {
        let data = { ...result.data.Body.List[0] }
        data.SalaryMonth = ConvertFixedTable(Number(data.SalaryMonth));
        data.OwnerName = await getOwner(data.OwnerId)
        data.DepartmentName = await getDepartment(data.DepartmentId)
        if (data.SalePointId !== "") {
          data.SalePointName = await getSalePoint(data.SalePointId);
        }

        setEmployee(data);
      }
    } else {

      let owner = { ...await getOwner('', true) };
      let department = { ...await getDepartment('', true) }
      let obj = {
        Name: "",
        Barcode: "",
        DepartmentId: department.Id,
        DepartmentName: department.Name,
        OwnerId: owner.Id,
        OwnerName: owner.Name,
        SalaryMonth:0,
        Phone:"",
      }

      const result = await Api('barcode/get.php', { w: 2, token: await AsyncStorage.getItem("token") })
      obj.Barcode = result.data.Body;
      setEmployee(obj);
    }
  }

  const getSaveProsessing = async () => {
    setIsLoading(true);
    if (employee.Name == "") {
      alert("Ad boş buraqmaq olmaz!")
    } else {
      let data = { ...employee };
      let lowerData = { ...CustomToLowerCase(data) };
      lowerData.token = await AsyncStorage.getItem("token");
      if (lowerData.barcode === "") {
        let obj = {
          w: 2, token: await AsyncStorage.getItem("token")
        }
        const result = await Api('barcode/get.php', obj)
        if (result.data.Headers.ResponseStatus == "0") {
          lowerData.barcode = result.data.Body;
        } else {
          alert(result.data.Body);
        }

      }

      lowerData.salaryday = Number(lowerData.salaryday);
      lowerData.salaryhour = Number(lowerData.salaryhour);
      lowerData.active = lowerData.active == 1 ? true : false
      lowerData.barcode = String(lowerData.barcode)
      console.log(lowerData);
      const result = await Api("employees/put.php", lowerData);
      if (result.data.Headers.ResponseStatus == "0") {
        setEmployee(null)
        getEmp(result.data.Body.ResponseService);
        setSaveButton(false);
        successAlert();
        setEmpsListRender(rel => rel + 1);
      } else {
        alert(result.data.Body)
      }
    }
    setIsLoading(false);
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
        'Əməliyyat uğurla icra olundu!',
        ToastAndroid.CENTER,
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
        200,
        50
    )
}

  useEffect(() => { getEmp(id) }, [])

  return (
    employee === null ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
      </View>
      :
      <View style={{ flex: 1 }}>
        <List style={{ flex: 1 }}>
          <InputItem
            labelNumber={6}
            placeholder='əməkdaşın adı...'
            value={employee.Name}
            onChangeText={(e) => {
              setEmployee(rel => ({ ...rel, ['Name']: e }))
              if (!saveButton) {
                setSaveButton(true)
              }
            }}
          >
            Ad
          </InputItem>
          <InputItem
            labelNumber={6}
            value={employee.Phone}
            type='phone-pad'
            onChangeText={(e) => {
              setEmployee(rel => ({ ...rel, ['Phone']: e }))
              if (!saveButton) {
                setSaveButton(true)
              }
            }}
          >
            Telefon
          </InputItem>
          <InputItem
            labelNumber={6}
            value={String(employee.Barcode)}
            type='number'
            onChangeText={(e) => {
              setEmployee(rel => ({ ...rel, ['Barcode']: e }))
              if (!saveButton) {
                setSaveButton(true)
              }
            }}
          >
            Barkod
          </InputItem>
          <TouchableOpacity onPress={() => {
            setSalepointModal(true);
          }}>
            <InputItem
              labelNumber={6}
              editable={false}
              value={employee.SalePointName}
            >
              Satış nöqtəsi
            </InputItem>
          </TouchableOpacity>
          <InputItem
            labelNumber={6}
            value={String(employee.SalaryMonth)}
            editable={id === null}
            onChangeText={(e) => {
              setEmployee(rel => ({ ...rel, ['SalaryMonth']: e }))
              if (!saveButton) {
                setSaveButton(true)
              }
            }}
          >
            Aylıq əmək haqqı
          </InputItem>
           <List.Item extra={<Switch value={true} onValueChange={(e)=>{
            
           }}/>}>
            Activ
          </List.Item>
          <TouchableOpacity onPress={() => {
            setDepartmentModal(true)
          }}>
            <InputItem
              labelNumber={6}
              editable={false}
              value={employee.DepartmentName}
            >
              Cavabdeh
            </InputItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setOwnerModal(true);
          }}>
            <InputItem
              labelNumber={6}
              value={employee.OwnerName}
              editable={false}
            >
              Şöbə
            </InputItem>
          </TouchableOpacity>
        </List>

        {
          saveButton &&
          <View style={{ padding: 10 }}>
            <CustomSuccessButton isLoading={isLoading} onPress={getSaveProsessing} text={'Yadda Saxla'} width={'100%'} />
          </View>
        }

        <DepratmentModal modalVisible={departmentModal} setModalVisible={setDepartmentModal} nameType={'DepartmentName'} idType={'DepartmentId'} save={setSaveButton} state={setEmployee} />
        <OwnerModal modalVisible={ownerModal} setModalVisible={setOwnerModal} save={setSaveButton} idType={'OwnerId'} nameType={'OwnerName'} state={setEmployee} />
        <SalePointsModal modalVisible={salepointModal} setModalVisible={setSalepointModal} save={setSaveButton} state={setEmployee} nameType={'SalePointName'} idType={'SalePointId'} />
      </View>
  )
}

export default Employee

const styles = StyleSheet.create({})