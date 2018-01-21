import Phaser from "phaser";
import Container from "../../../block/container";
import Mask from "../../../element/mask";
import Box from "../../../element/box";
import * as Config from "../config";
import * as Util from "../util";
import * as InputUtil from "../../../util/input";
import * as GameUtil from "../../../util/game";
import I18nUtil from "../../../util/i18n";
import * as GlobalConst from "../../../globalconst";
import * as Sounds from "../sounds";

class GameOver extends Container {
    constructor(game, scoresNumber, inputPriority, callback) {
        super(game);
        this.inputPriority = inputPriority;
        this.callback = callback;

        // 建立遮罩
        let mask = new Mask(game);
        this.addAsset("mask", mask);

        // 建立 game over 選單邊框
        let box = new Box(
            game,
            Config.GameOverDrawBoxPos.X,
            Config.GameOverDrawBoxPos.Y,
            Config.GameOverDrawBoxSize.Width,
            Config.GameOverDrawBoxSize.Height,
            Config.GameOverDrawBoxStyle.Radius
        );
        this.addAsset("box", box);

        // game over 標題
        let title = new Phaser.BitmapText(
            this.game,
            Config.GameOverTitlePos.X,
            Config.GameOverTitlePos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.GameOverText,
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        title.anchor.setTo(
            Config.GameOverTitlePos.Anchor.X,
            Config.GameOverTitlePos.Anchor.Y
        );
        this.addAsset("title", title);

        // 分數
        let scores = new Phaser.BitmapText(
            this.game,
            Config.GameOverScoresPos.X,
            Config.GameOverScoresPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.ScoresText + ": " + scoresNumber.toString(),
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        scores.anchor.setTo(
            Config.GameOverScoresPos.Anchor.X,
            Config.GameOverScoresPos.Anchor.Y
        );
        this.addAsset("scores", scores);

        // 排名
        let rank = new Phaser.BitmapText(
            this.game,
            Config.GameOverRankPos.X,
            Config.GameOverRankPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.RankText + ": " + Util.ranking(scoresNumber) + "%",
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        rank.anchor.setTo(
            Config.GameOverRankPos.Anchor.X,
            Config.GameOverRankPos.Anchor.Y
        );
        this.addAsset("rank", rank);

        // 建立 continue 按鈕
        let continueBtn = new Phaser.BitmapText(
            this.game,
            Config.GameOverContinueButtonPos.X,
            Config.GameOverContinueButtonPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.ContinueText,
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        continueBtn.anchor.setTo(
            Config.GameOverContinueButtonPos.Anchor.X,
            Config.GameOverContinueButtonPos.Anchor.Y
        );
        continueBtn.inputEnabled = true;
        continueBtn.input.priorityID = this.inputPriority;
        continueBtn.events.onInputUp.add(this.onContinueClick.bind(this));
        continueBtn.events.onInputDown.add(Sounds.playClick);
        continueBtn.events.onInputOver.add(GameUtil.scaleBig);
        continueBtn.events.onInputOut.add(GameUtil.scaleOrigin);
        continueBtn.hitArea = new Phaser.Rectangle(
            0 - continueBtn.offsetX,
            0 - continueBtn.offsetY,
            continueBtn.width,
            continueBtn.height
        );
        this.addInput("continueBtn", continueBtn);
    }

    onContinueClick() {
        let continueBtn = this.inputs["continueBtn"];
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, continueBtn) === false) {
            return;
        }
        if (this.callback) {
            this.callback();
        }
        this.game.state.start("MainMenu", true, false);
    }
}

export default GameOver;
