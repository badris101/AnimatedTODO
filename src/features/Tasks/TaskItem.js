import React from 'react';
import Animated, {
  SlideInLeft,
  Layout,
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Dimensions} from 'react-native';

const boundry = 100;
const TRANSLATE_LIMIT = -120;
const LIST_ITEM_HEIGHT = 58;
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const TaskItem = ({
  id,
  title,
  checked,
  handleStatus,
  removeTask,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const width = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const opacity = useSharedValue(1);

  const handleGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      if (event.translationX < 0 && event.translationX > TRANSLATE_LIMIT) {
        translateX.value = event.translationX;
        width.value = Math.abs(event.translationX);
      }
    },
    onEnd: () => {
      const isDismissed = translateX.value < -boundry;
      if (isDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            runOnJS(removeTask)(id);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const gestureStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: opacity.value,
    };
  });

  const deleteStyle = useAnimatedStyle(() => ({
    width: withSpring(width.value),
  }));

  const deleteTextStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < -boundry ? 1 : 0),
  }));

  return (
    <Animated.View style={[rTaskContainerStyle]}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            backgroundColor: 'rgba(255, 0, 0, .5)',
            right: 0,
            height: LIST_ITEM_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
          },
          deleteStyle,
        ]}>
        <Animated.Text style={[{color: 'white'}, deleteTextStyle]}>
          Delete
        </Animated.Text>
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={handleGestureEvent}>
        <Animated.View
          entering={SlideInLeft.delay(id * 100)}
          layout={Layout.springify()}
          style={[{backgroundColor: 'white'}, gestureStyle]}>
          <BouncyCheckbox
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            style={{
              padding: 16,
              borderBottomColor: 'hsl(236, 33%, 92%)',
              borderBottomWidth: 1,
            }}
            isChecked={checked}
            text={title}
            fillColor="hsl(280, 87%, 65%)"
            disableBuiltInState
            onPress={() => handleStatus(id)}
          />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default TaskItem;
