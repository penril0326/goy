import Phaser from "phaser";
import Container from "../../../block/container";
import Mask from "../../../element/mask";
import Box from "../../../element/box";
import DictUS from "../../../../dict/us";
import * as Config from "../config";
import * as Util from "../util";
import * as InputUtil from "../../../util/input";
import * as GameUtil from "../../../util/game";


class GameOver extends Container {
    constructor(game, scoresNumber, inputPriority) {
        super(game);
        // 語系設置
        this.Dict = DictUS;

        this.inputPriority = inputPriority;

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
        let title = new Phaser.Text(
            this.game,
            Config.GameOverTitlePos.X,
            Config.GameOverTitlePos.Y,
            this.Dict.GameOverText,
            Config.DefaultFontStyle
        );
        title.anchor.setTo(
            Config.GameOverTitlePos.Anchor.X,
            Config.GameOverTitlePos.Anchor.Y
        );
        this.addAsset("title", title);

        // 分數
        let scores = new Phaser.Text(
            this.game,
            Config.GameOverScoresPos.X,
            Config.GameOverScoresPos.Y,
            this.Dict.ScoresText + ": " + scoresNumber.toString(),
            Config.DefaultFontStyle
        );
        scores.anchor.setTo(
            Config.GameOverScoresPos.Anchor.X,
            Config.GameOverScoresPos.Anchor.Y
        );
        this.addAsset("scores", scores);

        // 排名
        let rank = new Phaser.Text(
            this.game,
            Config.GameOverRankPos.X,
            Config.GameOverRankPos.Y,
            this.Dict.RankText + ": " + Util.ranking(scoresNumber) + "%",
            Config.DefaultFontStyle
        );
        rank.anchor.setTo(
            Config.GameOverRankPos.Anchor.X,
            Config.GameOverRankPos.Anchor.Y
        );
        this.addAsset("rank", rank);

        // 建立 continue 按鈕
        let continueBtn = new Phaser.Text(
            this.game,
            Config.GameOverContinueButtonPos.X,
            Config.GameOverContinueButtonPos.Y,
            this.Dict.ContinueText,
            Config.DefaultFontStyle
        );
        continueBtn.anchor.setTo(
            Config.GameOverContinueButtonPos.Anchor.X,
            Config.GameOverContinueButtonPos.Anchor.Y
        );
        continueBtn.inputEnabled = true;
        continueBtn.input.priorityID = this.inputPriority;
        continueBtn.events.onInputUp.add(this.onContinueClick.bind(this));
        continueBtn.events.onInputOver.add(GameUtil.scaleBig);
        continueBtn.events.onInputOut.add(GameUtil.scaleOrigin);
        this.addInput("continueBtn", continueBtn);
    }

    onContinueClick() {
        let continueBtn = this.inputs["continueBtn"];
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, continueBtn) === false) {
            return;
        }
        this.game.state.start("MainMenu", true, false);
    }
}

export default GameOver;
