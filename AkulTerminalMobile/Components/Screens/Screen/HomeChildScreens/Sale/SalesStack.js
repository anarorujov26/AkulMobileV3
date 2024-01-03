import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Sales from './Screens/Sales';
import { SalesGlobalContext } from './SalesGlobalState';
import Entypo from 'react-native-vector-icons/Entypo';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';
import MoreCohices from '../../../../../Global/Components/Modals/MoreCohices';
import Sale from './Screens/Sale'
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';

const Stack = createNativeStackNavigator();

const SalesStack = () => {

    const [modalAnswer, setModalAnswer] = useState(false)
    const [tmps, setTmps] = useState([]);
    const [tmpModal, setTmpModal] = useState(false);

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
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: CustomColors.greyV2
            }}>
                <Stack.Screen options={{
                    title: "Pərakəndə Satışlar"
                }} name='sales' component={Sales} />
                <Stack.Screen options={{
                    title: "Satış",
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
                }} name='sale' component={Sale} />
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

export default SalesStack

const styles = StyleSheet.create({})