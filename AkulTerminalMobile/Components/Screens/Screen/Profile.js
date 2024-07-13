import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomColors from '../../../Global/Colors/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Api from '../../../Global/Components/Api';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Version from '../../../Version.js'
import CustomTextInput from '../../../Global/UI/CustomTextInput';
import { GlobalContext } from '../../../Global/Components/GlobalState';
import CustomPrimarySaveButton from '../../../Global/UI/CustomPrimarySaveButton';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import SettingPermission from './../../../Global/Components/SettingPermission';

let data = [
  [
    [
      "Göstəricilər",
      {
        id: 1,
        imageName: "dashboard"
      }
    ],
    [
      {
        name: "Əsas",
        navName: "dashboards",
      },
      {
        name: "Kalatoq",
        navName: "catalogsPage",
      },
    ],
  ],
  [
    [
      "Məhsullar",
      {
        id: 2,
        imageName: "inbox"
      }
    ],
    [
      {
        name: "Məhsullar",
        navName: "productsStack",
      },
      {
        name: "Yerdəyişmə",
        navName: 'move',
      },
      {
        name: "İnventarizasiya",
        navName: "inventsPage",
      },
      {
        name: "Anbar qalığı",
        navName: "stocksBalance",
      },
    ],
  ],
  [
    [
      "Alışlar",
      {
        id: 3,
        imageName: "download"
      }
    ],
    [
      {
        name: "Alış",
        navName: "supplysMain",
      },
      {
        name: "Alış iadəsi",
        navName: "supplysReturnsMain",
      }
    ],
  ],
  [
    [
      "Satışlar",
      {
        id: 4,
        imageName: "upload",
      }
    ],
    [
      {
        name: "Satış",
        navName: "demandsMain",
      },
      {
        name: "Satış iadəsi",
        navName: "demandReturns",
      },
      {
        name: "Sifariş",
        navName: "customerOrdersPage",
      }
    ],
  ],
  [
    [
      "Tərəf-Müqabil",
      {
        id: 5,
        imageName: "user",
      }
    ],
    [
      {
        name: "Tərəf-Müqabil",
        navName: "customers",
      },
      {
        name: "Əməkdaşlar",
        navName: "employees",
      },
    ],
  ],
  [
    [
      "Maliyyələr",
      {
        id: 5,
        imageName: "wallet",
      }
    ],
    [
      {
        name: "Ödənişlər",
        navName: "transactionsPage",
      },
      {
        name: "Borclar",
        navName: "debtPage",
      },
      {
        name: "Transfer",
        navName: "transfersPage",
      }
    ]
  ],
  [
    [
      "Pərakəndələr",
      {
        id: 6,
        imageName: "shoppingcart"
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
        imageName: "linechart"
      }
    ],
    [
      {
        name: "Mənfəət",
        navName: "salePPage",
      },
      {
        name: "Mənfəət və Zərər",
        navName: "profitPage",
      },
      {
        name: "Hesablar",
        navName: "accountsPage",
      }
    ]
  ],
  [
    [
      "İstehsalat",
      {
        id: 8,
        imageName: "fork"
      }
    ],
    [
      {
        name: "İstehsalat",
        navName: "productions",
      },
      {
        name: "İstehsala Sifariş",
        navName: "productionorders",
      },
    ],
  ]
];

const Profile = () => {

  const { listType, setListType, pageSetting, setPageSetting } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [saveButton, setSaveButton] = useState(false)
  const [measurement, setMeasurement] = useState(0);
  const [pageEditModal, setPageEditModal] = useState(false);
  const [listData, setListData] = useState(null);

  const [infoData, setInfoData] = useState(null);
  const [login, setLogin] = useState("");
  const [listSettingButton, setListSettingButton] = useState(false);
  const [settingPermission, setSettingPermission] = useState(false);

  const getEXIT = async () => {
    await AsyncStorage.removeItem('token');
    RNRestart.Restart();
  }

  const getProfileInfo = async () => {

    setSettingPermission(await SettingPermission());
    if (await AsyncStorage.getItem("login") !== null) {
      setLogin(await AsyncStorage.getItem("login"))
    }

    if (await AsyncStorage.getItem("lt") !== null) {
      setMeasurement(await AsyncStorage.getItem("lt"));
    } else {
      setMeasurement(2);
    }
    const result = await Api('company/get.php', {
      token: await AsyncStorage.getItem('token')
    })
    let obj = result.data.Body
    const resultCash = await Api('notifications/get.php', {
      token: await AsyncStorage.getItem('token')
    })
    obj.CashBalance = resultCash.data.Body.AccountBalance;
    setInfoData(obj);
  }

  const getListClick = async () => {
    if (listType == 1) {
      setListType(2);
      await AsyncStorage.setItem("lt", '2');
    } else {
      setListType(1);
      await AsyncStorage.setItem("lt", '1');
    }
  }

  const getListInput = async (e) => {
    setMeasurement(e);
    setSaveButton(true)
  }

  const getSave = async () => {
    if (measurement < 1) {
      alert("Bu sayda ölçü yoxdur!")
    } else {
      setListType(measurement);
      setSaveButton(false);
      await AsyncStorage.setItem("lt", measurement);
    }
  }

  const getClick = () => {
    if (listData == null) {
      let newData = [];
      for (let index = 0; index < data.length; index++) {
        newData.push({
          name: data[index][0][0],
          answer: pageSetting[index].answer
        })
      }
      setListData(newData);
    }

    setPageEditModal(true);

  }

  const getSaveListSetting = async () => {
    setIsLoading(true);
    let lData = [...listData];
    let answers = [...pageSetting];
    console.log(lData);
    console.log(answers);

    for (let index = 0; index < answers.length; index++) {
      answers[index].answer = false
    }
    for (let index = 0; index < lData.length; index++) {
      if (lData[index].answer) {
        answers[index].answer = lData[index].answer;
      }
    }
    await AsyncStorage.setItem("pS", JSON.stringify(answers));
    setPageSetting(answers);
    setIsLoading(false)
    setListSettingButton(false)
  }

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.container}>
            {
              infoData === null ?
                <View style={{ padding: 10 }}>
                  <ActivityIndicator color={CustomColors("dark").primary} size={30} />
                </View>
                :
                <View style={styles.containerr}>
                  <View style={styles.profileFirst}>
                    <View style={styles.profileAvatar}>
                      <FontAwesome6 size={25} color={'white'} name='user-large' />
                    </View>
                  </View>
                  <View style={styles.profileEnd}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{infoData.CompanyName}</Text>
                    <Text>{login}</Text>
                  </View>
                  <TouchableOpacity onPress={getEXIT} style={styles.profileExit}>
                    <Ionicons name='exit-outline' size={20} color={CustomColors("dark").danger} />
                  </TouchableOpacity>

                </View>
            }
            {
              infoData !== null &&
              <Text style={{ padding: 10 }}>Balans: {infoData.CashBalance}</Text>
            }
            <TouchableOpacity onPress={getListClick}>
              <CustomTextInput placeholder="..." text={'List tipi'} width={'100%'} value={listType > 1 ? 'Kart' : 'List'} addStyle={{ borderRadius: 5, borderWidth: 1, borderColor: CustomColors("dark").primary }} editable={false} />
            </TouchableOpacity>
            <View style={{ margin: 10 }} />
            {
              listType > 1 &&
              <CustomTextInput placeholder="..." text={'Sıra ölçüsü'} width={'100%'} value={String(measurement)} addStyle={{ borderRadius: 5, borderWidth: 1, borderColor: CustomColors("dark").primary }} onChangeText={getListInput} />
            }
            {
              saveButton &&
              <>
                <View style={{ margin: 20 }} />
                <CustomPrimarySaveButton text={'Yadda Saxla'} width={'100%'} onPress={getSave} />
              </>
            }

            {
              settingPermission &&
              <TouchableOpacity onPress={getClick}>
                <CustomTextInput placeholder="..." text={'Səhifələr'} width={'100%'} addStyle={{ borderRadius: 5, borderWidth: 1, borderColor: CustomColors("dark").primary, marginTop: 50 }} editable={false} />
              </TouchableOpacity>
            }

            {
              pageEditModal &&
                listData == null ?
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size={30} color={CustomColors("dark").primary} />
                </View>
                :
                <FlatList data={listData} renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {
                    let data = [...listData];
                    data[index].answer = !data[index].answer;
                    setListData(data);
                    if (!listSettingButton) {
                      setListSettingButton(true);
                    }
                  }}>
                    <CustomTextInput placeholder="..." text={'Səhifə'} value={item.name} width={'100%'} addStyle={[
                      { borderRadius: 5, borderWidth: 1, borderColor: CustomColors("dark").primary, marginTop: 20, height: 45 },
                      item.answer && { backgroundColor: "#dcdcdc" }
                    ]} editable={false} />
                  </TouchableOpacity>
                )} />
            }

            {
              listSettingButton &&
              <>
                <View style={{ margin: 20 }} />
                <CustomPrimarySaveButton text={'Yadda Saxla'} width={'100%'} onPress={getSaveListSetting} />
              </>
            }



          </View>

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <Text style={{ fontSize: 20, color: CustomColors("dark").primary, marginBottom: 10 }}>{Version}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    marginTop: 10,
    padding: 10,
  },
  containerr: {
    padding: 10,
    flexDirection: 'row'
  },
  profileAvatar: {
    width: 50,
    height: 50,
    backgroundColor: CustomColors("dark").primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  profileFirst: {
    width: '13%'
  },
  profileEnd: {
    width: '80%',
    justifyContent: 'center',
    marginLeft: 10
  },
  profileExit: {
    width: '7%',
    justifyContent: 'center'
  }
})