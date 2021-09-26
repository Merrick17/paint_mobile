import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {GlobalStyles} from '../styles/global';
import {Input, theme, Button} from 'galio-framework';
import {useDispatch} from 'react-redux';
import {registerUser} from '../store/auth/actions';
import Spinner from 'react-native-loading-spinner-overlay';
const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [adr, setAdr] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passError, setPassError] = useState(false);
  const dispatch = useDispatch();
  const state = useState(state => state);
  return (
    <View style={GlobalStyles.loginScreen}>
      <Spinner
        visible={state.spinnerReducer}
        textContent={'Veuillez Patienter...'}
        textStyle={{
          color: '#FFF',
        }}
      />
      <ScrollView>
        <Image
          source={require('../assets/imgs/logo.png')}
          style={{
            height: 120,
            width: 180,
            alignSelf: 'center',
            marginTop: 10,
            resizeMode: 'contain',
          }}
        />
        <View style={styles.bottomCard}>
          <View style={styles.content}>
            <Text style={GlobalStyles.label}>Inscription</Text>
            <Text style={GlobalStyles.InputLabel}>Nom </Text>
            <Input
              placeholder="Exemple "
              style={GlobalStyles.inputItem}
              bgColor={'#EEEEEE'}
              borderless={true}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
              }}
            />
            <Text style={GlobalStyles.InputLabel}>Prénom</Text>
            <Input
              placeholder="Exemple "
              style={GlobalStyles.inputItem}
              bgColor={'#EEEEEE'}
              borderless={true}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
              }}
            />
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
            <Text style={GlobalStyles.InputLabel}>Adresse</Text>
            <Input
              placeholder="Exemple"
              style={GlobalStyles.inputItem}
              bgColor={'#EEEEEE'}
              borderless={true}
              value={adr}
              onChangeText={text => {
                setAdr(text);
              }}
            />
            <Text style={GlobalStyles.InputLabel}>Téléphone</Text>
            <Input
              placeholder="mail@example.com"
              style={GlobalStyles.inputItem}
              bgColor={'#EEEEEE'}
              borderless={true}
              onChangeText={text => {
                setPhone(text);

                if (
                  phone.length != 8 &&
                  Number.isInteger(Number(phone)) == false
                ) {
                  setPhoneError(true);
                } else {
                  setPhoneError(false);
                }
              }}
              value={phone}
            />
            <Text style={GlobalStyles.errorLabel}>
              {phoneError ? 'Veuillez saisir un numéro valide' : ''}
            </Text>
            <Text style={GlobalStyles.InputLabel}>Mot de passe</Text>
            <Input
              placeholder="**************"
              style={GlobalStyles.inputItem}
              bgColor={'#EEEEEE'}
              borderless={true}
              password
              viewPass
              onChangeText={text => {
                setPassword(text);

                if (password.length < 8) {
                  setPassError(true);
                } else {
                  setPassError(false);
                }
              }}
              value={password}
            />
            <Text style={GlobalStyles.errorLabel}>
              {passError ? 'votre mot de passe doit avoir 8 caractères' : ''}
            </Text>
            <Button
              color="#ee1c28"
              style={GlobalStyles.BtnStyle}
              onPress={() => {
                let newUser = {
                  email: email,
                  userPassword: password,
                  name: lastName,
                  firstName: firstName,
                  address: adr,
                  phoneNumber: phone,
                  role: 'USER',
                };
                if (
                  email == '' ||
                  password == '' ||
                  firstName == '' ||
                  adr == '' ||
                  phone == '' ||
                  lastName == ''
                ) {
                  Alert.alert(
                    'Erreur',
                    'Veuillez remplir les champs !',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                } else {
                  dispatch(registerUser(newUser, navigation));
                }
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'poppins_bold',
                }}>
                Inscrivez vous
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  bottomCard: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.9,
    width: Dimensions.get('window').width,
    //position: 'fixed',
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
