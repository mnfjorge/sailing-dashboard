import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Compass } from './Compass';
import { Distance } from './Distance';
import { GpsStatus } from './GpsStatus';
import { Speedometer } from './Speedometer';

export function Dashboard() {

    return (
        <View style={styles.container}>
            <View style={styles.stats}>
                <Distance />
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
        marginTop: 20,
    },
    stats: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});