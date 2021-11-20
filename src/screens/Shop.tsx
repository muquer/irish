import { useNavigation } from '@react-navigation/core';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet,} from 'react-native';
import {  Text,  View,  Button,  Colors,  Typography,  Card, Slider, Toast} from 'react-native-ui-lib';
import { IrisVariety, OrderType } from '../../types/types';
import BaseColors from '../../constants/Colors'
import { apiContext } from '../context/APIContext';
import API from '../../constants/API';


const ButtonSpace = 20;
const INITIAL_VALUE = 0;
const COLOR = Colors.blue30;


const ShopScreen  = () => {

  const navigation = useNavigation()
    
  const sepalL = useRef()
  const sepalW = useRef()
  const petalL = useRef()
  const petalW = useRef()


  const [sepalLV, onSepalLChange] = useState<number>(0)
  const [sepalWV, onSepalWChange] = useState<number>(0)

  const [petalLV, onPetalLChange] = useState<number>(0)
  const [petalWV, onPetalWChange] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | undefined>()
  const [showErrorMessage, setShowErrorMessage] = useState<string | undefined>()
  const { getIrisClass} = useContext(apiContext)

    useEffect(()=>{
      setTimeout(() => {
        setShowErrorMessage(undefined)
        setShowSuccessMessage(undefined)
      }, 10000);
    },[showErrorMessage,showSuccessMessage])

    const purchaseConfirmation = (value:OrderType | undefined)  =>{
      setIsLoading(false)
      if(value){
        setShowSuccessMessage(`Your ${value.productName} order is on its way!`)
      }else{
        setShowErrorMessage('There was an error processing your request. Please try again later.')
      }
    }

    const onFeaturesSelect = () =>{
      setIsLoading(true)
      let postdata = {
        "petal.length": petalLV, 
        "petal.width":petalWV,
        "sepal.length": sepalLV, 
        "sepal.width": sepalWV

      }

      getIrisClass(postdata)
      .then(response => response.json())
      .then(data => {
        if(data.data["class"]){
          navigation.navigate("Checkout", {onGoBack : purchaseConfirmation, irisClass : data.data["class"]})
        }else{
          setShowErrorMessage('There was an error processing your request. Please try again later.')  
        }
        setIsLoading(false)
       })
      .catch(err => {
        setIsLoading(false)
        setShowErrorMessage('There was an error processing your request. Please try again later.')   
      });
      
     
    }
  
    return (
      
      <View style={styles.container}>
        <View centerH paddingV-20>
          <Text center style={styles.title}>Please select the desired {<Text color={BaseColors.base.highlight}>Iris flower</Text>} characteristics</Text>
        </View>
        
      <View bg-grey70>
          <View style={styles.sliderView}>
          <Text bodySmall grey30 style={styles.sliderText}>{`Sepal length ${sepalLV.toPrecision(2)}`}</Text>
              <View row centerH>
                  <Slider
                      ref={sepalL}
                      onSeekEnd={()=>{
                        //@ts-expect-error
                        onSepalLChange((sepalL.current.lastValue*.1))
                      }}
                      value={INITIAL_VALUE}
                      minimumValue={0} 
                      maximumValue={80} 
                      step={1} 
                      containerStyle={styles.sliderContainer}
                  />
              </View>
          </View>
          <View style={styles.sliderView}>
            <Text bodySmall grey30 style={styles.sliderText}>{`Sepal width ${sepalWV.toPrecision(2)}`}</Text>
              <View row centerH>
                  <Slider
                      ref={sepalW}
                      onSeekEnd={()=>{
                        //@ts-expect-error
                        onSepalWChange((sepalW.current.lastValue*.1))
                      }}
                      value={INITIAL_VALUE}
                      minimumValue={0} 
                      maximumValue={80} 
                      step={1} 
                      containerStyle={styles.sliderContainer}
                  />
              </View>
          </View>
          <View style={styles.sliderView}>
              <Text bodySmall grey30 style={styles.sliderText}>{`Petal length ${(petalLV).toPrecision(2)}`}</Text>
              <View row centerH>
                  <Slider
                      ref={petalL}
                      onSeekEnd={()=>{
                        //@ts-expect-error
                        onPetalLChange((petalL.current.lastValue*.1))
                      }}
                      value={INITIAL_VALUE}
                      minimumValue={0} 
                      maximumValue={80} 
                      step={1} 
                      containerStyle={styles.sliderContainer}
                  />
              </View>
          </View>
          <View style={styles.sliderView}>
          <Text bodySmall grey30 style={styles.sliderText}>{`Petal width ${(petalWV).toPrecision(2)}`}</Text>
              <View row centerH>
                  <Slider
                      ref={petalW}
                      onSeekEnd={()=>{
                        //@ts-expect-error
                        onPetalWChange((petalW.current.lastValue*.1))
                      }}
                      value={INITIAL_VALUE}
                      minimumValue={0} 
                      maximumValue={80} 
                      step={1} 
                      containerStyle={styles.sliderContainer}
                  />
              </View>
          </View>
          <View marginV-20 style={{width:'100%'}} centerH>
                  <Button
                  label={'Confirm choice'}
                  style={{marginBottom: ButtonSpace}}
                  onPress={onFeaturesSelect}
                  disabled={isLoading}
                  >
                    {isLoading && <ActivityIndicator size={"small"} color={"white"}/>}
                  </Button>
          </View>

      </View>
      <Toast
        visible={showErrorMessage !== undefined}
        position={'top'}
        backgroundColor={'rgba(214,0,0,.8)'}
        message={showErrorMessage}
      />
       <Toast
        visible={showSuccessMessage !== undefined}
        position={'top'}
        backgroundColor={'rgba(82,255,82,.8)'}
        message={showSuccessMessage}
      />
  </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    ...Typography.text50
  },
  header: {
    ...Typography.text60,
    marginVertical: 20
  },
  text: {
    width: 40
  },
  sliderView:{
    marginVertical:5,
    marginHorizontal:'10%',
    borderTopColor: Colors.grey30
  },
  sliderText: {
    marginHorizontal:'10%',
    width: 200,
  },
  slider: {
    marginVertical: 6
  },
  sliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!

  },
});




export default ShopScreen
