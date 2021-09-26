import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavBar } from 'galio-framework';
import { GlobalStyles } from '../styles/global';
import Icon from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'galio-framework';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TendanceComp from '../components/TendanceComp';
import { FloatingAction } from 'react-native-floating-action';
import { getTendancesApi } from '../store/tendances/actions';
import FeatherIcon from 'react-native-vector-icons/Feather';
const MainScreen = ({ navigation }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const actions = [
    {
      text: "Crée un Projet",
      name: "project",
      position: 2
    },
    {
      text: "Color Picker",
      name: "color_picker",
      position: 1
    },]
  useEffect(() => {
    dispatch(getTendancesApi());
  }, []);
  const state = useSelector(state => state.tendances);
  return (
    <View style={GlobalStyles.maincreen}>
      <NavBar
        title="Acceuil"
        titleStyle={GlobalStyles.newsTitle}
        style={GlobalStyles.headerStyle}
        left={
          <Icon
            name="menu"
            style={GlobalStyles.iconStyle}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        }
        right={<FeatherIcon name="map-pin" style={GlobalStyles.iconStyle} onPress={() => {
          navigation.navigate('Map');
        }} />}
      />
      <ScrollView style={styles.mainScroll}>
        <View style={styles.header}>
          <Text h5 style={styles.txtStyle}>
            Couleurs Tendances
          </Text>
        </View>

        {state.list.map(elm => (
          <TendanceComp
            key={elm._id}
            Name={elm.nameColor}
            color={elm && elm.refColor && elm.refColor.refColor}
            id={elm._id}
            imageUrl={elm.tendanceImage}
            navigation={navigation}
            tendance={elm}
          />
        ))}
      </ScrollView>
      <FloatingAction
        onPressMain={() => {
          //navigation.navigate('Filtre') ;

        }}
        overlayColor="rgba(68, 68, 68, 0.0)"
        actions={actions}
        onPressItem={name => {
          if (name == "project") {
            launchCamera({}, resp => {
              console.log(resp);
              let image = resp.uri;
              console.log('IMAGE', image);
              navigation.navigate('Filtre', {
                img: image,
              });
            });
          } else {
            launchCamera({}, resp => {
              console.log(resp);
              let image = resp.uri;
              console.log('IMAGE', image);
              navigation.navigate('ColorPicker', {
                img: image,
              });
            });

          }
        }}
      />
    </View>
  );
};

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
export default MainScreen;
