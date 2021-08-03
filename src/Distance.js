import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLocationLog } from './services/locationService';
import { calculateDistance } from './utils/calculateDistance';
import { convertHDistanceToNm } from './utils/convertHDistanceToNm';

export function Distance() {
    const [distance, setDistance] = React.useState(0);

    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            const locations = await getLocationLog();

            const data = locations?.reduce((agg, loc) => {
                if (!agg) {
                    return {
                        distance: 0,
                        previous: loc,
                    };
                }

                const distanceAtoB = calculateDistance(agg.previous.coords, loc.coords);

                return {
                    distance: agg.distance + distanceAtoB,
                    previous: loc,
                };
            }, null);

            setDistance(convertHDistanceToNm(data.distance));
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Distance:</Text>
            <Text style={styles.text}>{typeof distance !== 'number' ? 'N/A' : Number.parseFloat(distance).toFixed(0)}<Text style={styles.desc}>nm</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        color: '#fff',
        fontSize: 40,
    },
    desc: {
        color: '#fff',
        fontSize: 20,
    },
    label: {
        color: '#fff',
        fontSize: 15,
    }
});