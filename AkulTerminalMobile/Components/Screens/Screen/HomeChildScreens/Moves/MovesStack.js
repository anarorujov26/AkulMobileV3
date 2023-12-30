import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MovesGlobalContext } from './MovesGlobalState';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import Product from '../Products/Product';
import DocumentNewModal from '../../../../../Global/Components/Modals/DocumentNewModal';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import Moves from './Screens/Moves';
import Move from './Screens/Move';
import CustomColors from '../../../../../Global/Colors/CustomColors';

const Stack = createNativeStackNavigator();

const MovesStack = () => {

    let navigation = useNavigation();

    const { move, setMove, setMoveListRender, setSaveButton } = useContext(MovesGlobalContext);
    const [deleteModal, setDeleteModal] = useState(false);

    const getDeleteDocument = async () => {
        setDeleteModal(true)
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        // await Api(`demands/del.php?id=${demand.Id}`, { token: await AsyncStorage.getItem('token') });
        setMoveListRender(rel => rel + 1);
        navigation.navigate('demands');
        setMove(null);
        setSaveButton(false)
    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: CustomColors.greyV2
            }}>
                <Stack.Screen options={{
                    title: "Yerdəyişmə"
                }} name='demands' component={Moves} />
                <Stack.Screen options={{
                    title: "Yerdəyişmə",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={getDeleteDocument}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialIcons name='delete-outline' size={25} color={CustomColors.danger} />
                        </TouchableOpacity>
                    )
                }} name='demand' component={Move} />
                <Stack.Screen options={{
                    title: "Yerdəyişmə"
                }} name='documentEditModal' component={DocumentEditModal} />
                <Stack.Screen options={{
                    title: "Yerdəyişmə"
                }} name='scanner' component={ProductsScanner} />
                <Stack.Screen options={{
                    title: "Yerdəyişmə"
                }} name='addPS' component={AddProducts} />
                <Stack.Screen options={{
                    title: "Məhsul"
                }} name='productsCreate' component={Product} />
                <Stack.Screen options={{
                    title: "Yerdəyişmə"
                }} name='documentNewModal' component={DocumentNewModal} />
                <Stack.Screen options={{ title: "Qiymet növü" }} name='priceTypes' component={AddPsPriceTypes} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
        </>
    )
}

export default MovesStack

const styles = StyleSheet.create({})