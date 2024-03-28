import React, { useEffect } from 'react'
import Home from './Home'
import { GlobalProvider } from './Global/Components/GlobalState';
import { useColorScheme } from 'react-native';

const App = () => {

  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log(colorScheme);
  },[])

  return (
      <GlobalProvider>
        <Home />
      </GlobalProvider>
  )
}

export default App;