import { ActivityIndicator, BackHandler, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { InputItem, List } from '@ant-design/react-native';
import { CustomersGlobalContext } from '../CustomersGlobalState';
import Api from './../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import CustomersGroupModal from './../../../../../../Global/Components/Modals/CustomersGroupModal';
import CustomSuccessSaveButton from './../../../../../../Global/UI/CustomSuccessSaveButton';
import { CustomToLowerCase } from './../../../../../../Global/Components/CustomToLowerCase';
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton';
import { ConvertFixedTable } from './../../../../../../Global/Components/ConvertFixedTable';
import { useFocusEffect } from '@react-navigation/native';
import BackModal from './../../../../../../Global/Components/Modals/BackModal';
import PriceTypes from '../../../../../../Global/Components/PriceTypes';
import GetPriceType from './../../../../../../Global/Components/GetPriceType';
import DocumentAmmount from '../../../../../../Global/Components/DocumentAmmount';



const Customer = ({ route, navigation }) => {

    const { customer, setCustomer, setCustomersListRender } = useContext(CustomersGlobalContext);
    const [gpModal, setGpModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [iaIsLoading, setIaIsLoading] = useState(false);
    const [priceTypeModal, setPriceTypeModal] = useState(false);

    const [dontBackModal, setDontBackModal] = useState(false);

    const getOnChangeText = (type, value) => {
        setCustomer(rel => ({ ...rel, [type]: value }));
        if (!saveButton) {
            setSaveButton(true);
        }
    }

    let inputs = [
        {
            name: "Ad",
            value: 'Name',
            props: {
                onChangeText: (e) => {
                    getOnChangeText('Name', e)
                }
            }
        },
        {
            name: "Qrup",
            value: 'GroupName',
            props: {
                editable: false,
            }
        },
        {
            name: "Telefon",
            value: 'Phone',
            props: {
                onChangeText: (e) => {
                    getOnChangeText('Phone', e);
                }
            }
        },
        {
            name: "Şərh",
            value: 'Description',
            props: {
                onChangeText: (e) => {
                    getOnChangeText('Description', e);
                },
            }
        },
        {
            name: "Endirim",
            value: 'Discount',
            props: {
                onChangeText: (e) => {
                    getOnChangeText('Discount', e);
                },
            }
        },
    ]

    const { id } = route.params;

    const getCustomer = async (customerId) => {
        if (customerId === null) {
            let obj = {
                Name: '',
                Phone: '',
                GroupId: '',
                GroupName: '',
                Description: '',
                Payment: '',
                status: true,
                PriceTypeId: 0,
                PriceTypeName: "",
            }
            setCustomer(obj);
        } else {
            let obj = {
                id: customerId,
                token: await AsyncStorage.getItem('token')
            };
            const result = await Api('customers/get.php', obj);
            let data = { ...result.data.Body.List[0] }
            const priceType = await GetPriceType(result.data.Body.List[0].PriceTypeId);
            data.PriceTypeId = priceType.Id;
            data.PriceTypeName = priceType.Name;
            if (result.data.Headers.ResponseStatus === "0") {
                setCustomer(data);
            } else {
                navigation.goBack();
            }
        }
    }

    const successAlert = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Əməliyyat uğurla icra olundu!',
            ToastAndroid.CENTER,
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
            200,
            50
        )
    }

    const getSaveProsessing = async () => {
        setIsLoading(true)
        const data = { ...customer };
        if (Number(data.Discount) > 100) {
            alert("Endirim 100% dən çox ola bilməz!")
        }
        else if (data.Name == "" || data.GroupId == "") {
            alert("Ad vəya qrup boşdur!")
        } else {
            const cData = CustomToLowerCase(data);
            cData.token = await AsyncStorage.getItem('token');
            const putData = await Api("customers/put.php", cData);
            if (putData.data.Headers.ResponseStatus === "0") {
                setSaveButton(false);
                setCustomer(null)
                getCustomer(putData.data.Body.ResponseService);
                navigation.goBack();
                setCustomersListRender(rel => rel + 1);
                successAlert();
            } else {
                alert(putData.data.Body);
            }
        }
        setIsLoading(false);
    }

    const customerPutIsArch = async () => {
        setIaIsLoading(true);
        const data = {
            id: customer.Id,
            name: customer.Name,
            groupid: customer.GroupId,
            pricetypeid: customer.PriceTypeId,
            phone: customer.Phone,
            card: customer.Card,
            tin: customer["TIN"],
            legaladdress: customer.LegalAddress,
            physicaladdress: customer.PhysicalAddress,
            description: customer.Description,
            discount: ConvertFixedTable(customer.Discount),
            bonus: ConvertFixedTable(customer.Bonus),
            modifications: [],
            isarch: customer.IsArch == 1 ? 0 : 1,
            token: await AsyncStorage.getItem('token')
        }

        const result = await Api('customers/put.php', data);
        if (result.data.Headers.ResponseStatus === "0") {
            setCustomer(null);
            getCustomer(result.data.Body.ResponseService);
            setCustomersListRender(rel => rel + 1);
        } else {
            alert(result.data.Body);
        }
        setIaIsLoading(false);
    }

    const getExit = () => {
        setCustomer(null)
        navigation.goBack();
    }

    useEffect(() => {
        getCustomer(id);
    }, [])


    useFocusEffect(

        useCallback(() => {
            const onBackPress = async () => {
                navigation.setParams({ shouldGoToSpecificPage: false });
                saveButton ? setDontBackModal(true) : (navigation.goBack(), setCustomer(null));
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [saveButton]))

    return (
        <View style={{ flex: 1 }}>
            {
                customer !== null ?
                    <List>
                        {
                            inputs.map((element, index) => {
                                return (
                                    element.name !== "Qrup" ?
                                        <InputItem
                                            key={index + 1}
                                            {...element.props}
                                            value={element.name == "Endirim" ? String(ConvertFixedTable(customer[element.value])) : customer[element.value]}
                                        >
                                            {element.name}
                                        </InputItem>
                                        :
                                        <TouchableOpacity key={index + 1} onPress={() => {
                                            setGpModal(true);
                                        }}>
                                            <InputItem
                                                key={index + 1}
                                                {...element.props}
                                                value={customer[element.value]}
                                            >
                                                {element.name}
                                            </InputItem>
                                        </TouchableOpacity>
                                )
                            })
                        }
                        <TouchableOpacity onPress={() => {
                            setPriceTypeModal(true);
                        }}>
                            <InputItem
                                editable={false}
                                value={customer.PriceTypeName}
                            >
                                Qiymət Növü
                            </InputItem>
                        </TouchableOpacity>
                    </List>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={50} color={CustomColors.primaryV3} />
                    </View>
            }
            <CustomersGroupModal modalVisible={gpModal} setModalVisible={setGpModal} save={setSaveButton} idType={'GroupId'} nameType={'GroupName'} state={setCustomer} />
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {
                        saveButton &&
                        <CustomSuccessSaveButton text={'Yadda Saxla'} isLoading={isLoading} setIsLoading={setIsLoading} width={'60%'} onPress={getSaveProsessing} />

                    }
                    {
                        customer !== null && id !== null &&
                        <CustomPrimaryButton isLoading={iaIsLoading} setIsLoading={setIaIsLoading} text={customer.IsArch == 0 ? 'Arxivə Yerləşdir' : 'Arxivdən Çıxart'} width={'38%'} onPress={customerPutIsArch} />
                    }
                </View>
            </View>
            <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
            <PriceTypes save={setSaveButton} setState={setCustomer} modalVisible={priceTypeModal} setModalVisible={setPriceTypeModal} key={1 + 1} />
        </View >
    )
}

export default Customer

const styles = StyleSheet.create({})