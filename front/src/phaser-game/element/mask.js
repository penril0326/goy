import Phaser from "phaser";
import * as GlobalConst from "../globalconst";


class Mask extends Phaser.Image {
    constructor(game, x, y, width, height, fillColor, alpha) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = game.camera.width;
        }
        if (height === undefined) {
            height = game.camera.height;
        }
        if (fillColor === undefined) {
            fillColor = GlobalConst.DefaultDrawMaskStyle.FillStyle.FillColor;
        }
        if (alpha === undefined) {
            alpha = GlobalConst.DefaultDrawMaskStyle.FillStyle.FillAlpha;
        }
        super(game, x, y, null, null);
        let painter = this.game.add.graphics(x, y);
        painter.beginFill(fillColor, alpha);
        painter.drawRect(0, 0, width, height);
        this.addChild(painter);
        this.graphic = painter;
    }

    setInputEvent(callback, inputPriority) {
        inputPriority = inputPriority || 0;
        this.inputEnabled = true;
        this.events.onInputUp.add(callback);
        this.input.priorityID = inputPriority;
    }
}

export default Mask;
