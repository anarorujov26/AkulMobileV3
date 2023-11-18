import React, { useContext, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { GlobalContext } from './../Components/GlobalState';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomColors from '../Colors/CustomColors';
import CustomPrimaryButton from './CustomPrimaryButton';
import Api from './../Components/Api';
import PriceTypeProses from '../Components/PriceTypeProses';

const ProductsScanner = ({ route, navigation }) => {

    const { location, state, setState, setButton, type, pageName } = route.params
    const { prefix, prices } = useContext(GlobalContext);

    const scannerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scanAgaing, setScanAgain] = useState(false)

    const getProduct = async (data) => {
        let quantity = 1;
        let barcode = String(data);
        let barcodeCutFormat = Number(barcode.slice(0, 2));
        if (barcodeCutFormat == 27 || barcodeCutFormat == 29) {
            let newBarcode = barcode;
            barcode = prefix;
            barcode += newBarcode.slice(2, newBarcode.length);
            quantity = barcode.slice(7, -1);
        }
        if (barcodeCutFormat == prefix) {
            quantity = barcode.slice(7, -1);
        }

        setScanAgain(true)
        setIsLoading(true);
        let obj = {
            fast: barcode,
            ar: 0,
            token: await AsyncStorage.getItem("token")
        }
        if (type !== "Buy" && type !== "BuySupply") {
            if (prices.priceId !== null) {
                obj.pricetype = prices.priceId;
            }
        }
        const result = await Api('products/getfast.php', obj);
        if (result.data.Body.List[0]) {
            let obj = { ...result.data.Body.List[0] }
            obj.NewQuantity = quantity
            if (obj.Description == ":pcs:") {
                obj.NewQuantity == Number(quantity) / 1000
            }
            setIsLoading(false);
            let d = { ...obj };
            if (type !== "Buy" && type !== "BuySupply") {
                if (prices.priceId !== null) {
                    d.Price = d[PriceTypeProses[prices.priceId]];
                }
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
                    <ActivityIndicator size={50} color={CustomColors.primary} />
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

export default ProductsScanner

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
