import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityType, LocationAccuracy, startLocationUpdatesAsync, stopLocationUpdatesAsync } from "expo-location";

const LAST_LOCATION_STORAGE_KEY = 'MNFJORGE_LAST_LOCATION_STORAGE_KEY';

async function storeLastLocation(value) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(LAST_LOCATION_STORAGE_KEY, jsonValue)
  } catch (e) {
    console.error('storeLastLocation', e);
  }
}

export async function getLastLocation() {
  try {
    const jsonValue = await AsyncStorage.getItem(LAST_LOCATION_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('getLastLocation', e);
  }
}

const LOCATION_LOG_STORAGE_KEY = 'MNFJORGE_LOCATION_LOG_STORAGE_KEY';

async function appendLocationLog(value) {
  try {
    const existingValue = await getLocationLog();
    const newValue = [...existingValue, ...value];
    const jsonValue = JSON.stringify(newValue)
    await AsyncStorage.setItem(LOCATION_LOG_STORAGE_KEY, jsonValue)
  } catch (e) {
    console.error('appendLocationLog', e);
  }
}

export async function getLocationLog() {
  try {
    const jsonValue = await AsyncStorage.getItem(LOCATION_LOG_STORAGE_KEY);
    const value = jsonValue != null ? JSON.parse(jsonValue) : [];
    if (!Array.isArray(value)) {
      return [];
    }
    return value;
  } catch (e) {
    console.error('getLocationLog', e);
  }
}

const LOCATION_TASK = 'MNFJORGE_LOCATION_TASK';
let LOCATION_SERVICE_ITERATION = 0;

TaskManager.defineTask(LOCATION_TASK, ({ data: { locations }, error }) => {
  if (error) {
    console.error('Location task', error.message, error);
    ToastAndroid.show('Location task failed', ToastAndroid.SHORT);
    return;
  }

  LOCATION_SERVICE_ITERATION++;
  console.log(LOCATION_SERVICE_ITERATION, 'Received new locations', locations);
  
  appendLocationLog(locations);

  const lastLocation = locations?.length > 0 ? locations[locations.length - 1] : null;
  if (lastLocation) {
    storeLastLocation({ ...lastLocation, iteration: LOCATION_SERVICE_ITERATION });
  }
});

export async function startLocationService() {
  startLocationUpdatesAsync(LOCATION_TASK, {
    accuracy: LocationAccuracy.BestForNavigation,
    distanceInterval: 1,
    activityType: ActivityType.OtherNavigation
  });
}

export async function stopLocationService() {
  stopLocationUpdatesAsync(LOCATION_TASK);
}
