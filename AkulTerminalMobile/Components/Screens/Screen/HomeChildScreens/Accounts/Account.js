import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import { FlatList } from 'react-native';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = ({ route }) => {

  const { id } = route.params;
  const [sale, setSale] = useState([]);

  const getInfo = async () => {
    let ob = {
      cashid: id,
      pg: 0,
      dr: 1,
      lm: 100,
      sr: "Moment",
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api('transactions/get.php', ob);

    if (result.data.Headers.ResponseStatus !== "0") {
      alert(result.data.Body)
    } else {
      if(result.data.Body.List[0]){
        setSale(result.data.Body.List);
      }else{
        setSale(null)
      }
    }
  }

  useEffect(() => {
    getInfo();
  }, [])
  return (
    <View style={{ flex: 1 }}>
      {
        sale == null ? 
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{
            backgroundColor:"red",
            color:"white",
            padding:10,
            fontSize:20,
            fontWeight:"bold",
            width:'100%',
            textAlign:'center'
          }}>List boşdur!</Text>
        </View>
        :
        sale[0] ?
          <FlatList data={sale} renderItem={({ item, index }) => (

            <View style={styles.listContainer}>
              <View style={styles.listFirs}>
                <View style={styles.listFirsContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarName}>{index + 1}</Text>
                  </View>
                </View>
                <View style={styles.listCenterContiner}>
                    <Text style={styles.name}>{item.TypeName}</Text>
                  <Text >{item.Moment}</Text>
                  <Text style={{color:CustomColors("dark").primary}} >{item.CustomerName}</Text>
                </View>
              </View>
              <View style={styles.listEndContainer}>
                <Text style={styles.price}>{ConvertFixedTable(item.Amount)}₼</Text>
              </View>
            </View>

          )} />
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
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
    fontWeight: '600'
  },
  barcode: {
    fontSize: 13,
  },
  customerName: {
    color: CustomColors("dark").connectedPrimary
  },
  price: {
    color: 'black',
  },
  listItem: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20
  },
  straight: {
    width: '90%',
    height: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    color: 'black',
  },
  center: {
    backgroundColor: 'white'
  },
  header: {
    height: 70, width: '100%',
    backgroundColor: CustomColors("dark").primary,
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
  },
})


export default Account
