import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { APIProvider } from './src/context/APIContext';
import { ContactProvider } from './src/context/ContactContext';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { ContactInfo, IrisVariety, OrderType } from './types/types';
import API from './constants/API'
import { timeoutPromise } from './utils/functions';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [contactList, setContactList] = useState<ContactInfo[]>([])
  const getContactData = () => timeoutPromise(5000,fetch(`${API.API_URL}/contacts`, {method: 'GET'}))
  const storeContactData = (data: ContactInfo) => timeoutPromise(5000,fetch(`${API.API_URL}/contacts`, {method: 'POST',    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }))
  const getIrisClass = (data : IrisVariety) => timeoutPromise(5000,fetch(`${API.API_URL}/classify-iris`, {method: 'POST',    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }))
  const submitIrisOrder = (data :OrderType) => timeoutPromise(5000,fetch(`${API.API_URL}/order`, {method: 'POST',    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }))

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <APIProvider value={{getContactData, storeContactData, getIrisClass, submitIrisOrder}}>
          <ContactProvider value={{contactList, setContactList}}>
            <Navigation colorScheme={colorScheme} />
              <StatusBar />
          </ContactProvider>
        </APIProvider>
      </SafeAreaProvider>
    );
  }
}
