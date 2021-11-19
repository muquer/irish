import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  View,
  Button,
  Typography,
  Card,
  Colors
} from 'react-native-ui-lib'; //eslint-disable-line
import BaseColors from '../../constants/Colors'
const cardImage = require('../../assets/images/iris/irisx.jpg');

const ButtonSpace = 20;

const HomeScreen  = () => {
    const navigation = useNavigation()
    return (
        <View bg-grey70>
          
            <View marginV-30 centerH>
            <View>
              <Text style={styles.title}>Irish</Text>
            </View>

                <Card centerH
                height={400}
                selected={false}
                activeOpacity={1}
                >
                <Card.Section imageSource={cardImage} imageStyle={{height: '100%'}}/>
                </Card>
            </View>
            <View centerH>
                <Text style={styles.header}>Iris flower shop</Text>
                    <Button
                    label={'Explore'}
                    style={{marginBottom: ButtonSpace}}
                    onPress={()=>navigation.navigate("Main")}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25
  },
  title: {
    ...Typography.text20,
    marginVertical: 10,
    color: BaseColors.base.highlight
  },
  header: {
    ...Typography.text60,
    marginVertical: 10,
    color: Colors.grey20
  }
});

export default HomeScreen