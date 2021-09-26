import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../screens/DrawerContent';
import SettingsScreen from '../screens/SettingsScreen';
import MainScreen from '../screens/MainScreen';
import CartScreen from '../screens/CartScreen';
import ProductScreen from '../screens/ProductScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TendanceDetails from '../screens/TendanceDetails';
import FilterScreen from '../screens/FilterScreen';
import ColorsScreen from '../screens/ColorsScreen';
import DetailsProducts from '../screens/DetailsProducts';
import DetailsCouleurs from '../screens/DetailsCouleurs';
import MarketScreen from '../screens/MarketScreen';
import ProjectScreen from '../screens/ProjectScreen';
import DevisScreen from '../screens/DevisScreen';
import DevisMailScreen from '../screens/DevisMailScreen';
import ColorPicker from '../screens/ColorPickerScreen';
import AboutScreen from '../screens/AboutScreen';
const Drawer = createDrawerNavigator();
const TendancesStack = createStackNavigator();
const Tendances = () => {
  return (
    <TendancesStack.Navigator initialRouteName="Main" headerMode="none">
      <TendancesStack.Screen name="Main" component={MainScreen} />
      <TendancesStack.Screen name="Details" component={TendanceDetails} />
      <TendancesStack.Screen name="Filtre" component={FilterScreen} />
      <TendancesStack.Screen name="ProductDetails" component={DetailsProducts} />
      <TendancesStack.Screen name="ColorDetails" component={DetailsCouleurs} />
      <TendancesStack.Screen name="Map" component={MarketScreen} />
      <TendancesStack.Screen name="ColorPicker" component={ColorPicker} />

    </TendancesStack.Navigator>
  );
};
const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerContent={props => <DrawerContent {...props} />}
      independent={true}>
      <Drawer.Screen name="Accueil" component={Tendances} />
      <Drawer.Screen name="Panier" component={CartScreen} />
      <Drawer.Screen name="Profile" component={SettingsScreen} />
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="Colors" component={ColorsScreen} />
      <Drawer.Screen name="Project" component={ProjectScreen} />
      <Drawer.Screen name="Devis" component={DevisMailScreen} />
      <Drawer.Screen name="Estim" component={DevisScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />

    </Drawer.Navigator>
  );
};

export default DrawerContainer;

const styles = StyleSheet.create({});
