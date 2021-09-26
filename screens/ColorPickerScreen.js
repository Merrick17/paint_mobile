import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageColors from 'react-native-image-colors'
import { NavBar, Button, Input } from 'galio-framework';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Entypo';
const yunaUrl = 'https://i.imgur.com/68jyjZT.jpg'
const catUrl = 'https://i.imgur.com/O3XSdU7.jpg'
const catImg = 'https://i.imgur.com/O3XSdU7.jpg';

const initialState = {
    colorOne: { value: '', name: '' },
    colorTwo: { value: '', name: '' },
    colorThree: { value: '', name: '' },
    colorFour: { value: '', name: '' },
    rawResult: '',
}
import { GlobalStyles } from '../styles/global'
const ColorPicker = ({ navigation,route }) => {
    const [colors, setColors] = useState(initialState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchColors = async () => {
            const result = await ImageColors.getColors(route.params.img, {
                fallback: '#000000',
                quality: 'low',
                pixelSpacing: 5,
                cache: true,
            })

            switch (result.platform) {
                case 'android':
                case 'web':
                    setColors({
                        colorOne: { value: result.lightVibrant, name: 'lightVibrant' },
                        colorTwo: { value: result.dominant, name: 'dominant' },
                        colorThree: { value: result.vibrant, name: 'vibrant' },
                        colorFour: { value: result.darkVibrant, name: 'darkVibrant' },
                        rawResult: JSON.stringify(result),
                    })
                    break
                case 'ios':
                    setColors({
                        colorOne: { value: result.background, name: 'background' },
                        colorTwo: { value: result.detail, name: 'detail' },
                        colorThree: { value: result.primary, name: 'primary' },
                        colorFour: { value: result.secondary, name: 'secondary' },
                        rawResult: JSON.stringify(result),
                    })
                    break
                default:
                    throw new Error('Unexpected platform')
            }

            setLoading(false)
        }

        fetchColors()
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        )
    }

    return (



        <View style={styles.container}>
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
                            navigation.openDrawer();
                        }}
                    />
                }
                right={<FeatherIcon name="map-pin" style={GlobalStyles.iconStyle} onPress={() => {
                    navigation.navigate('Map');
                }} />}
            />
            <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: route.params.img }}
            />
            <View style={styles.row}>
                <Box name={""} value={colors.colorOne.value} />
                <Box name={colors.colorTwo.name} value={colors.colorTwo.value} />
            </View>
            <View style={styles.row}>
                <Box name={""} value={colors.colorThree.value} />
                <Box name={""} value={colors.colorFour.value} />
            </View>

        </View>

    )
}

const Box = (props) => {
    return (
        <View
            style={[
                styles.box,
                {
                    backgroundColor: props.value,
                },
            ]}
        >
            {/* <Text style={styles.colorName}>{props.name}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '50%',
    },
    colorName: {
        backgroundColor: 'white',
        padding: 4,
        fontSize: 18,
    },
    box: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    resultContainer: {
        flex: 1,
        padding: 20,
        width: Platform.select({
            web: 'fill-available',
            ios: '100%',
            android: '100%',
        }),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    result: {
        textAlign: 'center',
        color: '#333333',
    },
})
export default ColorPicker;