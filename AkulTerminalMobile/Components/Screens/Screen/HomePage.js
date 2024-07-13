import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomColors from '../../../Global/Colors/CustomColors';
import { useContext } from 'react';
import { GlobalContext } from '../../../Global/Components/GlobalState';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
        image: require('../../../Images/Pages/dashboards.png')
      },
      {
        name: "Kalatoq",
        navName: "catalogsPage",
        image: require('../../../Images/Pages/catalog.png')
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
        image: require('../../../Images/Pages/products.png')
      },
      {
        name: "Yerdəyişmə",
        navName: 'move',
        image: require('../../../Images/Pages/move.png')
      },
      {
        name: "İnventarizasiya",
        navName: "inventsPage",
        image: require('../../../Images/Pages/inventory.png')
      },
      {
        name: "Anbar qalığı",
        navName: "stocksBalance",
        image: require('../../../Images/Pages/stocksbalance.png')
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
        image: require('../../../Images/Pages/supply.png')
      },
      {
        name: "Alış iadəsi",
        navName: "supplysReturnsMain",
        image: require('../../../Images/Pages/supplyreturns.png')
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
        image: require('../../../Images/Pages/demand.png')
      },
      {
        name: "Satış iadəsi",
        navName: "demandReturns",
        image: require('../../../Images/Pages/demandreturns.png')
      },
      {
        name: "Sifariş",
        navName: "customerOrdersPage",
        image: require('../../../Images/Pages/demandorder.png')
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
        image: require('../../../Images/Pages/customers.png')
      },
      {
        name: "Əməkdaşlar",
        navName: "employees",
        image: require('../../../Images/Pages/employee.png')
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
        image: require('../../../Images/Pages/payments.png')
      },
      {
        name: "Borclar",
        navName: "debtPage",
        image: require('../../../Images/Pages/settlements.png')
      },
      {
        name: "Transferlər",
        navName: "transfersPage",
        image: require('../../../Images/Pages/transfer.png')
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
        image: require('../../../Images/Pages/shifts.png')
      },
      {
        name: "Satışlar",
        navName: "salePage",
        image: require('../../../Images/Pages/sale.png')
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
        image: require('../../../Images/Pages/profit.png')
      },
      {
        name: "Mənfəət və Zərər",
        navName: "profitPage",
        image: require('../../../Images/Pages/profit2.png')
      },
      {
        name: "Hesablar",
        navName: "accountsPage",
        image: require('../../../Images/Pages/wallet.png')
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
        image: require('../../../Images/Pages/productions.png')
      },
      {
        name: "İstehsala Sifariş",
        navName: "productionorders",
        image: require('../../../Images/Pages/demandorder.png')
      },
    ],
  ]
];

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {state.routes.map((route, index) => {
          let indexIcon = () => {
            let icon;
            data.forEach((element, index) => {
              if (element[0][0] === route.name) {
                icon = element[0][1].imageName;
              } 
            });

            return icon;
          }
          let icon = indexIcon();
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <AntDesign name={icon} size={25} color={isFocused ? CustomColors("dark").primaryV3 : 'black'} />
              <View style={{ margin: 1 }} />
              <Text style={[!isFocused ? styles.tabButtonTextActive : styles.tabButtonText]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const GetModal = ({ route }) => {
  const {
    list,
    setList,
    navigation,
    index
  } = route.params

  return (
    <View activeOpacity={1} style={styles.centeredView}>
      <TouchableOpacity disabled={true} style={styles.modalView}>
        <View style={styles.center}>
          {
            index !== null ?
              <>
                <View style={styles.header}>
                  <Text style={{ fontSize: 20, color: '#bcbcbc', textAlign: 'center' }}>{list[index][0][0]}</Text>
                </View>
                <FlatList data={list[index][1]} renderItem={({ item, index }) => (
                  <>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate(item.navName);
                    }} style={styles.listItem}>
                      <View style={styles.listItemFirst}>
                        <View style={styles.listItemAvatar}>
                          <Image source={item.image} style={{ width: 20, height: 20 }} />
                        </View>
                      </View>
                      <View style={styles.listItemEnd}>
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                      <View style={styles.straight} />
                    </View>
                  </>
                )} />
              </>
              :
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <ActivityIndicator size={50} color={CustomColors("dark").primaryV3} />
              </View>
          }
        </View>
      </TouchableOpacity>
    </View>
  )

}

const Tab = createMaterialTopTabNavigator();

const HomePage = ({ navigation }) => {
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
    <>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image source={require('../../../Images/akul.png')} style={{ width: 150, height: 150, borderRadius: 10 }} />
      </View>
      {
        list !== null &&
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} tabBarPosition='bottom'>
          {
            list.map((element, index) => (
              <Tab.Screen name={element[0][0]} initialParams={{
                list,
                setList,
                navigation,
                index,

              }} component={GetModal} />
            ))
          }
        </Tab.Navigator>
      }
    </>
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
    width: '100%'
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    borderBottomWidth: 1,
    borderColor: '#eaecef',
    height: 40, width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  center: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  listItem: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  listItemFirst: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItemAvatar: {
    backgroundColor: "#eaecef",
    borderRadius: 10,
    padding: 10,
  },
  listItemEnd: {
    width: '80%',
    justifyContent: 'center'
  },
  straight: {
    width: '90%',
    height: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  tabButton: {
    height: 70,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabButtonText: {
    backgroundColor: CustomColors("dark").primaryV3,
    color: "white",
    borderRadius: 10,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  tabButtonTextActive: {
    backgroundColor: '#eaecef',
    color: "black",
    borderRadius: 10,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
})