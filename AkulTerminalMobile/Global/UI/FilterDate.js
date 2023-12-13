import { StyleSheet } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment/moment'

const FilterDate = ({ date, setDate, open, setOpen, type, s }) => {
    return (
        <DatePicker
            modal
            mode='date'
            open={open}
            date={new Date()}
            onConfirm={(date) => {
                if (s === 1) {
                    setDate(rel => ({ ...rel, [type]: moment(date).format('YYYY-MM-DD 0:00:00') }));
                }

                if (s === 2) {
                    setDate(rel => ({ ...rel, [type]: moment(date).format('YYYY-MM-DD 23:59:59') }));
                }

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