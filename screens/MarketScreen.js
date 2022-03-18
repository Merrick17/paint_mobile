import React, {useState} from 'react';
import {StyleSheet, PermissionsAndroid, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';
import {NavBar} from 'galio-framework';
import {GlobalStyles} from '../styles/global';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { getAllMarketsApi } from '../store/markets/action';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWVycmljazE3IiwiYSI6ImNqdjg1d243YjBlbms0NW50M3ZvaGlhbG8ifQ.JvWxv9X81IW7k64zGXEY2Q',
);
const MarketScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [long, setLong] = useState(0);
  const [alt, setLalt] = useState(0);
  const {list} = useSelector(state => state.markets);
  const state = useSelector((state)=>state);
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  const initLocation = async () => {
    let verif = await requestLocationPermission();
    if (verif) {
      Geolocation.getCurrentPosition(
        info => {
          setLong(info.coords.longitude);
          setLalt(info.coords.latitude);
        },
        err => {
          console.log(err);
        },
        {timeout: 7000, enableHighAccuracy: false, maximumAge: 360000},
      );
    }
  };
  useEffect(() => {
    let config = {
        headers: {
            'access_token': state.authReducer.token
        }
    }

    initLocation();
    dispatch(getAllMarketsApi(config))
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <NavBar
          title="Magasins"
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
          right={
            <FeatherIcon
              name="map-pin"
              style={GlobalStyles.iconStyle}
              onPress={() => {
                navigation.navigate('Map');
              }}
            />
          }
        />
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera centerCoordinate={[long, alt]} zoomLevel={9} />
          {list &&
            list.map(elm => {
              console.log('Eleeemnt', elm);
              if (
                elm.lat !== null &&
                elm.lng !== null &&
                elm.nameMagasin !== null &&
                elm.nameMagasin !== undefined
              ) {
                return (
                  <MapboxGL.PointAnnotation
                    key={elm._id}
                    id={elm._id}
                    title=""
                    coordinate={[elm.lng, elm.lat]}
                  />
                );
              }
            })}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
