namespace SpriteKind {
    export const Mouse = SpriteKind.create()
}

let sensibilityX = 1.55 * 1023
let sensibilityY = 1.12 * 1023
let Y = 0
let X = 0
let DrawMouseOnScreen = false
let MouseImage = img`
    . 2 . 
    2 2 2 
    . 2 . 
    `
let mouseHitbox: number[] = [0,0]
let MouseDATA = sprites.create(MouseImage, SpriteKind.Player)
MouseDATA.destroy()
let hitboxes: { name: string, rect: number[] }[] = [];
enum Position {
    X = 0,
    Y = 1
}
function isPositionInHitbox(x: number, y: number): string {
    for (let hitbox of hitboxes) {
        let rect = hitbox.rect;
        if (x >= rect[0] && y >= rect[1] && x <= rect[2] && y <= rect[3]) {
            return hitbox.name;
        }
    }
    return "";
}
//% color="#8A2BE2" icon="\uf245" 
namespace Mouse {
    game.onUpdate(function() {
        if (DrawMouseOnScreen){
            MouseDATA.setPosition(GetPositionOfMouse(0), GetPositionOfMouse(1))
        } else {
            MouseDATA.destroy()
        }
    })     
    //% block="Get $Pos of mouse"
    export function GetPositionOfMouse(Pos: Position) {
        if (Pos == 0) {
            X = Math.map(Math.map(controller.acceleration(ControllerDimension.X), -1023, 1023, 0 - sensibilityX, sensibilityX), -1023, 1023, 0, scene.screenWidth()) - mouseHitbox[0] // Add the camera's X position to the mouse X position
            X += scene.cameraProperty(CameraProperty.X) - screen.width / 2
            return X
        } else {
            Y = Math.map(Math.map(controller.acceleration(ControllerDimension.Y), -1023, 1023, 0 - sensibilityY, sensibilityY), -1023, 1023, 0, scene.screenHeight()) - mouseHitbox[1]// Add the camera's Y position to the mouse Y position
            Y += scene.cameraProperty(CameraProperty.Y) - screen.height / 2
            return Y
        }
    }


//% block="Set sensibility of mouse to $sensibilityNum"
//% sensibilityNum.def=1.12
export function Setsensibility(sensibilityNum: number) {
    sensibilityY = Math.map(sensibilityNum / 1.33, 0, 1, 500, 1023)
    sensibilityX = Math.map(sensibilityNum * 1.33, 0, 1, 500, 1023)
}
    export function x() {
        return GetPositionOfMouse(0)
    } 
    export function y() {
        return GetPositionOfMouse(1)
    }
    //% block="create hitbox with name $name at x$x1 y$y1 to x$x2 y$y2"
    //% Name.shadow="HitboxNameList"
    export function createHitbox(x1: number, y1: number, x2: number, y2: number, name: string): void {
        hitboxes.push({ name: name, rect: [x1, y1, x2, y2] });
    }
    //% block="is mouse within hitbox"
    export function ISmouseWithinHitbox() {
        if (isPositionInHitbox(GetPositionOfMouse(Position.X), GetPositionOfMouse(Position.Y)) != "") {
            return true
        } else {
            return false
        }
    }
    //% block="what hitbox is mouse tutching"
    export function WhatHitboxIsMouseIn() {
        return isPositionInHitbox(GetPositionOfMouse(Position.X), GetPositionOfMouse(Position.Y))
    }
    //% block="draw mouse on screen $draw with image $img=screen_image_picker and hitbox at x$x1 y$y1"
    export function DrawMouse(draw: boolean, img: Image, x1: number, y1: number) {
        MouseDATA.destroy()
        DrawMouseOnScreen = draw
        MouseImage = img
        mouseHitbox = [x1,y1]
        MouseDATA = sprites.create(MouseImage, SpriteKind.Player)
    }
    //% block="Mouse Sprite"
    export function mouseSprite() {
        return MouseDATA
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


