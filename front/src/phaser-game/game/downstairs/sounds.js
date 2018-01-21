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

export function playHitGround() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.HitGround);
    }
}

export function playHitIron() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.HitIron);
    }
}

export function playJump() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.Jump);
    }
}

export function playSandFall() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.SandFall);
    }
}

export function playHurt() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.Hurt);
    }
}

export function playScream() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.Scream);
    }
}

export function playOver() {
    let setting = Util.loadDownstairsGameSetting();
    if (setting.Sounds) {
        Sounds.play(Config.SoundsKey.Over);
    }
}
