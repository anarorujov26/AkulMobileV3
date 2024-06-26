import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Employees from './Screens/Employees';
import Employee from './Screens/Employee';
import { EmployeesGlobalContext } from './EmployeesGlobalState';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const EmployeesStack = () => {

    let navigation = useNavigation();
    const [deleteModal, setDeleteModal] = useState(false);
    const { employee, setEmployee, setEmpsListRender, setSaveButton } = useContext(EmployeesGlobalContext);

    const getDeleteDocument = async () => {
        setDeleteModal(true)
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        const result = await Api(`employees/del.php?id=${employee.Id}`, { token: await AsyncStorage.getItem('token') });
        if (result.data.Headers.ResponseStatus == '0') {
            setEmpsListRender(rel => rel + 1);
            navigation.navigate('emps');
            setEmployee(null);
            setSaveButton(false)
        } else {
            alert(result.data.Body)
        }

    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: CustomColors("dark").greyV2
            }}>
                <Stack.Screen options={{
                    title: "Əməkdaşlar"
                }} name='emps' component={Employees} />
                <Stack.Screen options={{
                    title: "Əməkdaş",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={getDeleteDocument}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialIcons name='delete' size={25} color={CustomColors("dark").danger} />
                        </TouchableOpacity>
                    ),
                }} name='emp' component={Employee} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
        </>
    )
}

export default EmployeesStack

const styles = StyleSheet.create({})
