import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal, TouchableOpacity } from 'react-native';
import CustomColors from '../Colors/CustomColors';
import { ConvertFixedTable } from '../Components/ConvertFixedTable';

const GetUnits = ({ modalVisible, setModalVisible, units, data, setData, type }) => {

    const selectUnit = (element, index) => {
        let item = { ...data };
        let totalQuantity = (data.Quantity / ConvertFixedTable(element.Ratio))
        if (type == "Buy" || type == "BuySupply") {
            item.Price = totalQuantity * ConvertFixedTable(element.BuyPrice);
        } else {
            item.Price = totalQuantity * ConvertFixedTable(element.Price);
        }
        item.UnitId = element.Id;
        item.UnitName = element.Name;
        item.UnitTitle = element.Title
        item.Quantity = totalQuantity;
        setData(item);

    }

    const selectDefaultUnit = (element, index) => {
        let item = { ...data };
        let totalQuantity = (data.Quantity * ConvertFixedTable(units[1].Ratio))
        if (type == "Buy" || type == "BuySupply") {
            item.Price = totalQuantity * ConvertFixedTable(element.BuyPrice);
        } else {
            item.SalePirce = totalQuantity * ConvertFixedTable(element.Price);
        }
        item.UnitId = element.Id;
        item.UnitName = element.Name;
        item.UnitTitle = element.Title
        item.Quantity = totalQuantity;
        setData(item);

    }

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 25, color: "white", backgroundColor: CustomColors("dark").primary, width: '100%', textAlign: 'center', padding: 4, borderRadius: 5 }}>Vahidlər</Text>
                    <TouchableOpacity disabled={data.UnitId == units[0].Id} onPress={() => {
                        selectDefaultUnit(units[0])
                    }} style={styles.button}>
                        <Text style={styles.buttonText}>{units[0].Name}</Text>
                    </TouchableOpacity>
                    {
                        units[1] &&
                        <TouchableOpacity disabled={data.UnitId == units[1].Id} onPress={() => {
                            selectUnit(units[1])
                        }} style={styles.button}>
                            <Text style={styles.buttonText}>{units[1].Name}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default GetUnits

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
        width: '100%',

    },
    button: {
        width: '50%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 10,
        justifyContent: 'center', alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'black',
        fontSize: 15
    }
})