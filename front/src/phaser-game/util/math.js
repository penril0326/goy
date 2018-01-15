export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatFloat(num, pos)
{
    let size = Math.pow(10, pos);
    return Math.round(num * size) / size;
}

export function getGCD(a, b) {
    if(b === 0){
        if (a !== 0) {
            return a;
        } else {
            return 1;
        }
    }
    return getGCD(b, a%b);
}

export function getArrayGCD (array) {
    return array.reduce(getGCD);
}

export function distanceToXY(sprite, x, y, world) {
    if (world === undefined) { world = false; }

    let dx = (world) ? sprite.world.x - x : sprite.x - x;
    let dy = (world) ? sprite.world.y - y : sprite.y - y;

    return Math.sqrt(dx * dx + dy * dy);
}
