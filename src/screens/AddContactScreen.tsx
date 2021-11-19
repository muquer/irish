import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Text, View, Button, Incubator} from 'react-native-ui-lib'; //eslint-disable-line
import { ContactInfo } from '../../types/types';
const {TextField} = Incubator;
import { RootStackScreenProps } from '../../types/navigationTypes';
import { apiContext } from '../context/APIContext';
import { useContext } from 'react';

export default function AddContactScreen({ navigation, route }: RootStackScreenProps<'AddContact'>) {
  
  const { storeContactData} = useContext(apiContext)
  const [name, setName] = React.useState<string>()
  const [address, setAddress] = React.useState<string>()
  const [zipcode, setZipcode] = React.useState<string>()
  const [city, setCity] = React.useState<string>()
  const [phoneNumber, setPhoneNumber] = React.useState<number>()
  const [errorMessage, setErrorMessage] = React.useState<string>()

  const onSubmit = () => {
    if(name && address && zipcode  && city && phoneNumber ){
      
      let cdata : ContactInfo = {
        id:`${Date.now()}`,
        name: name,
        address: address,
        zipcode: zipcode,
        city: city,
        phoneNumber: phoneNumber
      }

      storeContactData(cdata)
      .then(response => response.json())
      .then(data => {
        if(route.params.onGoBack)route.params.onGoBack(cdata)
        navigation.goBack()
      })
      .catch(err => {
        setErrorMessage('There was an error connecting to the registration service.')
      });
      
    }else{
      setErrorMessage('An error has occurred. Please verify your inputs.')
    }


  }

  return (
    <View style={styles.container} centerH>
      
          <View row bottom>
            <TextField
              placeholder="Name"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.grey10,
                default: Colors.grey30
              }}
              // floatingPlaceholderStyle={Typography.text60}
              // style={Typography.text60}
              value={name}
              containerStyle={{flex: 1, marginHorizontal:10}} 
              fieldStyle={styles.withUnderline}
              onChangeText={(value)=>setName(value)}
            />
            <TextField
              placeholder="Phone number"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.grey10,
                default: Colors.grey30
              }}
              // floatingPlaceholderStyle={Typography.text60}
              // style={Typography.text60}
              containerStyle={{flex: 1, marginHorizontal:10}} 
              fieldStyle={styles.withUnderline}
              value={`${phoneNumber || ''}`}
              onChangeText={(value)=>{
                let number = parseInt(value)
                if( number == NaN)return;
                setPhoneNumber(number)}}
            />
          </View>
          <View row bottom marginV-10>
            <TextField
              placeholder="Address"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.grey10,
                default: Colors.grey30
              }}
              // floatingPlaceholderStyle={Typography.text60}
              // style={Typography.text60}
              value={address}
              containerStyle={{flex: 1, marginHorizontal:10}} 
              fieldStyle={styles.withUnderline}
              onChangeText={(value)=>setAddress(value)}
            />
          </View>
          <View row bottom>
              <TextField
                placeholder="Zip code"
                floatingPlaceholder
                floatingPlaceholderColor={{
                  focus: Colors.grey10,
                  default: Colors.grey30
                }}
                // floatingPlaceholderStyle={Typography.text60}
                // style={Typography.text60}
                containerStyle={{flex: 1, marginHorizontal:10}} 
                fieldStyle={styles.withUnderline}
                onChangeText={(value)=>setZipcode(value)}
                value={zipcode}
              />
              <TextField
                placeholder="City"
                floatingPlaceholder
                floatingPlaceholderColor={{
                  focus: Colors.grey10,
                  default: Colors.grey30
                }}
                // floatingPlaceholderStyle={Typography.text60}
                // style={Typography.text60}
                containerStyle={{flex: 1, marginHorizontal:10}} 
                fieldStyle={styles.withUnderline}
                onChangeText={(value)=>setCity(value)}
                value={city}
              />
          </View>
          <View marginV-15 style={{width:'100%'}} centerH>
            <Text style={{color: Colors.red10, marginBottom:10}}>{errorMessage}</Text>
            <Button label="Submit" style={{width:'50%'}} onPress={onSubmit} />  
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
    withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4
  },
});
