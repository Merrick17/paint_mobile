import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../styles/global'
import { NavBar, Button, Text } from 'galio-framework';
import { BaseUrl } from '../helpers/apiHelpers';
import Icon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ProjectModal from '../components/ProjectModal';
import { useDispatch } from 'react-redux';
import { showCustomModal } from '../store/customModal/actions';
const DetailsCouleurs = ({ navigation, route }) => {
    const [item, setItem] = useState({});
    const disptach = useDispatch();
    useEffect(() => {
        setItem(route.params.color);
    }, [])
    return (
        <View style={GlobalStyles.maincreen}>
            <ProjectModal />
            <NavBar
                title={"Details Couleur"}
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
            <View style={styles.container}>
                <View style={{ height: '100%', width: '100%', backgroundColor: item.refColor }}>

                </View>
                <View style={styles.bottomCard}>
                    <Text style={styles.title}>{item.nameProduit}</Text>

                    <View style={styles.list}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>- Nom :{item.nameColor} </Text>

                    </View>
                    <TouchableOpacity style={{
                        width: '90%', height: 40, backgroundColor: '#ee1c28', borderRadius: 10, alignItems: 'center',
                        justifyContent: 'center', marginTop: 10,
                        marginBottom: 30
                    }} onPress={() => {
                        disptach(showCustomModal());
                        disptach({
                            type: 'UPDATE_COLOR',
                            payload: item.refColor
                        })
                    }}>
                        <Text style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: '#FFF',
                            fontWeight: 'bold'
                        }}>Ajouter comme projet </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default DetailsCouleurs

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    img: {
        width: Dimensions.get('screen').width,
        height: 300,
        resizeMode: 'cover',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,

    },
    bottomCard: {
        height: '65%',
        width: '100%',
        position: 'absolute',
        zIndex: 999,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFF',

        bottom: 0,
        flex: 1,
        alignContent: "center",
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: 'blue',
        fontWeight: 'bold',
        marginTop: 10

    },
    list: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        marginLeft: 50
    }
})
