import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { List } from '@ant-design/react-native'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import SearchBar from './../../../../../../Global/UI/SearchBar';
import { CustomersGlobalContext } from '../CustomersGlobalState'
import NewFab from './../../../../../../Global/Components/NewFab';

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
      <ScrollView>
        {
          customers !== null ?
            <List>
              <FlatList data={customers} renderItem={({ item, index }) => (
                <List.Item onPress={() => {
                  navigation.navigate("customer", {
                    id: item.Id
                  })
                }} data-seed="logId">
                  {item.Name}
                </List.Item>
              )} />
            </List>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
        }
      </ScrollView>
      <NewFab press={() => {
        navigation.navigate('customer', {
          id: null,
        })
      }} />
    </View>
  )
}

export default Customers

const styles = StyleSheet.create({})