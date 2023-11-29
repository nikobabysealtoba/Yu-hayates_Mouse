namespace SpriteKind {
    export const Mouse = SpriteKind.create()
}

let sensibilityX00 = 1.55 * 1023
let sensibilityY01 = 1.12 * 1023
let Y03 = 0
let X02 = 0
let HitBoxCount09 = 0
let DrawMouseOnScreen04 = false
let MouseImage05 = img`
    . 2 . 
    2 2 2 
    . 2 . 
    `
let mouseHitbox06: number[] = [0, 0]
let MouseDATA07 = sprites.create(MouseImage05, SpriteKind.Player)
MouseDATA07.destroy()
let hitboxes08: { name: string, rect: number[] }[] = [];
enum Position {
    X = 0,
    Y = 1
}
function isPositionInHitbox(x: number, y: number): string {
    for (let hitbox of hitboxes08) {
        let rect = hitbox.rect;
        if (x >= rect[0] && y >= rect[1] && x <= rect[2] && y <= rect[3]) {
            return hitbox.name;
        }
    }
    return "";
}
//% color="#8A2BE2" icon="\uf245" 
//% groups="['Mouse', 'Hitboxes']"
namespace Mouse {
    game.onUpdate(function () {
        if (DrawMouseOnScreen04) {
            MouseDATA07.setPosition(GetPositionOfMouse(0), GetPositionOfMouse(1))
        } else {
            MouseDATA07.destroy()
        }
    })
    //% block="Get $Pos of mouse"
    //% group="Mouse"
    export function GetPositionOfMouse(Pos: Position) {
        if (Pos == 0) {
            X02 = Math.map(Math.map(controller.acceleration(ControllerDimension.X), -1023, 1023, 0 - sensibilityX00, sensibilityX00), -1023, 1023, 0, scene.screenWidth()) - mouseHitbox06[0] // Add the camera's X position to the mouse X position
            X02 += scene.cameraProperty(CameraProperty.X) - screen.width / 2
            return X02
        } else {
            Y03 = Math.map(Math.map(controller.acceleration(ControllerDimension.Y), -1023, 1023, 0 - sensibilityY01, sensibilityY01), -1023, 1023, 0, scene.screenHeight()) - mouseHitbox06[1]// Add the camera's Y position to the mouse Y position
            Y03 += scene.cameraProperty(CameraProperty.Y) - screen.height / 2
            return Y03
        }
    }


    //% block="Set sensibility of mouse to $sensibilityNum"
    //% sensibilityNum.defl=1.12
    //% group="Mouse"
    export function Setsensibility(sensibilityNum: number) {
        sensibilityY01 = Math.map(sensibilityNum / 1.33, 0, 1, 500, 1023)
        sensibilityX00 = Math.map(sensibilityNum * 1.33, 0, 1, 500, 1023)
    }
    //% group="Mouse"
    export function x() {
        return GetPositionOfMouse(0)
    }
    //% group="Mouse"
    export function y() {
        return GetPositionOfMouse(1)
    }
    //% block="create hitbox with name $name at x$x1 y$y1 to x$x2 y$y2"
    //% name.shadow="HitboxNameList"
    //% group="Hitboxes"
    export function createHitbox(x1: number, y1: number, x2: number, y2: number, name: string): void {
        hitboxes08.push({ name: name, rect: [x1, y1, x2, y2] });
        HitBoxCount09++
    }
    //% block="is mouse within hitbox"
    //% group="Hitboxes"
    export function ISmouseWithinHitbox() {
        if (isPositionInHitbox(GetPositionOfMouse(Position.X), GetPositionOfMouse(Position.Y)) != "") {
            return true
        } else {
            return false
        }
    }
    //% block="what hitbox is mouse tutching"
    //% group="Hitboxes"
    export function WhatHitboxIsMouseIn() {
        return isPositionInHitbox(GetPositionOfMouse(Position.X), GetPositionOfMouse(Position.Y))
    }
    //% block="draw mouse on screen $draw with image $img=screen_image_picker and hitbox at x$x1 y$y1"
    //% group="Mouse"
    //% draw.defl=true
    export function DrawMouse(draw: boolean, img: Image, x1: number, y1: number) {
        MouseDATA07.destroy()
        DrawMouseOnScreen04 = draw
        MouseImage05 = img
        mouseHitbox06 = [x1, y1]
        MouseDATA07 = sprites.create(MouseImage05, SpriteKind.Player)
    }
    //% block="Mouse Sprite"
    //% group="Mouse"
    export function mouseSprite() {
        return MouseDATA07
    }
    //% block="$name"
    //% blockId=HitboxNameList
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="HitboxNameList"
    export function TurtleNameShadow(name: string) {
        return name
    }
}


