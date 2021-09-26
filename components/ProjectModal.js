import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { Input, Button } from 'galio-framework'
import { GlobalStyles } from '../styles/global';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { post } from '../helpers/apiHelpers';
import { addProjectApi } from '../store/projects/actions';
const ProjectModal = () => {
    const state = useSelector((state) => state.CustomModal);
    const auth = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    return (

        <Modal isVisible={state.show}>
            <View style={{ flex: 1, height: 100, backgroundColor: '#FFF', alignSelf: 'center', borderRadius: 30, justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'column' }}>

                <Input
                    placeholder="Nom de Projet"
                    value={state.title}
                    style={GlobalStyles.inputItem}
                    bgColor={'#EEEEEE'}
                    borderless={true}
                    onChangeText={(text) => {
                        dispatch({
                            type: 'UPDATE_TITLE',
                            payload: text
                        })
                    }}
                />

                <Input
                    placeholder="Description"
                    value={state.desc}
                    style={GlobalStyles.inputItem}
                    bgColor={'#EEEEEE'}
                    borderless={true}
                    onChangeText={(text) => {
                        dispatch({
                            type: 'UPDATE_TEXT_DESC',
                            payload: text
                        })
                    }}
                />
                <View style={{ flexDirection: 'column' }}>
                    <Button
                        color="#ee1c28"
                        style={GlobalStyles.BtnStyle}
                        onPress={() => {
                            
                            let body = {
                                nameProject: state.title,
                                refColor: state.colorRef,
                                description: state.desc,
                                nameProduit: state.produit,
                                owner: auth.user._id
                            }
                            console.log("BODY",body) ; 
                            dispatch(addProjectApi(body));
                            dispatch({
                                type: 'SAVE_PROJECT'
                            })
                            dispatch({
                                type: 'HIDE_MODAL'
                            })
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'poppins_bold',
                            }}>
                            Ajouter
                        </Text>
                    </Button>
                    <Button
                        color="#ee1c28"
                        style={GlobalStyles.BtnStyle}
                        onPress={() => {
                           
                            dispatch({
                                type: 'HIDE_MODAL'
                            })
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'poppins_bold',
                            }}>
                            Annuler
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>

    )
}

export default ProjectModal

const styles = StyleSheet.create({})
