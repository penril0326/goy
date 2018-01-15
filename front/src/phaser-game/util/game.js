import * as MathUtil from "./math";

export function moveToXY(game, sprite, x, y, speed, maxTime, callback, callbackContext) {
    speed = speed || 60;
    maxTime = maxTime || 0;
    let angle = Math.atan2(y - sprite.y, x - sprite.x);
    if (maxTime > 0) {
        speed = MathUtil.distanceToXY(sprite, x, y) / (maxTime / 1000);
    }
    let targetOnTop, targetOnBottom, targetOnLeft, targetOnRight = false;
    if (sprite.x > x) {
        targetOnLeft = true;
    } else {
        targetOnRight = true;
    }
    if (sprite.y > y) {
        targetOnTop = true;
    } else {
        targetOnBottom = true;
    }
    sprite.body.velocity.setToPolar(angle, speed);

    let te = game.time.events.loop(game.time.physicsElapsedMS, function () {
        let xResult, yResult = false;
        if (targetOnRight === true) {
            if (sprite.x >= x) {
                xResult = true;
            }
        }
        if (targetOnLeft === true) {
            if (sprite.x <= x) {
                xResult = true;
            }
        }
        if (targetOnBottom === true) {
            if (sprite.y >= y) {
                yResult = true;
            }
        }
        if (targetOnTop === true) {
            if (sprite.y <= y) {
                yResult = true;
            }
        }
        if (xResult && yResult) {
            te.loop = false;
            sprite.body.velocity.x = 0;
            sprite.body.acceleration.x = 0;
            sprite.body.velocity.y = 0;
            sprite.body.acceleration.y = 0;
            if (callback) {
                callback(sprite);
            }
            delete this;
        }
    }, callbackContext);
}

export function scaleBig(gameobject) {
    gameobject.scale.setTo(1.12);
}

export function scaleOrigin(gameobject) {
    gameobject.scale.setTo(1.0);
}

export function scaleSmall(gameobject) {
    gameobject.scale.setTo(0.88);
}
