import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const PointBetweenNumbers = ({ min, max, avg }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    console.log('avg',parseInt(avg));
    setValue(parseInt(avg))
  }, [min,max])
  

  return (
    <View style={{flexDirection:'row',justifyContent:'space-around',paddingHorizontal:20,marginTop:20}}>
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
       <Text>52-WL</Text>
       <Text style={{fontWeight:'bold'}}>{min}</Text>
       </View>

    <View style={styles.container}>
      <Text style={styles.text}>Current price: {value}</Text>
      <Slider
        style={{ width: 220, height: 40 }}
        minimumValue={min}
        maximumValue={max}
        value={parseInt(value)}
        onValueChange={setValue}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
    </View>

    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
       <Text>52-WH</Text>
       <Text style={{fontWeight:'bold'}}>{max}</Text>
       </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
  },
});

export default PointBetweenNumbers;
