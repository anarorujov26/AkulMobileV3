import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import { GlobalContext } from '../../../../../../Global/Components/GlobalState'
import { Dimensions } from 'react-native'
import AddCardProducts from '../../../../../../Global/Components/AddCardProducts'
import { useState } from 'react'
import ImageModal from '../../../../../../Global/Components/ImageModal'


const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 20;

const ProductsList = (props) => {

  const { listType } = useContext(GlobalContext);
  const [imageModal, setImageModal] = useState(false);

  return (
    <>
      {
        listType == 1 ?
          <TouchableOpacity onLongPress={() => {
            props.element.Pic ?
              setImageModal(true)
              :
              alert("Bu məhsulda şəkil yoxdur!")
          }} style={styles.listContainer} onPress={() => { props.navigation.navigate(props.location, { id: props.id, type: "products", renderList: props.renderState }) }}>
            <View style={styles.listFirs}>
              <View style={styles.listFirsContainer}>
                {
                  props.element.Pic ?
                    <Image source={{ uri: props.element.Pic }} style={styles.avatar} />
                    :
                    <View style={styles.avatar}>
                      <Text style={{ color: "white" }}>{props.name[0] + props.name[1]}</Text>
                    </View>
                }
              </View>
              <View style={styles.listCenterContiner}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.barcode}>{props.barcode}</Text>
                <Text style={styles.customerName}>{props.customername}</Text>
              </View>
            </View>
            <View style={styles.listEndContainer}>
              <Text style={styles.price}>{props.price}₼</Text>
            </View>
          </TouchableOpacity>
          :
          <AddCardProducts name={props.name} price={props.price} pic={props.element.Pic} press={() => {
            props.navigation.navigate(props.location, { id: props.id, type: "products", renderList: props.renderState })
          }
          } />
      }
      <ImageModal imageModal={imageModal} setImageModal={setImageModal} name={props.name} price={props.price} pic={props.element.Pic} />
    </>
  )
}
export default ProductsList

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors.greyV1,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 3
  },
  listFirs: {
    flexDirection: 'row',
    width: '80%',
  },
  listFirsContainer: {
    justifyContent: 'center',
    marginRight: 10
  },
  listCenterContiner: {
    justifyContent: 'center'
  },
  listEndContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  avatarName: {
    fontSize: 20,
    color: 'black',
  },
  name: {
    color: 'black',
    fontWeight: '600'
  },
  barcode: {
    fontSize: 13,
  },
  customerName: {
    color: CustomColors.connectedPrimary
  },
  price: {
    color: 'black'
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: cardWidth,
    height: cardWidth,
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    bottom: 0,
    paddingLeft: 5
  }
})