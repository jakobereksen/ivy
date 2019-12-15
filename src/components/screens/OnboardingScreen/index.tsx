import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import CarousselProgress from '../../common/CarouselProgress';

import Write from './assets/write.png';
import Prioritize from './assets/prioritize.png';
import Do from './assets/do.png';
import Remind from './assets/remind.png';
import PrimaryButton from '../../common/PrimaryButton';
import {NavigationStackScreenProps} from 'react-navigation-stack';

const OnboardingScreen = ({navigation}: NavigationStackScreenProps) => {
  const [progress, setProgress] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const progress = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
    );

    setProgress(progress);
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={Dimensions.get('window').width}
          decelerationRate={0.1}
          onScroll={onScroll}>
          <View style={styles.swipeable}>
            <Image source={Write} />
            <View>
              <Text style={styles.title}>Plan</Text>
              <Text style={styles.body}>
                Write down the six most important task for your next day.
              </Text>
            </View>
          </View>
          <View style={styles.swipeable}>
            <Image source={Prioritize} />
            <View>
              <Text style={styles.title}>Prioritize</Text>
              <Text style={styles.body}>
                Order your tasks by priority. Starting with the most important
                one at the top.
              </Text>
            </View>
          </View>
          <View style={styles.swipeable}>
            <Image source={Do} />
            <View>
              <Text style={styles.title}>Get things done</Text>
              <Text style={styles.body}>
                Complete your tasks. Only start with the next one after
                finnishing the first.
              </Text>
            </View>
          </View>
          <View style={styles.swipeable}>
            <Image source={Remind} />
            <View>
              <Text style={styles.title}>Habituate</Text>
              <Text style={styles.body}>
                Repeat this Method everyday and feel more productive. We will
                make it easier by reminding you.
              </Text>
            </View>
            <PrimaryButton
              onPress={() => {
                navigation.navigate('write');
              }}
              label="get started"
            />
          </View>
        </ScrollView>
        <View style={styles.progressContainer}>
          <CarousselProgress progress={progress} dotCount={4} />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  swipeable: {
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    padding: 30,
  },
  title: {fontFamily: 'OpenSans-Bold', fontSize: 18, textAlign: 'center'},
  body: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    paddingTop: 20,
    textAlign: 'center',
    lineHeight: 36,
  },
});

export default OnboardingScreen;
