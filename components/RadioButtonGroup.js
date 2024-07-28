import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const RadioButtonGroup = ({value,changeValue}) => {

  return (
    <View style={styles.container}>
     <View style={styles.radioButtonContainer}>
        <RadioButton
          value="I"
          status={value === 'I' ? 'checked' : 'unchecked'}
          onPress={() => changeValue('I')}
          color="#1EB1FC"
        />
        <Text style={styles.radioButtonText}>I</Text>
      </View>
    
     <View style={styles.radioButtonContainer}>
        <RadioButton
          value="D"
          status={value === 'D' ? 'checked' : 'unchecked'}
          onPress={() => changeValue('D')}
          color="#1EB1FC"
        />
        <Text style={styles.radioButtonText}>D</Text>
      </View>

      <View style={styles.radioButtonContainer}>
        <RadioButton
          value="W"
          status={value === 'W' ? 'checked' : 'unchecked'}
          onPress={() => changeValue('W')}
          color="#1EB1FC"
        />
        <Text style={styles.radioButtonText}>W</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <RadioButton
          value="M"
          status={value === 'M' ? 'checked' : 'unchecked'}
          onPress={() => changeValue('M')}
          color="#1EB1FC"
        />
        <Text style={styles.radioButtonText}>M</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    fontSize: 18,
  },
});

export default RadioButtonGroup;
