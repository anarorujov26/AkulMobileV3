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

export default App;