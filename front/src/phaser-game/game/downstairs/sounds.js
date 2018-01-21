import Phaser from "phaser";
import * as Config from "./config";
import * as Util from "./util";

export var Sounds = null;

export function init(game) {
    Sounds = new Phaser.AudioSprite(game, Config.SoundsName);
    Sounds.allowMultiple = true;
}

export function playClick() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.Click);
    }
}
