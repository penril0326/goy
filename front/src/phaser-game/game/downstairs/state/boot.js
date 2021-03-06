import Phaser from "phaser";
import * as Config from "../config";
import * as GlobalConst from "../../../globalconst";
import Savecpu from "../../../plugin/savecpu";
import * as DomUtil from "../../../util/dom";
import WebFont from "webfontloader";


class BootState extends Phaser.State {
    create(game) {
        // 載入字體
        WebFont.load({
            google: {
                families: GlobalConst.PlayFontLoader
            },
            timeout: 2000
        });

        // 啟用節省cpu的外掛
        Savecpu();
        game.plugins.add(new Phaser.Plugin.SaveCPU(game, document));
        // 使用ARCADE輕型物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // 隨著使用者調整瀏覽器版面，自動調整遊戲的視窗大小
        window.addEventListener("resize", function(){
            DomUtil.setElementSizeByScreenSize(Config.GameDivName, Config.AutoWidthPercent, Config.AutoHeightPercent);
        });
        // 遊戲縮放模式為：顯示完整遊戲畫面(不會被裁切)
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // 遊戲視窗水平置中
        game.scale.pageAlignHorizontally = true;
        // 遊戲視窗垂直置中
        game.scale.pageAlignVertically = true;
        // 刷新遊戲畫面
        game.scale.refresh();
        // 依照瀏覽器畫面大小，刷新遊戲視窗
        DomUtil.setElementSizeByScreenSize(Config.GameDivName, Config.AutoWidthPercent, Config.AutoHeightPercent);
        // 設置遊戲的世界邊界
        game.world.setBounds(0, 0, Config.WorldWidth, Config.WorldHeight);
        // 設置攝影機位置
        game.camera.focusOnXY(0, 0);
        // 設置背景顏色
        game.stage.backgroundColor = Config.GameBackgroundColor;
        // 開始載入紋理
        game.state.start("Preload");
    }
}

export default BootState;
