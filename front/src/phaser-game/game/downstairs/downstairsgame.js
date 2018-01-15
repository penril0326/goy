import "pixi";
import "p2";
import Phaser from "phaser";
import * as Config from "./config";
import Boot from "./state/boot";
import Preload from "./state/preload";
import MainMenu from "./state/mainmenu";
import Play1P from "./state/play1p";
import Play2P from "./state/play2p";
import * as CookieUtil from "../../util/cookie";

class DownStairsGame extends Phaser.Game {
    constructor() {
        super(Config.CameraWidth, Config.CameraHeight, Phaser.AUTO, Config.GameDivName);
        if (CookieUtil.checkCookie(Config.GameSettingCookieName) === false) {
            CookieUtil.setCookie(Config.GameSettingCookieName, JSON.stringify(Config.DefaultGameSetting), 30);
        }
        this.state.add("Boot", Boot, false);
        this.state.add("Preload", Preload, false);
        this.state.add("MainMenu", MainMenu, false);
        this.state.add("Play1P", Play1P, false);
        this.state.add("Play2P", Play2P, false);
        this.state.start("Boot");
    }
}

export default DownStairsGame;
