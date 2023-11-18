import React from 'react'
import CustomerOrdersStack from './CustomerOrdersStack';
import { CustomerOrdersGlobalProvider } from './CustomerOrdersGlobalState';

const CustomerOrdersMain = () => {
  return (
    <CustomerOrdersGlobalProvider>
      <CustomerOrdersStack />
    </CustomerOrdersGlobalProvider>
  )
}

export default CustomerOrdersMain