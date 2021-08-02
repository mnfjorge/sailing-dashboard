import { hasServicesEnabledAsync } from 'expo-location';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function GpsStatus() {
    const [gpsEnabled, setGpsEnabled] = React.useState(false);

    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            const enabled = await hasServicesEnabledAsync();
            setGpsEnabled(enabled);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Text style={gpsEnabled ? textStatus.textOn : textStatus.textOff}>{gpsEnabled ? 'GPS ON' : 'GPS ON'}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    }
});

const textStatus = StyleSheet.create({
    textOff: {
        ...styles.text,
        color: '#f04848'
    },
    textOn: {
        ...styles.text,
        color: '#48f075',
    }
});