import { ActivityIndicator, FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackGround from '../../../Images/background.png'
import HomeCard from './../../../Global/UI/HomeCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomColors from '../../../Global/Colors/CustomColors';

let data = [
  [
    [
      "Məhsullar",
    ],
    [
      {
        name: "Məhsullar",
        navName: "productsStack",
      },
      {
        name: "Yerdəyişmə",
        navName: 'move'
      },
      {
        name: "İnventarizasiya",
        navName: "inventsPage"
      },
    ],
  ],
  [
    [
      "Alış",
    ],
    [
      {
        name: "Alış",
        navName: "supplysMain",
      },
      {
        name: "Alış iadəsi",
        navName: "supplysReturnsMain"
      }
    ],
  ],
  [
    [
      "Satış",
    ],
    [
      {
        name: "Satış",
        navName: "demandsMain",
      },
      {
        name: "Satış iadəsi",
        navName: "demandReturns"
      },
      {
        name: "Sifariş",
        navName: "customerOrdersPage"
      }
    ],
  ],
  [
    [
      "Göstəricilər",
    ],
    [
      {
        name: "Kalatoq",
        navName: "catalogsPage",
      }
    ],
  ],
  [
    [
      "Maliyyə",
    ],
    [
      {
        name: "Ödənişlər",
        navName: "transactionsPage"
      },
      {
        name: "Borclar",
        navName: "debtPage"
      }
    ]
  ],
  [
    [
      "Pərakəndə"
    ],
    [
      {
        name: "Növbələr",
        navName: "shiftsPage",
      },
      {
        name: "Satışlar",
        navName: "salePage",
      },
    ]
  ],
  [
    [
      "Hesabatlar"
    ],
    [
      {
        name: "Mənfəət",
        navName: "salePPage",
      },
      {
        name: "Mənfəət və Zərər",
        navName: "profitPage"
      },
      // {
      //   name: "Gündəlik hesabatlar",
      //   navName: ""
      // },
      // {
      //   name: "Təchizatçı hesabatı",
      //   navName: ""
      // },
      {
        name:"Hesablar",
        navName:"accountsPage"
      }
    ]
  ]
];

const HomePage = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(null);

  return (
    <ImageBackground source={BackGround} style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate("profile") }} style={styles.profile}>
        <AntDesign size={25} color={'white'} name='setting' />
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image source={require('../../../Images/akul.png')} style={{ width: 80, height: 80, borderRadius: 10 }} />
        <Text style={{ marginTop: 10, color: 'white', fontSize: 20, fontWeight: 'bold', textShadowOffset: { width: 0, height: 0 }, textShadowColor: "black", textShadowRadius: 10, padding: 2 }}>Akul Mobile</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(3)
            setModalVisible(true);
          }}>
            <HomeCard image={'price'} w={170} bottom={'Göstəricilər'} />
          </TouchableOpacity>
          <View style={{ margin: 10 }} />

          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(0);
            setModalVisible(true);
          }}>
            <HomeCard image={'product'} w={170} bottom={'Məhsullar'} />
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center", marginTop: 10 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(1);
            setModalVisible(true);
          }}>
            <HomeCard image={'supply'} w={170} bottom={'Alışlar'} />
          </TouchableOpacity>

          <View style={{ margin: 10 }} />
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(2)
            setModalVisible(true);
          }}>
            <HomeCard image={'demand'} w={170} bottom={'Satışlar'} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center", marginTop: 10 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(4);
            setModalVisible(true);
          }}>
            <HomeCard image={'financial'} w={170} bottom={'Maliyyə'} />
          </TouchableOpacity>

          <View style={{ margin: 10 }} />
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(5)
            setModalVisible(true);
          }}>
            <HomeCard image={'rotation'} w={170} bottom={'Pərakəndə'} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center", marginTop: 10 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            setIndex(6)
            setModalVisible(true);
          }}>
            <HomeCard image={'accounts'} w={170} bottom={'Hesabatlar'} />
          </TouchableOpacity>

          <View style={{ margin: 10 }} />
          <TouchableOpacity activeOpacity={0.8} style={{ width: 170 }}>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setIndex(null)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.center}>
              {
                index !== null ?
                  <>
                    <View style={styles.header}>
                      <Text style={{ fontSize: 22, color: "white", textAlign: 'center' }}>{data[index][0]}</Text>
                    </View>
                    <FlatList data={data[index][1]} renderItem={({ item, index }) => (
                      <>
                        <TouchableOpacity onPress={() => {
                          navigation.navigate(item.navName);
                          setModalVisible(false);
                        }} style={styles.listItem}>
                          <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                          <View style={styles.straight} />
                        </View>
                      </>
                    )} />
                  </>
                  :
                  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <ActivityIndicator size={50} color={CustomColors.primary} />
                  </View>
              }
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profile: {
    position: 'absolute', width: '100%', right: 10, top: 10, zIndex: 1,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  header: {
    height: 50, width: '100%',
    backgroundColor: CustomColors.primary,
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
  },
  center: {
    backgroundColor: 'white'
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
  }
})