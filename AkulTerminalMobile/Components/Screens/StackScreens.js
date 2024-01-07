import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import HomePage from './Screen/HomePage';
import SupplysMain from './Screen/HomeChildScreens/Supplys/SupplysMain';
import DemandsMain from './Screen/HomeChildScreens/Demand/DemandsMain';
import SupplyReturns from './Screen/HomeChildScreens/SupplysReturns/SupplysMain';
import DemandReturns from './Screen/HomeChildScreens/DemandReturns/DemandsMain'
import InventMain from './Screen/HomeChildScreens/Invent/InventMain';
import CustomerOrdersMain from './Screen/HomeChildScreens/CustomerOrders/CustomerOrdersMain';
import ProductsHome from './Screen/HomeChildScreens/Products/ProductsHome';
import Profile from './Screen/Profile';
import CatalogsMain from './Screen/HomeChildScreens/Catalogs/CatalogsMain';
import MovesMain from './Screen/HomeChildScreens/Moves/MovesMain';
import TransactionMain from './Screen/HomeChildScreens/Transaction/TransactionMain';
import DebtStack from './Screen/HomeChildScreens/Debt/DebtStack';
import ShiftsMain from './Screen/HomeChildScreens/Shifts/ShiftsMain';
import SalesMain from './Screen/HomeChildScreens/Sale/SalesMain';
import SalePStack from './Screen/HomeChildScreens/SaleReport/SalePStack';
import Profits from './Screen/HomeChildScreens/Profit/Profits';
import AccountsStack from './Screen/HomeChildScreens/Accounts/AccountsStack';
import CustomColors from '../../Global/Colors/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dashboard from './Screen/HomeChildScreens/Dashboards/Dashboard';
import CustomersMain from './Screen/HomeChildScreens/Customers/CustomersMain';

const StackScreens = () => {
    const navigation = useNavigation();

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='home' component={HomePage} options={{
                headerShown: true,
                headerTitle: "SƏHİFƏLƏR",
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: CustomColors.primaryV3,
                },
                headerTitleStyle: {
                    color: 'white'
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => { navigation.navigate("profile") }} style={styles.profile}>
                        <AntDesign size={25} color={'white'} name='setting' />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name='productsStack' component={ProductsHome} />
            <Stack.Screen name='supplysMain' component={SupplysMain} />
            <Stack.Screen name='supplysReturnsMain' component={SupplyReturns} />
            <Stack.Screen name='demandsMain' component={DemandsMain} />
            <Stack.Screen name='demandReturns' component={DemandReturns} />
            <Stack.Screen name='inventsPage' component={InventMain} />
            <Stack.Screen name='customerOrdersPage' component={CustomerOrdersMain} />
            <Stack.Screen name='catalogsPage' component={CatalogsMain} />
            <Stack.Screen name='move' component={MovesMain} />
            <Stack.Screen name='transactionsPage' component={TransactionMain} />
            <Stack.Screen name='debtPage' component={DebtStack} />
            <Stack.Screen name='shiftsPage' component={ShiftsMain} />
            <Stack.Screen name='salePage' component={SalesMain} />
            <Stack.Screen name='salePPage' component={SalePStack} />
            <Stack.Screen name='dashboards' component={Dashboard} options={{
                headerShown: true,
                headerTitle: "Göstəricilər",
                headerTitleAlign: 'center',
                headerTitleStyle: { color: CustomColors.greyV2 },
                headerBackVisible: false
            }} />
            <Stack.Screen name='profitPage' component={Profits} options={{
                headerShown: true,
                headerTitle: "Mənfəət və Zərər",
                headerTitleAlign: 'center',
                headerTitleStyle: { color: CustomColors.greyV2 },
                headerBackVisible: false
            }} />
            <Stack.Screen name='accountsPage' component={AccountsStack} />
            <Stack.Screen name='customers' component={CustomersMain} />
            <Stack.Screen options={{
                headerShown: true,
                headerBackVisible: false,
                title: "Profil Məlumatlar",
                headerTitleAlign: 'center'
            }} name='profile' component={Profile} />
        </Stack.Navigator>
    )
}

export default StackScreens

const styles = StyleSheet.create({})