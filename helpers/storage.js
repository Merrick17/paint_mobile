import AsyncStorage from '@react-native-community/async-storage';

export const saveItem = async (name, item) => {
  console.log('Name ', name);
  console.log('Iteem', item);
  try {
    let result = await AsyncStorage.setItem(
      name.toString(),
      JSON.stringify(item),
    );
  } catch (e) {
    console.log(e);
  }
};

export const getSavedItem = async name => {
  let result = await AsyncStorage.getItem(name);
  console.log('My Result', result);
  return result;
};
