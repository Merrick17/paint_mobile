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

import { Picker } from '@react-native-picker/picker';
const DevisScreen = props => {

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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const calculateEstim = () => {
        if (selectedProduct != null) {
            if (selectedProduct.symbol == "/") {
                const total = (height * width) / selectedProduct.valeur;
                return total;
            } else {
                const total = (height * width) * selectedProduct.valeur;
                return total;
            }
        } else {
            return 0;
        }

    }
    //console.log('My Products', state.productsReducer);

    return (
        <View style={GlobalStyles.maincreen}>
            <NavBar
                title="Estimation"
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
            <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '90%', height: '8%', backgroundColor: '#EEEEEE', borderRadius: 30, marginTop: 10 }}>
                    <Picker
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedProduct(itemValue)
                        }>
                        {
                            state.productsReducer.map((elm) => <Picker.Item key={elm._id} label={elm.nameProduit} value={elm._id} />)
                        }


                    </Picker>
                </View>
                <Input
                    placeholder="Largeur"
                    style={{ ...GlobalStyles.inputItem, height: 50, marginTop: 10 }}
                    bgColor={'#EEEEEE'}
                    borderless={true}

                    value={width.toString()}
                    onChangeText={text => {
                        setWidth(text);
                    }}
                />
                <Input
                    placeholder="Hauteur"
                    style={{ ...GlobalStyles.inputItem, height: 50, marginTop: 10 }}
                    bgColor={'#EEEEEE'}
                    borderless={true}

                    value={height.toString()}
                    onChangeText={text => {
                        setHeight(text);
                    }}
                />
                <View style={{ height: 300, width: 300, borderWidth: 2, borderColor: "#EEEEEE", borderRadius: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 3 }}>Quantité recommander</Text>
                    <Text style={{ fontSize: 50, alignSelf: 'center', fontWeight: 'bold', position: 'absolute', bottom: 150 }}>{calculateEstim()} KG</Text>
                </View>
            </View>

        </View>
    );
};

export default DevisScreen;
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
