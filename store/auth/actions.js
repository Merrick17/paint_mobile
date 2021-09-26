import {saveItem} from '../../helpers/storage';
import {hideSpinner, showSpinner} from '../spinner/actions';
import {View, StyleSheet, Button, Alert} from 'react-native';
import {post} from '../../helpers/apiHelpers';
export const loginUser = data => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};

export const logoutUser = data => {
  return {
    type: 'LOGOUT',
    data: data,
  };
};

export const loginUserApi = (data, navigation) => async disptach => {
  try {
    disptach(showSpinner());
    let result = await post('users/login', data);
    disptach(hideSpinner());
    if (result.success) {
      saveItem('token', result.token);
      disptach(loginUser(result));
      navigation.replace('Main')
      console.log(result);
    } else {
      Alert.alert('Erreur', 'Adresse ou mot de passe incorrecte', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  } catch (error) {}
};
export const registerUser = (data, navigation) => async disptach => {
  try {
    disptach(showSpinner());
    let result = await post('users/register', data);
    disptach(hideSpinner());
    if (result.success) {
      Alert.alert(
        'Success',
        'Inscription effectuer avec succés . veuillez vous connecter',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('Login');
            },
          },
        ],
      );
    } else {
      Alert.alert('Erreur', result.message, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
    console.log(result);
  } catch (error) {}
};
