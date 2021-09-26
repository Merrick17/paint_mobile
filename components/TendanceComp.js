import React, {useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Button} from 'galio-framework';
import {GlobalStyles} from '../styles/global';
import {useDispatch} from 'react-redux';
import {showCustomModal} from '../store/customModal/actions';
import {BaseUrl} from '../helpers/apiHelpers';
const TendanceComp = ({imageUrl, Name, color, navigation, tendance}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('BASE URL', `${BaseUrl}/${imageUrl}`);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {
          tendance: tendance,
        });
      }}>
      <View style={styles.tendance}>
        <Image
          source={{
            uri: `${BaseUrl}/${imageUrl}`,
          }}
          style={{
            height: 160,
            width: '100%',
            borderRadius: 10,
            alignSelf: 'center',
            resizeMode: 'cover',
            //marginTop: 5,
          }}
        />
        <View
          style={{
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            marginLeft: 20,
          }}>
          <Text style={GlobalStyles.productLabel}>{Name}</Text>
          <View
            style={{
              height: 20,
              width: 30,
              backgroundColor: color,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TendanceComp;

const styles = StyleSheet.create({
  txtStyle: {
    color: '#f1404c',
    fontFamily: 'poppins_bold',
    textAlign: 'center',
    margin: 5,
  },
  tendance: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 240,
    width: '95%',
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
