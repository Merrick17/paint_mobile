import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {GlobalStyles} from '../styles/global';
import {NavBar} from 'galio-framework';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BaseUrl} from '../helpers/apiHelpers';
const TendanceDetails = ({navigation, route}) => {
  const {tendance} = route.params;
  return (
    <View style={GlobalStyles.maincreen}>
      <NavBar
        title={tendance.nameColor}
        titleStyle={GlobalStyles.newsTitle}
        style={GlobalStyles.headerStyle}
        left={
          <Icon
            name="menu"
            style={GlobalStyles.iconStyle}
            onPress={() => {
              //console.log('My Navigator', props.navigation);
              navigation.openDrawer();
            }}
          />
        }
        right={<FeatherIcon name="map-pin" style={GlobalStyles.iconStyle} onPress={() => {
          navigation.navigate('Map');
      }} />}
      />

      <View style={styles.mainView}>
        <Image
          source={{
            uri: `${BaseUrl}/${tendance.tendanceImage}`,
          }}
          style={styles.tendanceImage}
        />
        <View style={styles.bottomCard} />
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          {tendance.nameColor}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            alignSelf: 'flex-start',
            marginBottom: 20,
            marginLeft: 10,
          }}>
          {tendance.description}
        </Text>
        <View
          style={{
            height: '20%',
            width: '70%',

            backgroundColor: tendance.refColor.refColor,
            marginBottom: 30,
            alignSelf: 'center',
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 24,
              margin: 5,
              fontWeight: 'bold',
            }}>
            {tendance.refColor.nameColor}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TendanceDetails;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  tendanceImage: {
    width: '100%',
    height: 370,
    resizeMode: 'cover',
  },
  bottomCard: {
    position: 'absolute',
    backgroundColor: '#FFF',
    height: '60%',
    width: '100%',
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
});
