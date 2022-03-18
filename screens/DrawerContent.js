import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme, Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllCategories } from '../store/categories/actions';
import { setCategory } from '../store/selectedCategory/actions';
import { fetchProductsByCateg } from '../store/products/actions';
const DrawerContent = props => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentState = useSelector(state => state);
  useEffect(() => {

    //console.log(currentState);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Image source={require('../assets/imgs/mca.png')} style={{resizeMode:'contain',width:230}}/>

            </View>
          </View>
          <Drawer.Section style={styles.drawerSection} title="PARAMETRES">
            <DrawerItem label="Accueil" onPress={() => {
              props.navigation.navigate('Accueil')
            }} />
            <DrawerItem label="Mes projets" onPress={() => {
              props.navigation.navigate('Project')
            }} />
            
            
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection} title="MCA+">
            <DrawerItem label="A PROPOS" onPress={() => {
              console.log("cc")
              props.navigation.navigate('About')
            }} />
            <DrawerItem label="Produits" onPress={() => {
              console.log("cc")
              props.navigation.navigate('Product')
            }} />
            <DrawerItem label="Couleurs" onPress={() => {
              console.log("cc")
              props.navigation.navigate('Colors')
            }} />
            <DrawerItem label="Estimation" onPress={() => {
              props.navigation.navigate('Estim')
            }} />
            <DrawerItem label="Devis" onPress={() => {
              props.navigation.navigate('Devis')
            }} />
           
          </Drawer.Section>
          <Drawer.Section>
          <DrawerItem label="Deconnexion" />
            </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
export default DrawerContent;
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
