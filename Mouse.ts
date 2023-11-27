let sensibility = 1.124
let Y = 0
let X = 0
enum Position {
    X = 0,
    Y = 1
}
namespace Mouse {
    //% block="Get $Pos of mouse"
export function Get(Pos: Position) {
    if (Pos == 0) {
        X = Math.map(Math.map(controller.acceleration(ControllerDimension.X), -1023, 1023, 0 - sensibility, sensibility), -1023, 1023, 0, scene.screenWidth())
        return X
    } else {
        Y = Math.map(Math.map(controller.acceleration(ControllerDimension.Y), -1023, 1023, 0 - sensibility, sensibility), -1023, 1023, 0, scene.screenHeight())

        return Y
    }
}
//% block="Set sensibility of mouse to $sensibilityNum"
//% sensibilityNum.def=1.12
export function Setsensibility(sensibilityNum: number) {
    sensibility = Math.map(sensibilityNum, 0, 1, 500, 1023)
}
}