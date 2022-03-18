import React, {useEffect, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addProjectApi} from '../store/projects/actions';
//
const FilterScreen = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.authReducer);
  const getName = path => {
    if (path) {
      let index = path.lastIndexOf('/');
      let name = path.substring(index, path.length);
      return name;
    } else {
      return '';
    }
  };
  useEffect(() => {
    console.log('Params', route.params.img);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={{
            uri: route.params.img,
          }}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            resizeMode: 'contain',

            zIndex: 1,
            position: 'absolute',
          }}
        />
        <RNSketchCanvas
          containerStyle={{backgroundColor: 'transparent', flex: 1, zIndex: 2}}
          canvasStyle={{backgroundColor: 'transparent', flex: 1}}
          defaultStrokeIndex={0}
          defaultStrokeWidth={100}
          closeComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>Fermer</Text>
            </View>
          }
          undoComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>Annuler</Text>
            </View>
          }
          clearComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>{`Annuler \n tous`}</Text>
            </View>
          }
          eraseComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>Effacer</Text>
            </View>
          }
          strokeComponent={color => (
            <View
              style={[{backgroundColor: color}, styles.strokeColorButton]}
            />
          )}
          strokeSelectedComponent={(color, index, changed) => {
            return (
              <View
                style={[
                  {backgroundColor: color, borderWidth: 2},
                  styles.strokeColorButton,
                ]}
              />
            );
          }}
          strokeWidthComponent={w => {
            return (
              <View style={styles.strokeWidthButton}>
                <View
                  style={{
                    backgroundColor: 'white',
                    marginHorizontal: 2.5,
                    width: Math.sqrt(w / 3) * 10,
                    height: Math.sqrt(w / 3) * 10,
                    borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                  }}
                />
              </View>
            );
          }}
          saveComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}> projet</Text>
            </View>
          }
          savePreference={() => {
            console.log('Save');
            let img = {
              folder: 'RNSketchCanvas',
              filename: String(Math.ceil(Math.random() * 100000000)),
              transparent: false,
              imageType: 'png',
            };
            setImage(img);
            return img;
          }}
          onSketchSaved={(result, path) => {
            console.log('RESULT', route.params.img);
            console.log(path);
            let background = {
              uri: route.params.img, // e.g. 'file:///path/to/file/image123.jpg'
              name: getName(route.params.img), // e.g. 'image123.jpg',
              type: 'image/jpg',
            };
            let image = {
              uri: path,
              name: getName(path),
              type: 'image/png',
            };
            let formData = new FormData();
            formData.append('image', image);
            formData.append('background', background);
            formData.append(
              'nameProject',
              `new_project${Date.now().toString()}`,
            );
            formData.append('owner', user._id);
            console.log('FORM DATA', formData);
            dispatch(addProjectApi(formData));
            Alert.alert('Success', 'Votre projét à été enregistrer', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.pop();
                },
              },
            ]);
          }}
        />
      </View>
    </View>
  );
};
export default FilterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
