
export function getRegion(latitude, longitude) {

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }
}