import React from 'react'
import Home from './Home'
import { GlobalProvider } from './Global/Components/GlobalState';

const App = () => {
  return (
      <GlobalProvider>
        <Home />
      </GlobalProvider>
  )
}

export default App

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import SelectDropdown from 'react-native-select-dropdown'

// const countries = ["Egypt", "Canada", "Australia", "Ireland"]

// const App = () => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center' }}>
//       <SelectDropdown
//         data={countries}
//         onSelect={(selectedItem, index) => {
//           console.log(selectedItem, index)
//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem
//         }}
//         rowTextForSelection={(item, index) => {
//           return item
//         }}
//         buttonStyle={{
//           backgroundColor:'red'
//         }}
//       />
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})