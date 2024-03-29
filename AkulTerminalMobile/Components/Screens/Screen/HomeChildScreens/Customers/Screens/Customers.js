import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List } from '@ant-design/react-native'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import SearchBar from './../../../../../../Global/UI/SearchBar';
import { CustomersGlobalContext } from '../CustomersGlobalState'
import NewFab from './../../../../../../Global/Components/NewFab';
import DocumentList from '../../../../../../Global/UI/DocumentList'

const Customers = ({ navigation }) => {

  const { customersListRender } = useContext(CustomersGlobalContext);

  const [customers, setCustomers] = useState(null);
  const [search, setSearch] = useState("");

  const getCustomersData = async () => {
    const result = await Api('customers/get.php', {
      ar: 0,
      dr: 0,
      gp: "",
      lm: 100,
      pg: 0,
      sr: "GroupName",
      token: await AsyncStorage.getItem("token")
    })

    if (result.data.Body.List[0]) {
      setCustomers(result.data.Body.List);
    } else {
      setCustomers([]);
    }
  }

  const getCustomersSearchData = async () => {
    const result = await Api('customers/getfast.php', {
      fast: search,
      ar: 0,
      dr: 1,
      lm: 100,
      pg: 0,
      token: await AsyncStorage.getItem('token')
    })

    if (result.data.Body.List[0]) {
      setCustomers(result.data.Body.List);
    } else {
      setCustomers([]);
    }
  }


  useEffect(() => {

    let time;

    if (search == "") {
      getCustomersData();
    } else {
      time = setTimeout(() => {
        setCustomers(null);
        getCustomersSearchData();
      }, 400);
    }

    return () => clearTimeout(time);
  }, [search])

  useEffect(() => {
    if (customersListRender > 0) {
      getCustomersData();
    }
  }, [customersListRender])

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onChangeText={(e) => {
        setSearch(e)
      }} value={search} setVL={setSearch} />
        {
          customers !== null ?
            <FlatList data={customers} renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.listContainer} onPress={() => { navigation.navigate("customer", { id: item.id }) }}>
                <View style={styles.listFirs}>
                  <View style={styles.listFirsContainer}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarName}>{index + 1}</Text>
                    </View>
                  </View>
                  <View style={styles.listCenterContiner}>
                    <Text style={styles.name}>{item.Name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )} />
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors("dark").primary} />
            </View>
        }
      <NewFab press={() => {
        navigation.navigate('customer', {
          id: null,
        })
      }} />
    </View>
  )
}

export default Customers

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors("dark").greyV1,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 2
  },
  listFirs: {
    flexDirection: 'row',
    width: '80%',
  },
  listFirsContainer: {
    justifyContent: 'center',
    marginRight: 10
  },
  listCenterContiner: {
    justifyContent: 'center'
  },
  listEndContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  avatarName: {
    fontSize: 20,
    color: 'black',
  },
  name: {
    color: 'black',
    fontWeight: '600',
    fontSize:16,
  },
  barcode: {
    fontSize: 13,
  },
  customerName: {
    color: CustomColors("dark").connectedPrimary
  },
  price: {
    color: 'black',
  }
})