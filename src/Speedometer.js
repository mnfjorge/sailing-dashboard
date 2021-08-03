import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLastLocation, getLocationLog } from './services/locationService';
import { convertMsToKnots } from './utils/convertMsToKnots';

export function Speedometer() {
    const [speed, setSpeed] = React.useState(null);
    const [avgSpeed, setAvgSpeed] = React.useState(null);
    const [topSpeed, setTopSpeed] = React.useState(null);

    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            const locations = await getLocationLog();

            const lastLocation = locations?.length > 0 ? locations[locations.length - 1] : null;
            setSpeed(lastLocation?.coords?.speed || null);

            const speeds = locations?.map((loc) => loc?.coords?.speed);
            setAvgSpeed(Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length));
            setTopSpeed(Math.round(speeds.reduce((a, b) => a > b ? a : b, 0)));
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={styles.text}>{typeof speed !== 'number' ? 'N/A' : Number.parseFloat(convertMsToKnots(speed)).toFixed(1)}</Text>
                <Text style={styles.label}>knots</Text>
            </View>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={styles.label}>Avg: {avgSpeed}kts</Text>
                <Text style={styles.label}>Top: {topSpeed}kts</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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