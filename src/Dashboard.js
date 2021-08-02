import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Compass } from './Compass';
import { GpsStatus } from './GpsStatus';
import { Speedometer } from './Speedometer';

export function Dashboard() {

    return (
        <View style={styles.container}>
            <View style={styles.stats}>
                <GpsStatus />
                <Compass />
            </View>
            <Speedometer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    stats: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});