/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
