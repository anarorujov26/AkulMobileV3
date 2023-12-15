import { ActivityIndicator, FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackGround from '../../../Images/background.png'
import HomeCard from './../../../Global/UI/HomeCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomColors from '../../../Global/Colors/CustomColors';
import { useContext } from 'react';
import { GlobalContext } from '../../../Global/Components/GlobalState';
import Ionicons from 'react-native-vector-icons/Ionicons';

let data = [
  [
    [
      "Göstəricilər",
      {
        id: 1,
        imageName: "price"
      }
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
      "Məhsullar",
      {
        id: 2,
        imageName: "product"
      }
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
      {
        id: 3,
        imageName: "supply"
      }
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
      {
        id: 4,
        imageName: "demand"
      }
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
      "Maliyyə",
      {
        id: 5,
        imageName: "financial",
      }
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
      "Pərakəndə",
      {
        id: 6,
        imageName: "rotation"
      }
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
      "Hesabatlar",
      {
        id: 7,
        imageName: "accounts"
      }
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
      {
        name: "Hesablar",
        navName: "accountsPage"
      }
    ]
  ]
];

const HomePage = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(null);

  const { pageSetting } = useContext(GlobalContext);

  const [list, setList] = useState(null);

  useEffect(() => {
    let pD = [...pageSetting];
    let newData = [];
    for (let index = 0; index < data.length; index++) {
      if (pD[index].answer) {
        newData.push(data[index]);
      }
    }
    setList(newData);
  }, [pageSetting])

  return (
    <ImageBackground source={BackGround} style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate("profile") }} style={styles.profile}>
        <Ionicons size={25} color={CustomColors.primaryV2} name='settings-sharp' />
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image source={require('../../../Images/akul.png')} style={{ width: 80, height: 80, borderRadius: 10 }} />
        <Text style={{ marginTop: 0, color: CustomColors.primaryV2, fontSize: 20, fontWeight: 'bold'}}>Akul Mobile</Text>
      </View>
      {
        list == null ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color={CustomColors.primary} />
          </View>
          :
          !list[0] ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name='switcher' color={CustomColors.primaryV2} size={60}/>
              <Text style={{fontSize:20,color:CustomColors.primaryV2,fontWeight:'bold',marginTop:10}}>Səhifə yoxdur!</Text>
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {
                list[0] &&
                <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center" }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    setIndex(0);
                    setModalVisible(true);
                  }}>
                    <HomeCard image={list[0][0][1].imageName} w={170} bottom={list[0][0][0]} />
                  </TouchableOpacity>

                  {
                    list[1] && <>
                      <View style={{ margin: 10 }} />
                      <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        setIndex(1);
                        // setIndex(Number(list[1][0][1].id) - 1);
                        setModalVisible(true);
                      }}>
                        <HomeCard image={list[1][0][1].imageName} w={170} bottom={list[1][0][0]} />
                      </TouchableOpacity></>
                  }
                </View>
              }
              {
                list[2] &&
                <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center", marginTop: 10 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    setIndex(2);
                    setModalVisible(true);
                  }}>
                    <HomeCard image={list[2][0][1].imageName} w={170} bottom={list[2][0][0]} />
                  </TouchableOpacity>

                  {
                    list[3] &&
                    <>

                      <View style={{ margin: 10 }} />
                      <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        setIndex(3);
                        setModalVisible(true);
                      }}>
                        <HomeCard image={list[3][0][1].imageName} w={170} bottom={list[3][0][0]} />
                      </TouchableOpacity>
                    </>
                  }
                </View>
              }
              {
                list[4] &&
                <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center", marginTop: 10 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    setIndex(4);
                    setModalVisible(true);
                  }}>
                    <HomeCard image={list[4][0][1].imageName} w={170} bottom={list[4][0][0]} />
                  </TouchableOpacity>

                  {
                    list[5] &&
                    <>

                      <View style={{ margin: 10 }} />
                      <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        setIndex(5);
                        setModalVisible(true);
                      }}>
                        <HomeCard image={list[5][0][1].imageName} w={170} bottom={list[5][0][0]} />
                      </TouchableOpacity>
                    </>
                  }
                </View>
              }
              {
                list[6] &&
                <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: "center", marginTop: 10 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    setIndex(6);
                    setModalVisible(true);
                  }}>
                    <HomeCard image={list[6][0][1].imageName} w={170} bottom={list[6][0][0]} />
                  </TouchableOpacity>

                  <View style={{ margin: 10 }} />
                  <TouchableOpacity activeOpacity={0.8} style={{ width: 170 }}>
                  </TouchableOpacity>
                </View>
              }
            </View>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setIndex(null)
        }}>
        <TouchableOpacity activeOpacity={1} onPress={()=>{setModalVisible(false),setIndex(null)}} style={styles.centeredView}>
          <TouchableOpacity disabled={true} style={styles.modalView}>
            <View style={styles.center}>
              {
                index !== null ?
                  <>
                    <View style={styles.header}>
                      <Text style={{ fontSize: 22, color: "white", textAlign: 'center' }}>{list[index][0][0]}</Text>
                    </View>
                    <FlatList data={list[index][1]} renderItem={({ item, index }) => (
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
          </TouchableOpacity>
        </TouchableOpacity>
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