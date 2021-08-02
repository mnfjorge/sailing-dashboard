import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GpsStatus } from './GpsStatus';
import { Speedometer } from './Speedometer';

export function Dashboard() {

    return (
        <View style={styles.container}>
            <GpsStatus />
            <Speedometer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});