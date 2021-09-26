import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {GlobalStyles} from '../styles/global';
import {Input, theme, Button} from 'galio-framework';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserApi} from '../store/auth/actions';
import {showSpinner} from '../store/spinner/actions';
import Spinner from 'react-native-loading-spinner-overlay';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [email, setEmail] = useState('');
  const [psw, setPass] = useState('');
  const [showError, setShowError] = useState(false);

  return (
    <View style={GlobalStyles.loginScreen}>
      <Spinner
        visible={state.spinnerReducer}
        textContent={'Veuillez Patienter...'}
        textStyle={{
          color: '#FFF',
        }}
      />
      <Image
        source={require('../assets/imgs/logo.png')}
        style={{
          height: 250,
          width: 250,
          alignSelf: 'center',
          marginTop: 20,
          resizeMode: 'contain',
        }}
      />
      <View style={styles.bottomCard}>
        <View style={styles.content}>
          <Text style={GlobalStyles.label}>Se Connecter</Text>
          <Text style={GlobalStyles.InputLabel}>Email</Text>

          <Input
            placeholder="mail@example.com"
            style={GlobalStyles.inputItem}
            bgColor={'#EEEEEE'}
            borderless={true}
            onChangeText={text => {
              setEmail(text);
              let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (reg.test(email) === false) {
                setShowError(true);
              } else {
                setShowError(false);
              }
            }}
            value={email}
          />

          <Text style={GlobalStyles.errorLabel}>
            {showError ? 'Veuillez saisir une adresse email valide' : ''}
          </Text>

          <Text style={GlobalStyles.InputLabel}>Mot de passe</Text>
          <Input
            placeholder="**************"
            style={GlobalStyles.inputItem}
            bgColor={'#EEEEEE'}
            borderless={true}
            password
            viewPass
            value={psw}
            onChangeText={text => {
              setPass(text);
            }}
          />
          <Button
            color="#ee1c28"
            style={GlobalStyles.BtnStyle}
            onPress={() => {
              //props.navigation.replace('Main');
              let user = {
                email: email.trim(),
                password: psw,
              };
             
              dispatch(loginUserApi(user, navigation));
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'poppins_bold',
              }}>
              Se Connecter
            </Text>
          </Button>
          <View style={{marginVertical: 5}}>
            <Text
              style={{
                color: '#ee1c28',
                fontFamily: 'poppins_bold',
                alignSelf: 'center',
              }}>
              Vous n'avez pas un compte?
            </Text>
            <TouchableOpacity
              onPress={() => {
              navigation.navigate('Signup');
              }}>
              <Text
                style={{
                  color: '#ee1c28',
                  fontFamily: 'poppins_bold',
                  alignSelf: 'center',
                }}>
                Inscrivez vous
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomCard: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.55,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  content: {
    alignSelf: 'center',
    marginTop: 2,
  },
});
