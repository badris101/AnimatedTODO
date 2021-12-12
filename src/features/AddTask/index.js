import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
// import Moon from '../../assets/Moon';
import Button from '../../ui-kit/Button';

const image = require('../../assets/bg-mobile-light.jpg');

const AddTask = ({value, tasks, setValue, setTasks}) => {
  return (
    <ImageBackground source={image} resizeMode="cover">
      <Header>
        <Ttile>TODO</Ttile>
        {/* <Moon /> */}
      </Header>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <StyledTextInput
          value={value}
          onChangeText={setValue}
          placeholder="Create new Todo"
        />
        <Button
          title="Add Task"
          onPress={() => {
            setTasks([
              {title: value, checked: false, id: tasks.length + 1},
              ...tasks,
            ]);
            setValue('');
          }}
          disabled={value === ''}
        />
      </View>
    </ImageBackground>
  );
};

const ImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 0 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Ttile = styled.Text`
  font-family: 'JosefinSans-Bold';
  font-size: 35px;
  color: white;
  letter-spacing: 15px;
`;

const StyledTextInput = styled.TextInput`
  height: 45px;
  flex: 3;
  background-color: white;
  padding-left: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-family: 'JosefinSans-Regular';
`;

export default AddTask;
