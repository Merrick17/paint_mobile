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
} from 'react-native';
import { NavBar, Button, Input } from 'galio-framework';

import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import TendanceComp from '../components/TendanceComp';
import { hideCustomModal, changeQte } from '../store/customModal/actions';
import { getAllColorssapi } from '../store/colors/actions';


const ColorsScreen = props => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    useEffect(() => {
        let config = {
            headers: {
                'access_token': state.authReducer.token
            }
        }
        dispatch(getAllColorssapi(config));
        console.log("working")
    }, [])
    return (
        <View style={GlobalStyles.maincreen}>
            <NavBar
                title="Couleurs"
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
            <View style={{ height: "100%", width: "100%", flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                {
                    state.colors.colorsList.map((elm) =>
                    (<TouchableOpacity onPress={() => {
                        props.navigation.navigate('ColorDetails', {
                            color: elm
                        })
                    }} key={elm._id} style={{ width: '90%', marginVertical: 10, height: 150, backgroundColor: elm.refColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontStyle: 'normal', fontWeight: 'bold', color: 'white' }}>{elm.nameColor}</Text></TouchableOpacity>)
                    )
                }
            </View>

        </View>
    );
};

export default ColorsScreen;
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
