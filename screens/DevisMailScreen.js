import { GlobalStyles } from '../styles/global';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { NavBar, Button, Input } from 'galio-framework';

import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import TendanceComp from '../components/TendanceComp';
import { hideCustomModal, changeQte } from '../store/customModal/actions';
import { getAllProductsApi } from '../store/products/actions';
import { post } from '../helpers/apiHelpers';
import { Picker } from '@react-native-picker/picker';
const DevisMailScreen = props => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  useEffect(() => {
    let config = {
      headers: {
        access_token: state.authReducer.token,
      },
    };
    dispatch(getAllProductsApi(config));
    console.log('working');
  }, []);
  useEffect(()=>{
   if(state.productsReducer.length!=0 ) {
     setSelectedLanguage(state.productsReducer[0]) ; 
     console.log(selectedLanguage) ; 
   }
  },[state.productsReducer])
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedType,setSelectedType]=useState('') ; 
  const [qte, setQte] = useState(0);
  const [productList, setProductList] = useState([]);

  const sendDemande = async () => {
    let body = {
      productList: productList.map(elm => {
        return {
          product: elm.product._id,
          qty: elm.qte
        }
      }),
      email: state.authReducer.user.email, 
      typeProduit:selectedType
    }
    let result = await post('devis/add', body);
    if (result) {
      ToastAndroid.showWithGravity(
        "Votre demande à été envoyé , vous recevez un devis ",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  return (
    <View style={GlobalStyles.maincreen}>
      <NavBar
        title="Devis"
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
        right={
          <FeatherIcon
            name="map-pin"
            style={GlobalStyles.iconStyle}
            onPress={() => {
              props.navigation.navigate('Map');
            }}
          />
        }
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '8%',
            backgroundColor: '#EEEEEE',
            borderRadius: 30,
            marginTop: 10,
          }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            {state.productsReducer.map(elm => (
              <Picker.Item key={elm._id} label={elm.nameProduit} value={elm} />
            ))}
          </Picker>
        </View>
        <View
          style={{
            width: '90%',
            height: '8%',
            backgroundColor: '#EEEEEE',
            borderRadius: 30,
            marginTop: 10,
          }}>
          {
            (selectedLanguage && selectedLanguage.qtyDispo) && <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
              }>
              {selectedLanguage.qtyDispo.map((elm,ind )=> (
                <Picker.Item key={ind} label={elm} value={elm} />
              ))}
            </Picker>
          }
        </View>
        <Input
          placeholder="Largeur"
          style={{ ...GlobalStyles.inputItem, height: 50, marginTop: 10 }}
          bgColor={'#EEEEEE'}
          borderless={true}
          value={qte.toString()}
          onChangeText={text => {
            setQte(Number(text));
          }}
        />
        <Button
          color="#ee1c28"
          style={GlobalStyles.BtnStyle}
          onPress={() => {
            setProductList([
              ...productList,
              { product: selectedLanguage, qte: qte },
            ]);
          }}>
          Ajouter
        </Button>
        <View>
          {productList.map((elm, ind) => {
            console.log(elm);
            return (
              <View
                style={{
                  width: 380,
                  height: 60,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  Produit: {elm.product.nameProduit}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  Qte: {elm.qte}
                </Text>
                <Button
                  style={{
                    height: 30,
                    width: 30,
                    position: 'absolute',
                    right: 2,
                    margin: 3,
                    alignItems: 'center',
                  }}
                  color="red"
                  onPress={() => {
                    let filtredList = productList.filter(
                      (elm, index) => index !== ind,
                    );
                    setProductList(filtredList);
                  }}>
                  X
                </Button>
              </View>
            );
          })}
        </View>
        <Button
          color="#ee1c28"
          style={GlobalStyles.BtnStyle}
          onPress={sendDemande}>
          Envoyé
        </Button>
      </View>
    </View>
  );
};

export default DevisMailScreen;
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
    color: '#f1404c',
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
});
