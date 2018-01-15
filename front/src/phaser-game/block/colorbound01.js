import Container from "./container";
import Box from "../element/box";
import * as GlobalConst from "../globalconst";


class ColorBound01 extends Container {
    constructor(game, color, upThick, bottomThick, leftThick, rightThick) {
        super(game);
        if (upThick === undefined) {
            upThick = GlobalConst.DefaultBoundThick;
        }
        if (bottomThick === undefined) {
            bottomThick = GlobalConst.DefaultBoundThick;
        }
        if (leftThick === undefined) {
            leftThick = GlobalConst.DefaultBoundThick;
        }
        if (rightThick === undefined) {
            rightThick = GlobalConst.DefaultBoundThick;
        }

        // 建置上方邊界
        if (upThick > 0) {
            let boundsUp = new Box(
                this.game,
                0,
                0,
                game.camera.width,
                upThick,
                0,
                color,
                GlobalConst.DefaultDrawBoundStyle.FillStyle.FillAlpha,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineWidth,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineColor,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineAlpha
            );

            this.game.physics.arcade.enable(boundsUp.graphic, true);
            boundsUp.graphic.body.immovable = true;
            this.addAsset("boundsUp", boundsUp);
            this.addAsset("boundsUpGraphic", boundsUp.graphic);
        }

        // 建置下方邊界
        if (bottomThick > 0) {
            let boundsBottom = new Box(
                this.game,
                0,
                game.camera.height - bottomThick,
                game.camera.width,
                bottomThick,
                0,
                color,
                GlobalConst.DefaultDrawBoundStyle.FillStyle.FillAlpha,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineWidth,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineColor,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineAlpha
            );
            this.game.physics.arcade.enable(boundsBottom.graphic);
            boundsBottom.graphic.body.immovable = true;
            this.addAsset("boundsBottom", boundsBottom);
            this.addAsset("boundsBottomGraphic", boundsBottom.graphic);
        }

        // 建置左方邊界
        if (leftThick > 0) {
            let boundsLeft = new Box(
                this.game,
                0,
                0,
                leftThick,
                game.camera.height,
                0,
                color,
                GlobalConst.DefaultDrawBoundStyle.FillStyle.FillAlpha,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineWidth,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineColor,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineAlpha
            );
            this.game.physics.arcade.enable(boundsLeft.graphic);
            boundsLeft.graphic.body.immovable = true;
            this.addAsset("boundsLeft", boundsLeft);
            this.addAsset("boundsLeftGraphic", boundsLeft.graphic);
        }

        // 建置右方邊界
        if (rightThick > 0) {
            let boundsRight = new Box(
                this.game,
                game.camera.width - rightThick,
                0,
                rightThick,
                game.camera.height,
                0,
                color,
                GlobalConst.DefaultDrawBoundStyle.FillStyle.FillAlpha,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineWidth,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineColor,
                GlobalConst.DefaultDrawBoundStyle.LineStyle.LineAlpha
            );
            this.game.physics.arcade.enable(boundsRight.graphic);
            boundsRight.graphic.body.immovable = true;
            this.addAsset("boundsRight", boundsRight);
            this.addAsset("boundsRightGraphic", boundsRight.graphic);
        }
    }
}

export default ColorBound01;
