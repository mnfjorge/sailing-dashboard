import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { requestBackgroundPermissionsAsync } from 'expo-location';
import { Dashboard } from './Dashboard';
import { Logs } from './Logs';
import { Map } from './Map';
import { startLocationService, stopLocationService } from './services/locationService';

const Tabs = {
  Dashboard: 'Dashboard',
  Logs: 'Logs',
}

export default function App() {
  const [tab, setTab] = React.useState(Tabs.Dashboard);

  React.useEffect(() => {
    (async () => {
      let { status } = await requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Permission to access location was denied', ToastAndroid.LONG);
        return;
      }

      ToastAndroid.show('starting location service', ToastAndroid.SHORT);
      startLocationService();
    })();

    return () => {
      stopLocationService();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {tab === Tabs.Dashboard && <>
        <Dashboard />
        <Map />
      </>}
      {tab === Tabs.Logs && <>
        <Logs />
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#001357',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  }
});
