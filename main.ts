// --- Rotation by angle using compass ---

// Sometimes does not work properly because of compass sensor errors.
// Eg. the same direction degree: 100, 90, 120, ... not the same.

function fixDegree(degree: number) {
    if (degree <= 0) {
        return degree + 360
    } else if (degree >= 360) {
        return degree - 360 * Math.trunc(degree / 360)
    }
    return degree
}

function getEstimatedDegrees(semplesNr: number = 50) {
    let degreesSum = 0
    for (let i = 0; i < semplesNr; i++) {
        let degrees = input.compassHeading()
        degreesSum += degrees
    }

    let out = degreesSum / semplesNr

    return out
}

function turnAngle(angle: number, handler: Function, deviation: number = 10) {
    let degrees = getEstimatedDegrees()
    let turnDegreeA = degrees
    let turnDegreeB = degrees

    if (angle > 0) {
        turnDegreeA = fixDegree(degrees + angle)
        turnDegreeB = fixDegree(degrees + angle + deviation)
    } else {
        turnDegreeA = fixDegree(degrees + angle - deviation)
        turnDegreeB = fixDegree(degrees + angle)
    }

    let test = false;

    while (!test) {
        let degrees = getEstimatedDegrees()
        if (turnDegreeA > turnDegreeB) {
            test = (degrees >= turnDegreeA) || (degrees <= turnDegreeB)
        } else {
            test = (degrees >= turnDegreeA) && (degrees <= turnDegreeB)
        }
        basic.pause(10)
    }

    handler()
}

turnAngle(30, ()=>{
    basic.showIcon(IconNames.Happy)
})