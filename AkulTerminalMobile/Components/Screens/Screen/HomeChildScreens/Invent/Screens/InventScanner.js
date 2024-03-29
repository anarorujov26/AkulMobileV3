import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import moment from 'moment';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton';
import { GlobalContext } from '../../../../../../Global/Components/GlobalState';
import Api from '../../../../../../Global/Components/Api';
import PriceTypeProses from '../../../../../../Global/Components/PriceTypeProses';

const InventScanner = ({ route, navigation }) => {

    const { location, state, setState, setButton, type, pageName } = route.params
    const { prices } = useContext(GlobalContext);

    const scannerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scanAgaing, setScanAgain] = useState(false)

    const getProduct = async (data) => {
        setScanAgain(true)
        setIsLoading(true);
        let obj = {
            token: await AsyncStorage.getItem("token"),
            fast: data,
            stockid: state.StockId,
            moment: moment(state.Moment).format('YYYY-MM-DD HH:mm:ss')
        }
        if (type !== "Buy") {
            if (prices.priceId !== null) {
                obj.pricetype = prices.priceId;
            }
        }
        const result = await Api('products/getfast.php', obj);
        if (result.data.Body.List[0]) {
            let obj = { ...result.data.Body.List[0] }
            setIsLoading(false);
            let d = { ...obj };
            if (prices.priceId !== null) {
                d.Price = d[PriceTypeProses[prices.priceId]];
            }
            let pg = pageName ? pageName : ""
            navigation.navigate(location, { data: d, setState, state, type, setButton, pageName: pg })
        } else {
            navigation.goBack();
            alert('Məhsul tapılmadı!')
        }
        setIsLoading(false);
    }

    const handleScanAgain = () => {
        scannerRef.current.reactivate();
        setScanAgain(false)
    }

    return (
        <View style={styles.container}>
            <QRCodeScanner
                ref={scannerRef}
                onRead={({ type, data, rawData }) => {
                    getProduct(data);
                }}
                cameraStyle={{
                    height: '100%'
                }}
                showMarker={!isLoading}
                flashMode={RNCamera.Constants.FlashMode.torch}
            />
            {
                isLoading &&
                <View style={{ flex: 1, position: 'absolute', right: 0, bottom: 0, left: 0, top: '50%' }}>
                    <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                </View>
            }

            {
                scanAgaing &&
                <View style={{ position: 'absolute', bottom: 20, width: '100%', alignItems: 'center' }}>
                    <CustomPrimaryButton text={'Yənidən skan et'} onPress={handleScanAgain} width={'95%'} />
                </View>
            }
        </View>
    )
}

export default InventScanner

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
