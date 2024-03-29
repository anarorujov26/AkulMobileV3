import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../Colors/CustomColors'
import DocumentStockBalanceControl from '../DocumentStockBalanceControl'
import { FlatList } from 'react-native'

const StockModal = ({ modalVisible, setModalVisible, idType, nameType, state, save, data, dontControl }) => {

  const [group, setGroup] = useState([]);

  const getGroups = async () => {
    const result = await Api('stocks/get.php', { pg: 0, lm: 1000000, token: await AsyncStorage.getItem('token') })
    setGroup(result.data.Body.List)
  }

  const getStock = async (item) => {
    console.log(data);
    let datas = data;
    datas[idType] = item.Id,
    datas[nameType] = item.Name;
    if (!dontControl) {
      datas = await DocumentStockBalanceControl(datas)
    }
    setModalVisible(false);
    save(true);
    state(datas);
  }

  useEffect(() => {
    getGroups();
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ width: '100%', height: '100%' }}>
            <ScrollView style={{ width: '100%' }}>
              <FlatList data={group} renderItem={({ item, index }) => (
                <TouchableOpacity key={item.Id} style={styles.listContainer} onPress={() => {
                  getStock(item)
                }}>
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
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default StockModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 10,
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
    height: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors("dark").connectedPrimary,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5
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
  avatarName: {
    fontSize: 20,
    color: 'white',
  },
  name: {
    color: 'black'
  },
})