import Phaser from "phaser";
import * as GlobalConst from "../globalconst";


class Box extends Phaser.Image {
    constructor(game, x, y, width, height, radius, fillColor, fillAlpha, borderWidth, borderColor, borderAlpha) {
        super(game, 0, 0, null, null);
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
        if (radius === undefined) {
            radius = GlobalConst.DefaultDrawBoxStyle.Radius;
        }
        if (fillColor === undefined) {
            fillColor = GlobalConst.DefaultDrawBoxStyle.FillStyle.FillColor;
        }
        if (fillAlpha === undefined) {
            fillAlpha = GlobalConst.DefaultDrawBoxStyle.FillStyle.FillAlpha;
        }
        if (borderWidth === undefined) {
            borderWidth = GlobalConst.DefaultDrawBoxStyle.LineStyle.LineWidth;
        }
        if (borderColor === undefined) {
            borderColor = GlobalConst.DefaultDrawBoxStyle.LineStyle.LineColor;
        }
        if (borderAlpha === undefined) {
            borderAlpha = GlobalConst.DefaultDrawBoxStyle.LineStyle.LineAlpha;
        }
        let painter = this.game.add.graphics(x, y);
        painter.beginFill(fillColor, fillAlpha);
        painter.lineStyle(borderWidth, borderColor, borderAlpha);
        painter.drawRoundedRect(0, 0, width, height, radius);
        this.addChild(painter);
        this.graphic = painter;
    }
}

export default Box;
