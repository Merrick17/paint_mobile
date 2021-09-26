import React from 'react'
import { View, Image, Text } from 'react-native'
import { GlobalStyles } from '../styles/global';
import { NavBar, } from 'galio-framework'
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
const AboutScreen = (props) => {
    return (
        <View style={GlobalStyles.maincreen}>
            <NavBar
                title="A PROPOS"
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
                    props.navigation.navigate('Map');
                }} />}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFF' }}>
                <Image source={require('../assets/imgs/mca.png')} style={{ margin: 50, resizeMode: 'contain' }} />
                <Text style={{ fontStyle: 'normal', fontWeight: '700', textAlign: 'justify', margin: 20 }}>
                    MULTI CHIMIE AFRICA PLUS (MCA+) est une société spécialisée dans la fabrication de vernis, de peintures industrielles et peintures pour bâtiment localisée à Sidi Abdel Hamid, elle est créée en 22 mai 2006 avec un capital de50000 dinars. Cette unité offre plus de 21 emplois, sa forme juridiques Société A Responsabilité limitée (S.A.R L.).
                </Text>

            </View>
        </View>
    )
}

export default AboutScreen
