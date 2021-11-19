import { useNavigation } from '@react-navigation/core';
import React, {Component, useEffect, useState, useRef, useContext, useReducer } from 'react';
import {StyleSheet, Alert, FlatList, Pressable} from 'react-native';
import {Colors, BorderRadiuses, View, Image, ListItem, Text, Avatar, Button, Toast} from 'react-native-ui-lib';
import Modal from 'react-native-modalbox';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import { ContactInfo } from '../../types/types';
import { contactContext } from '../context/ContactContext';
import { apiContext } from '../context/APIContext';
const plusIcon = require('../../assets/icons/plus.png');
const closeIcon = require('../../assets/icons/close.png');
const deleteIcon = require('../../assets/icons/delete.png');


export const ContactsScreen  = () => {
    const navigation = useNavigation()
    const {contactList, setContactList} = useContext(contactContext)
    const { getContactData, storeContactData} = useContext(apiContext)
    const [showSuccessMessage, setShowSuccessMessage] = useState<string | undefined>()
    const [showErrorMessage, setShowErrorMessage] = useState<string | undefined>()
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    let selectedContact : ContactInfo | undefined = undefined
    const modalRef = useRef();

    useEffect(()=>{
      setTimeout(() => {
        setShowErrorMessage(undefined)
        setShowSuccessMessage(undefined)
      }, 10000);
    },[showErrorMessage,showSuccessMessage])

    useEffect(()=>{
      refetch()
    },[])

    const keyExtractor = (item: ContactInfo) => item.name;

    const deleteContact = ()=>{
      if(!selectedContact)return
      
      storeContactData(selectedContact)
      .then(response => response.json())
      .then(data => {
        let index = contactList.findIndex(v => v.id === selectedContact.id)
        contactList.splice(index, 1);
        //@ts-expect-error
        modalRef.current.close()
        setContactList(contactList)
        forceUpdate()
        setShowSuccessMessage('Contact deleted successfully')
      })
      .catch(err => {
        setShowErrorMessage('There was an error processing the request')
      })

    }

    const refetch = ()=>{      
      getContactData()
      .then(response => response.json())
      .then(data => {
        setContactList(data.data)
      })
      .catch(err => {
        setShowErrorMessage('There was an error retrieving your contacts')
      });
    }

    const confirmNewContact = (value : ContactInfo | undefined) => {
      if(value){
        contactList.push(value)
        setContactList([...contactList])
        setShowSuccessMessage('Contact added successfully')
      }else{
        setShowErrorMessage('There was an error processing the request')
      }
    }

    function renderRow(row: ContactInfo, id: number) {
     const avatar = <Avatar containerStyle={{marginVertical: 5}}
     label={row.name.match(/\b(\w)/g).join('').slice(0, 2)}
     backgroundColor = {Colors.yellow60}
     labelColor ={Colors.orange20}
     onPress={() => {}}/>
    

    return (
      <View>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor={Colors.grey60}
          activeOpacity={0.3}
          height={77.5}
          
          onPress={() => {
            selectedContact = row
            //@ts-expect-error
            modalRef.current.open()}}
        >
          <ListItem.Part left>
            {avatar}
          </ListItem.Part>
          <ListItem.Part middle column containerStyle={{padding:17, borderBottomWidth: StyleSheet.hairlineWidth,
                                                            borderColor: Colors.grey70}}>
            <ListItem.Part containerStyle={{marginBottom: 3}}>
              <Text grey10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>
                {row.name}
              </Text>
              <Text grey10 text70 style={{marginTop: 2}}>
                {row.city}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>

      </View>
    );
  }

    return (
    <View> 
      <Modal ref={modalRef}
                animationType="fade"
                backButtonClose={true}
                backdrop={true}
                style={{backgroundColor:'transparent'}}
      >
             <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{position:"absolute", top:5, right:5}}>
              <Button iconSource={deleteIcon} outline={true} outlineColor={"red"} style={{width:60, height:40, backgroundColor:"transparent"}} onPress={deleteContact} />  
            </View>
            <Text style={styles.modalText}>Name</Text>
            <Text style={styles.modalText}>Phone number</Text>
            <Text style={styles.modalText}>Address</Text>
            <Text style={styles.modalText}>zip - City</Text>
          </View>
          <View style={{position:"absolute", zIndex:1, margin:5, bottom:40, right:10}}>
          <Button
                  label={'Back'}
                  iconSource={closeIcon}
                  style={{height:60}}
                  //@ts-expect-error
                  onPress={() => modalRef.current.close()}
                  />
          </View>
        </View>
    </Modal>  

        <View style={{position:"absolute", zIndex:1, margin:5, bottom:40, right:10}}>
            <Button label="Add" iconSource={plusIcon} style={{height:60}} onPress={()=>navigation.navigate("AddContact", {onGoBack: confirmNewContact})} />  
        </View>
        <View style={{minHeight:'100%'}}>
  
        <FlatList
            data={contactList}
            renderItem={({item, index}) => renderRow(item, index)}
            keyExtractor={keyExtractor}
        />
        </View>
        <Toast
          visible={showErrorMessage !== undefined}
          position={'top'}
          backgroundColor={'rgba(214,0,0,.8)'}
          message={showErrorMessage}
          autoDismiss={5000}
        />
         <Toast
          visible={showSuccessMessage !== undefined}
          position={'top'}
          backgroundColor={'rgba(82,255,82,.8)'}
          message={showSuccessMessage}
          autoDismiss={5000}
        />
      </View>

    );
  
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    minWidth:300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ContactsScreen