import React from 'react';
import styled, {css} from 'styled-components/native';

const Button = ({title, onPress, disabled}) => {
  return (
    <StyledTouchableOpacity disabled={disabled} onPress={onPress}>
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: hsl(280, 87%, 65%);
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  flex: 1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  ${props =>
    props.disabled &&
    css`
      background-color: #dddddd;
    `}
`;

const StyledText = styled.Text`
  color: white;
  padding-left: 5px;
  font-family: 'JosefinSans-Bold';
  font-size: 15px;
`;

export default Button;
