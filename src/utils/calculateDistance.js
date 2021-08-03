// https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
export function calculateDistance(pointA, pointB) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = pointA.longitude;
    var lat1 = pointA.latitude;

    var lon2 = pointB.longitude;
    var lat2 = pointB.latitude;

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}