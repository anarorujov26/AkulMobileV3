import { View, Text } from 'react-native'
import React from 'react'

const GetRowProsessing = ({firstWidth,endWidth,firstContent,endContent}) => {
  return (
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',width:'100%'}}>
        <View style={{width:firstWidth}}>
            {firstContent}
        </View>
        <View style={{width:endWidth}}>
            {endContent}
        </View>
    </View>
  )
}

export default GetRowProsessing