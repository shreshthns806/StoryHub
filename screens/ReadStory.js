import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
export default class ReadStoryScreen extends React.Component {
    render(){
      return(
        <View style = {{flex:1, backgroundColor:'black'}}>
          <Header
            backgroundColor={'black'}
            centerComponent={{
              text: 'Bed Time Stories',
              style: { color: '#fff', fontSize: 20 },
            }}
          />
          <Text style = {{color:'pink', alignSelf:'center'}}>Read Story Screen</Text>
        </View>
      )
    }
}  