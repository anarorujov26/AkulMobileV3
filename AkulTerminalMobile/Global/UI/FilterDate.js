import { StyleSheet } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment/moment'

const FilterDate = ({ date, setDate, open, setOpen, type }) => {
    return (
        <DatePicker
            modal
            mode='date'
            open={open}
            date={new Date()}
            onConfirm={(date) => {
                setDate(rel => ({ ...rel, [type]: moment(date).format('YYYY-MM-DD hh:mm:ss') }));
                setOpen(false);
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

export default FilterDate

const styles = StyleSheet.create({})