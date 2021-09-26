import { GlobalStyles } from '../styles/global';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableHighlight,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { NavBar, Button, Input } from 'galio-framework';

import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductsApi } from '../store/products/actions';
import { BaseUrl } from '../helpers/apiHelpers';
const ProductScreen = props => {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  useEffect(() => {

    let config = {
      headers: {
        'access_token': state.authReducer.token
      }
    }
    dispatch(getAllProductsApi(config));
  }, [])


  return (
    <View style={GlobalStyles.maincreen}>
      <NavBar
        title={state.SelectedCateg.name}
        titleStyle={GlobalStyles.newsTitle}
        style={GlobalStyles.headerStyle}
        left={
          <Icon
            name="menu"
            style={GlobalStyles.iconStyle}
            onPress={() => {
              //console.log('My Navigator', props.navigation);
              props.navigation.openDrawer();
            }}
          />
        }
        right={<FeatherIcon name="map-pin" style={GlobalStyles.iconStyle} onPress={() => {
          navigation.navigate('Map');
      }} />}
      />
      <ScrollView style={styles.productList}>
        <View style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          {
            state.productsReducer.map((elm) => {
              let img = `${BaseUrl}/${elm.imageUrl}`;
              console.log("ELM", elm);
              return (<View style={{ height: 300, width: '90%', backgroundColor: '#FFFF', marginBottom: 10, flex: 1, flexDirection: 'column' }} key={elm._id}>
                <Image
                  source={{
                    uri: `${img}`,
                  }}
                  style={{
                    height: 160,
                    width: '100%',

                    alignSelf: 'center',
                    resizeMode: 'cover',
                    //marginTop: 5,
                  }}
                />
                <View style={{ width: "100%", flexDirection: 'column', marginTop: 5, marginLeft: 4, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Produit :{elm.nameProduit} </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Type d'utilisation : {elm.typeUtilisation} </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>type : {elm.tyProduit} </Text>
                  <TouchableOpacity style={{
                    width: '90%', height: 40, backgroundColor: '#ee1c28', borderRadius: 10, alignItems: 'center',
                    justifyContent: 'center', marginTop: 10
                  }} onPress={() => {
                    props.navigation.navigate('ProductDetails', {
                      product: elm
                    });
                  }}>
                    <Text style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: '#FFF',
                      fontWeight: 'bold'
                    }}>Plus de Details </Text>
                  </TouchableOpacity>
                </View>
              </View>)

            })
          }
        </View>
      </ScrollView>

    </View>
  );
};

export default ProductScreen;
const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
    //alignItems: 'flex-start',
    height: '100%',
  },
  header: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  txtStyle: {
    fontFamily: 'poppins_bold',
    textAlign: 'center',
    margin: 5,
  },
  product: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 256,
    width: 185,
    margin: 10,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: 380,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  labelStyle: {
    alignSelf: 'flex-start',
    marginVertical: 2,
    fontSize: 13,
    //marginRight: 30,
    fontFamily: 'poppins_bold',
    color: 'black',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputStyle: {
    //backgroundColor: 'transparent',
    //paddingHorizontal:150,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 2,
    alignContent: 'flex-start',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'poppins_bold',
    fontSize: 17,
  },
  productList: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,


    marginTop: 30
  }
});
