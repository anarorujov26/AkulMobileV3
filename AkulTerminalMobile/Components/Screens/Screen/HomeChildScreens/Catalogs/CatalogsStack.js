import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { CatalogsGlobalContext } from './CatalogsGlobalState';
import DocumentEditModal from './../../../../../Global/Components/Modals/DocumentEditModal';
import DocumentNewModal from './../../../../../Global/Components/Modals/DocumentNewModal';
import ProductsScanner from './../../../../../Global/UI/ProductsScanner';
import AddProducts from './../../../../../Global/Components/AddProducts';
import Product from './../Products/Product';
import Catalog from './Screens/Catalog';
import Catalogs from './Screens/Catalogs';
import AnswerModal from './../../../../../Global/Components/Modals/AnswerModal';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AddPsPriceTypes from './../../../../../Global/Components/AddPsPriceTypes';
import Entypo from 'react-native-vector-icons/Entypo';
import MoreCohices from '../../../../../Global/Components/Modals/MoreCohices';
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';

const Stack = createNativeStackNavigator();

const CatalogsStack = () => {

  const navigation = useNavigation();

  const [modalAnswer, setModalAnswer] = useState(false)
  const [tmps, setTmps] = useState([]);
  const [tmpModal, setTmpModal] = useState(false);

  const { catalog, setCatalog, setCatalogListRender, setSaveButton } = useContext(CatalogsGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    // await Api(`supplies/del.php?id=${supply.Id}`, { token: await AsyncStorage.getItem('token') });
    setCatalogListRender(rel => rel + 1);
    setCatalog(null)
    setSaveButton(false)
    navigation.navigate('supplys');
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

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTintColor: CustomColors("dark").greyV2

      }}>
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='catalogs' component={Catalogs} />
        <Stack.Screen options={{
          title: "Kataloq",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setModalAnswer(true)
              }}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='format-list-bulleted' size={25} color={CustomColors("dark").primary} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={getShare}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <Entypo name='share' size={25} color={CustomColors("dark").primary} />
            </TouchableOpacity>
          )
        }} name='catalog' component={Catalog} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='documentEditModal' component={DocumentEditModal} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='documentNewModal' component={DocumentNewModal} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='scanner' component={ProductsScanner} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='addPS' component={AddProducts} />
        <Stack.Screen name='productsCreate' component={Product} options={{
          title: "Məhsul"
        }} />
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

export default CatalogsStack

const styles = StyleSheet.create({})