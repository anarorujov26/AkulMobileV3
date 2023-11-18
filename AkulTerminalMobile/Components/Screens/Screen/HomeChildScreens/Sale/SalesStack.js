import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import Product from '../Products/Product';
import DocumentNewModal from '../../../../../Global/Components/Modals/DocumentNewModal';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Sales from './Screens/Sales';
import Sale from './Screens/Sale';
import { SalesGlobalContext } from './SalesGlobalState';

const Stack = createNativeStackNavigator();

const SalesStack = () => {

    let navigation = useNavigation();

    const { sale, setSale, setSaleListRender, setSaveButton } = useContext(SalesGlobalContext);
    const [deleteModal, setDeleteModal] = useState(false);

    const getDeleteDocument = async () => {
        setDeleteModal(true)
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        // await Api(`demands/del.php?id=${demand.Id}`, { token: await AsyncStorage.getItem('token') });
        setSaleListRender(rel => rel + 1);
        navigation.navigate('demands');
        setSale(null);
        setSaveButton(false)
    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: CustomColors.connectedPrimary
            }}>
                <Stack.Screen options={{
                    title: "Pərakəndə Satışlar"
                }} name='sales' component={Sales} />
                <Stack.Screen options={{
                    title: "Pərakəndə Satışlar",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={getDeleteDocument}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialIcons name='delete-outline' size={25} color={'red'} />
                        </TouchableOpacity>
                    )
                }} name='sale' component={Sale} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
        </>
    )
}

export default SalesStack

const styles = StyleSheet.create({})