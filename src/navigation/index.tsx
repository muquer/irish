import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/Shop';
import ContactsScreen from '../screens/ContactsScreen';
import AddContactScreen from '../screens/AddContactScreen';
import CheckoutScreen from '../screens/Checkout';
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddContact" component={AddContactScreen} options={{ title: 'New Contact' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator(){
  const colorScheme = useColorScheme();
  return(
    <Drawer.Navigator initialRouteName="Shop" screenOptions={
      {
        drawerActiveTintColor:'white',
        drawerActiveBackgroundColor:'#5A48F5',
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
        }
      }
    }>
        <Drawer.Screen name="Shop" component={ShopScreen} options={{ title: 'Shop' }} />
        <Drawer.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Contacts' }} />
    </Drawer.Navigator>
  )
}
