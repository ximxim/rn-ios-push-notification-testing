/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import PushNotificationIOS, {
  PushNotification,
} from '@react-native-community/push-notification-ios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

interface IIOSLocationNotification {
  aps: {
    alert: {
      title: string;
      body: string;
    };
    tokens: string[];
  };
}

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    PushNotificationIOS.requestPermissions();

    if (Platform.OS !== 'ios' && !__DEV__) {
      return;
    }

    PushNotificationIOS.addEventListener(
      'localNotification',
      onRemoteNotification,
    );

    return () => PushNotificationIOS.removeEventListener('localNotification');
  }, []);

  const onRemoteNotification = (notification: PushNotification) => {
    const token = 'something'; // You would use some library to the push notification token like fcmToken or APNS
    const data = notification.getData() as IIOSLocationNotification;

    if (!token || !data.aps.tokens.length) {
      return;
    }

    Alert.alert(
      data.aps.tokens.includes(token)
        ? 'Yes, this notification is for you'
        : 'No, this notification is not for you',
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Trigger push notification (match)">
            <Text>
              Run <Text style={styles.highlight}>yarn notify:match</Text> on
              root director. This will trigger a notification that is meant for
              this device.
            </Text>
          </Section>
          <Section title="Trigger push notification (unmatch)">
            <Text>
              Run <Text style={styles.highlight}>yarn notify:unmatch</Text> on
              root director. This will trigger a notification that is NOT meant
              for this device.
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
