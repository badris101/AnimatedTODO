import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Cross = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} {...props}>
    <Path
      fill="#494C6B"
      fillRule="evenodd"
      d="m16.97 0 .708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
    />
  </Svg>
);

export default Cross;
