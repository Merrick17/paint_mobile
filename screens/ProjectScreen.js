import {GlobalStyles} from '../styles/global';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {NavBar, Button, Input} from 'galio-framework';

import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {getAllColorssapi} from '../store/colors/actions';
import {getAllProjectsByUser} from '../store/projects/actions';
const ProjectScreen = props => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  useEffect(() => {
    let config = {
      headers: {
        access_token: state.authReducer.token,
      },
    };
    dispatch(getAllProjectsByUser(state.authReducer.user._id));
    console.log('working');
  }, []);
  //console.log('My Products', state.productsReducer);

  return (
    <View style={GlobalStyles.maincreen}>
      <NavBar
        title="Mes Projets"
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
      <ScrollView style={{height: '100%', width: '100%', flex: 1}}>
        {state.projects.list.map(elm => {
          return (
            <View
              key={elm._id}
              style={{
                height: 350,
                width: 370,
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 12,
              }}>
              <Text style={{fontSize: 28, fontWeight: 'bold', padding: 10}}>
                {elm.nameProject}
              </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
                {elm.description}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                  backgroundColor: elm.refColor,
                }}
              />
              <Text style={{fontSize: 18, fontWeight: 'bold', padding: 10}}>
                Created At: {moment(elm.createdAt).format('DD/MM/YYYY')}{' '}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProjectScreen;
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
