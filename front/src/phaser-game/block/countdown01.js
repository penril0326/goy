import Container from "./container";
import Phaser from "phaser";
import Mask from "../element/mask";
import * as GlobalConst from "../globalconst";

class CountDown01 extends Container {
    constructor(game, countTime, countSpeed, finalText, bitmapKey, textSize, timer) {
        super(game);
        this.isRunning = false;
        this.countTime = countTime;
        this.countSpeed = countSpeed;
        this.finalText = finalText;
        this.bitmapKey = bitmapKey;
        this.textSize = textSize;
        if (timer === undefined) {
            timer = game.time.events;
        }
        this.timer = timer;

        // 建立遮罩
        let mask = new Mask(this.game);
        this.addAsset("mask", mask);

        // 倒數數字
        let countDownText = new Phaser.BitmapText(
            this.game,
            game.camera.width / 2,
            game.camera.height / 2,
            this.bitmapKey,
            this.countTime,
            this.textSize
        );
        countDownText.anchor.setTo(
            GlobalConst.CenterAnchor.X,
            GlobalConst.CenterAnchor.Y
        );
        this.countDownText = countDownText;
        this.addAsset("countDownText", countDownText);
    }

    run(callback) {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        let counterText = this.countTime;
        this.countDownText.text = counterText;
        let runEnd = false;
        this.showAll();
        let loop = this.timer.loop(
            Phaser.Timer.SECOND * this.countSpeed,
            () => {
                if (runEnd) {
                    this.hideAll();
                    this.isRunning = false;
                    this.timer.remove(loop);
                    if (callback) {
                        callback();
                    }
                    return;
                }
                counterText -= 1;
                if (counterText < 0) {
                    runEnd = true;
                    counterText = this.finalText;
                }
                this.countDownText.text = counterText;
            },
            this
        );
    }
}

export default CountDown01;
