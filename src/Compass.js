import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { convertXYZToBearing, getAngle } from './utils/convertXYZToBearing';

const imageArrowCompass = require('./assets/arrow-compass.png');

export function Compass() {
    const [heading, setHeading] = React.useState(null);

    React.useEffect(() => {
        Magnetometer.setUpdateInterval(2000);
        const subscription = Magnetometer.addListener((data) => {
            setHeading(getAngle(data));
        });

        return () => {
            subscription.remove();
        };
    }, []);

    if (!heading) {
        return null;
    }

    const imgStyle = StyleSheet.compose(styles.img, {
        transform: [{ rotate: `${90 - heading}deg` }],
    });

    const text = convertXYZToBearing(heading);

    return (
        <View style={styles.container}>
            <Image
                style={imgStyle}
                source={imageArrowCompass}
                tintColor="#fff"
            />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    img: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    text: {
        fontSize: 40,
        color: '#fff',
    }
});