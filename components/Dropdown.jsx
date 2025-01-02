import React from 'react';
import { Picker } from 'react-native';

const Dropdown = ({ selectedValue, onValueChange, items }) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {items.map((item) => (
        <Picker.Item label={item.name} value={item.id} key={item.id} />
      ))}
    </Picker>
  );
};

export default Dropdown;
