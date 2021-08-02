export function convertXYZToBearing(magnetometer) {
    const degree = getDegrees(magnetometer);
    const direction = getDirection(degree);

    return `${degree}°${direction}`;
}

export function getAngle(magnetometer) {
    if (magnetometer) {
        let { x, y, z } = magnetometer;

        if (Math.atan2(y, x) >= 0) {
            angle = Math.atan2(y, x) * (180 / Math.PI);
        }
        else {
            angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
        }
    }

    return Math.round(angle);
};

function getDirection(degree) {
    if (degree >= 22.5 && degree < 67.5) {
        return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
        return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
        return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
        return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
        return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
        return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
        return 'NW';
    }
    else {
        return 'N';
    }
};

function getDegrees(magnetometer) {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
};