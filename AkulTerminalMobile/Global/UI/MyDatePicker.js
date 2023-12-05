import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

const MyDatePicker = ({open,setOpen,date,setDate,type,setState}) => {


  return (
      <DatePicker
        modal
        mode='date'
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(rel => ({...rel,[type]:moment(date).format("YYYY-MM-DD hh:mm:ss")}))
          setState(true)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        theme='auto'
        title={'Tarix'}
        textColor={'black'}
        confirmText='Təstiq et'
        cancelText='Bağla'
        fadeToColor='red'
      />
  )
}

export default MyDatePicker

const styles = StyleSheet.create({})