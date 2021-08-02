import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { getLocationLog } from './services/locationService';
import { getRegion } from './utils/getRegion';

export function Map() {
    const [location, setLocation] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    React.useEffect(() => {
        const intervalId = setInterval(async () => {
            const locations = await getLocationLog();

            const lastLocation = locations?.length > 0 ? locations[locations.length - 1] : null;
            setLocation(lastLocation);

            setMarkers(locations?.map((loc) => ({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })) || []);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (!location || !location.coords.latitude || !location.coords.longitude) {
        return null;
    }

    const region = getRegion(location.coords.latitude, location.coords.longitude);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region} provider="google" showsUserLocation={true} userLocationPriority="high" showsCompass={true} toolbarEnabled={false}>
                {markers?.length > 0 && (
                    <Polyline
                        coordinates={markers}
                        strokeColor="#ff0000"
                        strokeWidth={5}
                        lineDashPattern={[0]}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    map: {
        width: "100%",
        height: "100%",
    }
});
