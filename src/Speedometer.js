import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLastLocation } from './services/locationService';
import { convertMsToKnots } from './utils/convertMsToKnots';

export function Speedometer() {
    const [speed, setSpeed] = React.useState(null);

    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            const lastLocation = await getLastLocation();
            setSpeed(lastLocation?.coords?.speed || null);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{typeof speed !== 'number' ? 'N/A' : Number.parseFloat(convertMsToKnots(speed)).toFixed(1)}</Text>
            <Text style={styles.label}>knots</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        color: '#fff',
        fontSize: 120,
        fontWeight: 'bold',
    },
    label: {
        color: '#fff',
        fontSize: 20,
    }
});