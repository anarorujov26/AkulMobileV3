import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Global/Components/Api';
import SearchBar from '../../Global/UI/SearchBar';

const Employee = ({ route, navigation }) => {

  const { component } = route.params;

  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState([]);
  const [employeeOld, setEmployeeOld] = useState([]);

  const getEmployeeData = async () => {
    const result = await Api('employees/get.php', {
      token: await AsyncStorage.getItem("token"),
    })
    if (result.data.Body.List[0]) {
      setEmployee(result.data.Body.List);
      setEmployeeOld(result.data.Body.List);
    } else {
      alert("List boşdur!")
    }
  }

  const emp_search = () => {
    let newArr = employeeOld.filter(i => i.Name.toLowerCase().includes(search.toLowerCase()));
    setEmployee(newArr);
  }

  const getEmployee = async (element) => {
    await AsyncStorage.setItem("emp", JSON.stringify({ empName: element.Name, empId: element.Id }))
    navigation.goBack();
    successAlert();
    component();
  }

  const deleteEmployee = async () => {
    await AsyncStorage.removeItem("emp");
    navigation.goBack();
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'İstifadəçi seçildi!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }


  useEffect(() => {
    getEmployeeData();
  }, [])

  useEffect(() => {
    let timer;

    if (search == "") {
      getEmployeeData();
    } else {
      timer = setTimeout(() => {
        emp_search();
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [search])

  return (
    <View style={{ flex: 1 }}>
      <SearchBar vl={search} onChangeText={(e) => {
        setSearch(e);
      }} setVL={setSearch} width={'100%'} text={'Axtarış'} />
      <View style={{ marginTop: 2 }} />

      <ScrollView>
        <TouchableOpacity style={styles.listContainer} onPress={() => { deleteEmployee() }}>
          <View style={styles.flexStart}>
            <View style={styles.flexStart_flexEnd}>
              <Text style={styles.orderCustomer}>{"Heçbiri"}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {
          employee.map((element, index) => {
            return (
              <>
                <View style={{ marginTop: 2 }} />

                <TouchableOpacity style={styles.listContainer} onPress={() => { getEmployee(element) }}>
                  <View style={styles.flexStart}>
                    <View style={styles.flexStart_flexStart}>
                      <Text style={styles.orderCount}>{index + 1}</Text>
                    </View>
                    <View style={styles.flexStart_flexEnd}>
                      <Text style={styles.orderCustomer}>{element.Name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          })
        }
      </ScrollView>
    </View>
  )
}

export default Employee

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  flexStart: {
    flexDirection: 'row',
  },
  flexStart_flexStart: {
    justifyContent: 'center',
  },
  flexStart_flexEnd: {
    justifyContent: 'center',
    marginLeft: 10
  },
  flexEnd: {
    justifyContent: 'center'
  },
  orderCount: {
    color: 'black'
  },
  orderCustomer: {
    color: "black",
    fontSize: 16,
  },
  orderPrice: {
    color: 'black',
    textAlign: 'right',
    fontSize: 13
  },
})