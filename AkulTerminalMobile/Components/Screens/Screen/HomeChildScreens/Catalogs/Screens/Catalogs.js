import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CatalogsGlobalContext } from './../CatalogsGlobalState';
import CustomPrimaryButton from './../../../../../../Global/UI/CustomPrimaryButton';
import NewFab from './../../../../../../Global/Components/NewFab';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import Api from './../../../../../../Global/Components/Api';
import { ConvertFixedTable } from './../../../../../../Global/Components/ConvertFixedTable';
import DocumentList from './../../../../../../Global/UI/DocumentList';
import { FlatList } from 'react-native';

const Catalogs = ({ navigation }) => {

  const { catalogListRender } = useContext(CatalogsGlobalContext);
  const [catalogs, setCatalogs] = useState([]);
  const [search, setSearch] = useState("");

  const getCatalogs = async () => {
    let obj = {
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api("catalogs/get.php", obj);
    if (result.data.Headers.ResponseStatus !== "0") {
      navigation.goBack();
    }
    if (result.data.Body.List[0]) {
      setCatalogs(result.data.Body.List);
    } else {
      setCatalogs(null);
    }
  }

  useEffect(() => {
    getCatalogs();
  }, [])

  useEffect(() => {
    if (catalogListRender > 0) {
      getCatalogs();
    }
  }, [catalogListRender])

  return (

    <View style={{ flex: 1, alignItems: 'center' }}>
        {
          catalogs == null ?
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getCatalogs} />
            </View>
            :
            !catalogs[0] ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors("dark").primary} />
              </View>
              :
              <FlatList data={catalogs} renderItem={({ item, index }) => (
                <DocumentList key={item.Id} index={index} customername={item.DepartmentName} moment={item.Moment} name={item.Name} navigation={navigation} location={'catalog'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
              )} />
        }
      <NewFab press={() => {
        navigation.navigate('catalog', { id: null })
      }} />
    </View>
  )
}

export default Catalogs

const styles = StyleSheet.create({})