import React from 'react';
import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { colors } from '../config';
import RadioGroup from './RadioGroup';

const halfWidth = -Dimensions.get('window').width / 2;

const Toolbar = ({ visible, animate, settings, activeSettings, onSettingsSet }) => {
  const target = visible ? 0 : halfWidth;

  const moveAnim = useRef(
    new Animated.Value((visible || !animate) ? halfWidth : 0)
  ).current;
  useEffect(() => {
    if (animate) {
      Animated.spring(moveAnim, {
        toValue: target,
        velocity: 10,
        tension: 40,
        friction: 10,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  const onChange = (title, value) => {
    onSettingsSet(title, value);
  };

  return (
    <Animated.View
      style={{ ...styles.toolbar, transform: [{ translateX: moveAnim }] }}
    >
      <ScrollView style={styles.scrollContainer}>
        {Object.entries(settings).map(([title, vals]) => (
          <RadioGroup
            key={title + JSON.stringify(vals)}
            title={title}
            data={vals}
            chosen={activeSettings[title]}
            onChange={onChange}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    paddingVertical: 50,
    position: 'absolute',
    zIndex: 10,
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: colors.dark,
    opacity: 0.8
  },
  scrollContainer: {
    height: '80%'
  }
});
