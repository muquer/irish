import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Colors, Picker, Slider, Text, Typography, View } from 'react-native-ui-lib';
import { contactContext } from '../context/ContactContext';
import { RootStackScreenProps } from '../../types/navigationTypes';
import { CardImageType, ContactInfo, OrderType } from '../../types/types';
import { LogBox } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { UNIT_PRICE } from '../../constants/Shop';
import BaseColors from '../../constants/Colors'
import { apiContext } from '../context/APIContext';
LogBox.ignoreLogs([
  'UILib Picker.Item will stop supporting passing object as value & label (e.g {value, label}) in the next major version. Please pass separate label and value props',
, 'UILib Picker will stop supporting passing object as value in the next major version. Please use either string or a number as value']);
const cardImage : CardImageType = {Setosa :require('../../assets/images/iris/Setosa.jpg'), Virginica :require('../../assets/images/iris/Virginica.jpg'), Versicolor : require('../../assets/images/iris/Versicolor.jpg')};


const INITIAL_VALUE = 0;
export default function Checkout({ navigation, route }: RootStackScreenProps<'Checkout'>) {
  const sliderRef = useRef()
  const [slider, onSliderValueChange] = useState<number>(5.0)
  const { submitIrisOrder, getContactData} = useContext(apiContext)
  const {contactList, setContactList} = useContext(contactContext)
  const [selectedContact, setSelectedContact] = useState<ContactInfo | undefined>(contactList.length>0?contactList[0]:undefined)
  const [contactListError, setContactListError] = useState<boolean>(true)

  useEffect(()=>{
    if(contactList.length<=0){
      getContactData()
      .then(response => response.json())
      .then(data => {
          setContactList(data.data)
          setSelectedContact(data.data[0])
        })
      }
    },[])

  const renderAvatar = (size: number, name) =>{
    return <Avatar size={size} 
        label={name.match(/\b(\w)/g).join('').slice(0, 2)}
        backgroundColor = {Colors.yellow60}
        labelColor ={Colors.orange20}
      />
  }

  const confirmPurchase  = () => {
          if(slider <= 0 || selectedContact == undefined)return
          let pdata : OrderType = {
            quantity: slider,
            sendTo: selectedContact.id,
            productName: route.params.irisClass,
            productId: route.params.irisClass
   }
          
          submitIrisOrder(pdata)
          .then(response => response.json())
          .then(data => {
              if(route.params.onGoBack)route.params.onGoBack(pdata)
          })
          .catch(err => {
            if(route.params.onGoBack)route.params.onGoBack(undefined)
          });
          navigation.goBack()
  }  

  return (
    <View style={styles.container}>
      <View right style={{width:'100%'}} >
                  <Button
                    label={`${slider*UNIT_PRICE}€`}
                    style={{marginBottom: 20}}
                    onPress={()=>{}}
                    outline={true}
                    outlineColor={'#5A48F5'}
                    >
                    </Button>
      </View>
      <View marginV-10 centerH>
  
          <Card centerH
          selected={false}
          activeOpacity={1}
          >
          <Card.Section imageSource={cardImage[route.params.irisClass]} imageStyle={{height: 200}}/>
          </Card>
      </View>
            
      <Text style={styles.title}>Your {<Text color={BaseColors.base.highlight}>{route.params?.irisClass}</Text>} is ready!</Text>
      <View style={styles.sliderView}>
              <Text bodySmall grey30 style={styles.sliderText}>{`Quantity ${slider}`}</Text>
                <View row centerH style={{width:'100%'}}>
                    <Slider
                        ref={sliderRef}
                        //@ts-expect-error
                        onSeekEnd={()=>onSliderValueChange(sliderRef.current.lastValue)} 
                        value={INITIAL_VALUE}
                        minimumValue={0} 
                        maximumValue={100} 
                        step={1} 
                        containerStyle={styles.sliderContainer}
                    />
                </View>
        </View>
        <View>
          <View padding-10 centerH>
            <Text text70>
              Send to:
            </Text>
            {selectedContact? <Picker
              value={selectedContact}
              onChange={contact => setSelectedContact(contact)}
              renderPicker={contact => {
                return (
                  <View row centerH style={{width:'100%'}}>
                      {renderAvatar(30, contact.name)}
                    <Text text70 marginL-10>
                      {contact.name}
                    </Text>
                    <Ionicons name="md-chevron-down" size={24} color="black" />
                  </View>
                );
              }}
            >
              {contactList.map(contact => (
                <Picker.Item
                  key={contact.name}
                  value={contact}
                  renderItem={(item : ContactInfo, props) => (
                    <View
                      style={{
                        height: 56,
                        borderBottomWidth: 1,
                        borderColor: Colors.grey80
                      }}
                      paddingH-15
                      row
                      centerV
                      spread
                    >
                      <View row centerV>
                      {renderAvatar(35, item.name)}
                        <Text marginL-10 text70 grey10>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  )}
                  
                />
              ))}
            </Picker>:<View>{contactListError?<Text>Unable to load contacts. Please check your contacts.</Text>:<Text>Loading contacts...</Text>}</View>}
          </View>
          <View centerH paddingV-15 style={{borderTopColor:Colors.grey50, borderTopWidth:1}}>
                    <Button
                    label={'Purchase'}
                    style={{marginBottom: 20}}
                    onPress={confirmPurchase}
                    >
                        <Ionicons name="md-cart" size={24} color="white" />
                    </Button>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    ...Typography.text60,
    marginVertical: 20
  },  
  sliderView:{
    marginVertical:15,
    marginHorizontal:'10%',
    borderTopColor: Colors.grey30
  },
  sliderText: {
    marginHorizontal:'10%',
    width: 100,
  },
  slider: {
    marginVertical: 6
  },
  sliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
  },
});
