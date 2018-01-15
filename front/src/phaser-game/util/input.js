export function checkMouseInObject(mouse, object) {
    let mouseX = mouse.x;
    let mouseY = mouse.y;
    let minX = object.left;
    let minY = object.top;
    let maxX = object.right;
    let maxY = object.bottom;
    return !(mouseX < minX || mouseY < minY || mouseX > maxX || mouseY > maxY);
}
