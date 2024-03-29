import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons'

const SearchBar = ({ text, width, addStyle, vl, setVL, ...props }) => {
    return (
        <View style={[{ width: width }, styles.container, addStyle]}>
            <View style={styles.firsContainer}>
                <Text><EvilIcon color={'black'} name='search' size={30}/></Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholderTextColor={'grey'} value={vl} placeholder={'Axtarış....'} {...props} style={[styles.input]} />
            </View>
            {
                vl != '' &&
                <View style={styles.endContainer}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginRight:10}} onPress={()=>{setVL("")}}>
                        <FontAwesome name='remove' size={20} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5
    },
    firsContainer: {
        width: '20%',
        justifyContent: 'center',
        marginLeft: 5
    },
    inputContainer: {
        width: '70%',
    },
    input: {

    },
    endContainer: {
        width: '10%',
    },
})