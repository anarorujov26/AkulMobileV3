import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Invents from './Screens/Invents';
import Invent from './Screens/Invent';
import InventAddProducts from '../../../../../Global/Components/InventAddProducts';
import DocumentInventEditModal from './../../../../../Global/Components/Modals/DocumentInventEditModal';
import InventScanner from './Screens/InventScanner';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { TouchableOpacity } from 'react-native';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { InventGlobalContext } from './InventGlobalState';
import { useState } from 'react';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentInventNewModal from '../../../../../Global/Components/Modals/DocumentInventNewModal';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';
import MoreCohices from '../../../../../Global/Components/Modals/MoreCohices';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';
import Entypo from 'react-native-vector-icons/Entypo';


const Stack = createNativeStackNavigator();

const InventStack = () => {

  const { invent, setInvent, setInventListRender, setSaveButton } = useContext(InventGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const [modalAnswer, setModalAnswer] = useState(false)
  const [tmps, setTmps] = useState([]);
  const [tmpModal, setTmpModal] = useState(false);

  let navigation = useNavigation();

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const getPrintTMP = async (tId) => {
    // let obj = {
    //     Id: demand.Id,
    //     TemplateId: tId,
    //     token: await AsyncStorage.getItem("token")
    // }
    //  (obj);
    // const result = await axios.post('https://api.akul.az/1.0/dev/controllers/demands/print.php', obj);
    // navigation.navigate("share", {
    //     html: result.data,
    //     id: demand.Id
    // })
  }

  const getShare = async () => {
    // let data = await getTemplates('demands');
    //  (data);
    // if (data[0]) {
    // setTmps(data);
    // }
    // setTmpModal(true);
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    await Api(`inventories/del.php?id=${invent.Id}`, { token: await AsyncStorage.getItem("token") });
    setInventListRender(rel => rel + 1);
    navigation.navigate('invents');
    setInvent(null)
    setSaveButton(false)
  }

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: CustomColors.greyV2

      }}>
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='invents' component={Invents} />
        <Stack.Screen options={{
          title: "İnventarizasiya",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setModalAnswer(true)
              }}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='format-list-bulleted' size={25} color={CustomColors.primary} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={getShare}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <Entypo name='share' size={25} color={CustomColors.primary} />
            </TouchableOpacity>
          )
        }} name='invent' component={Invent} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='inventScanner' component={InventScanner} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='documentEditModal' component={DocumentInventEditModal} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='documentNewModal' component={DocumentInventNewModal} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='inventAddProducts' component={InventAddProducts} />
        <Stack.Screen options={{ title: "Qiymet növü" }} name='priceTypes' component={AddPsPriceTypes} />
      </Stack.Navigator>
      <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
      <MoreCohices modalVisible={modalAnswer} setModalVisible={setModalAnswer}>
        <CustomDangerButton text={'Sil'} width={'100%'} onPress={getDeleteDocument} />
      </MoreCohices>
      {
        tmps[0] &&
        <TmpModal modalVisible={tmpModal} setModalVisible={setTmpModal}>
          <FlatList data={tmps} renderItem={({ item, index }) => (
            <TouchableOpacity style={{ width: 200, justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }} onPress={() => {
              setTmpModal(false);
              getPrintTMP(item.Id);
            }}>
              <Text style={{ color: '#0264b1', fontSize: 20 }}>{item.Name}</Text>
            </TouchableOpacity>
          )} />
        </TmpModal>
      }
    </>
  )
}

export default InventStack

const styles = StyleSheet.create({})