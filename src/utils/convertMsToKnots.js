
const ONE_METER_PER_SECOND_IN_KNOTS = 1.94384

export function convertMsToKnots(ms) {
    return ms * ONE_METER_PER_SECOND_IN_KNOTS;
}