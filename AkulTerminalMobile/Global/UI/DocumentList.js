import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'

const DocumentList = (props) => {
    return (
        <TouchableOpacity style={styles.listContainer} onPress={() => {
            if (props.navigation) {
                props.navigation.navigate(props.location, { id: props.id })
            }
        }}>
            <View style={styles.listFirs}>
                <View style={styles.listFirsContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarName}>{props.index + 1}</Text>
                    </View>
                </View>
                <View style={styles.listCenterContiner}>
                    {
                        props.customername &&
                        <Text style={styles.name}>{props.customername}</Text>

                    }
                    <Text style={styles.barcode}>{props.moment}</Text>
                    {
                        props.name &&
                        <Text style={styles.customerName}>{props.name}</Text>
                    }
                </View>
            </View>
            <View style={styles.listEndContainer}>
                {
                    props.amountTwo ?
                        <Text style={[styles.price,{fontSize:12}]}>{props.amountTwo}{!props.pIcon && '₼'}</Text>
                        :
                        ''
                }
                <Text style={[styles.price]}>{props.amount}{!props.pIcon && '₼'}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DocumentList

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors("dark").greyV1,
    },
    listContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 2
    },
    listFirs: {
        flexDirection: 'row',
        width: '80%',
    },
    listFirsContainer: {
        justifyContent: 'center',
        marginRight: 10
    },
    listCenterContiner: {
        justifyContent: 'center'
    },
    listEndContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10
    },
    avatarName: {
        fontSize: 20,
        color: 'black',
    },
    name: {
        color: 'black',
        fontWeight: '600'
    },
    barcode: {
        fontSize: 13,
        color: "grey"
    },
    customerName: {
        color: CustomColors("dark").connectedPrimary
    },
    price: {
        color: 'black',
        fontSize:14
    }
})