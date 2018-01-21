import Phaser from "phaser";
import * as Config from "../config";
import * as GlobalConst from "../../../globalconst";
import SettingMenu from "../block/settingmenu";
import LedgesRunner from "../block/ledgesrunner";
import Mask from "../../../element/mask";
import * as GameUtil from "../../../util/game";
import * as InputUtil from "../../../util/input";
import I18nUtil from "../../../util/i18n";
import * as Sounds from "../sounds";

class MainMenuState extends Phaser.State {
    constructor() {
        super();
        // setting main menu objects
        this.mask = null;
        this.ledgesEffect = null;
        this.gameTitle = null;
        this.play1PBtn = null;
        this.play2PBtn = null;
        this.playOnlineBtn = null;
        this.settingBtn = null;
        this.mainBox = null;
        this.fbIcon = null;
        this.igIcon = null;
        this.followMeText = null;

        // setting menu container
        this.settingMenu = null;

        // input priority
        this.mainMenuIputPriority = 0;
        this.settingMenuIputPriority = 1;
    }
    create(game) {
        // 建立 ledge 的背景特效
        this.ledgesEffect = new LedgesRunner(this.game);
        this.ledgesEffect.run();
        this.mask = new Mask(game);
        game.add.existing(this.mask);

        // 建立 game title
        let gameTitle = game.add.bitmapText(
            Config.GameTitlePos.X,
            Config.GameTitlePos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.DownStairsGameTitleText,
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        gameTitle.anchor.setTo(Config.GameTitlePos.Anchor.X, Config.GameTitlePos.Anchor.Y);
        this.gameTitle = gameTitle;

        // 建立 Play 1P 按鈕
        let play1PBtn = game.add.bitmapText(
            Config.Play1PBtnPos.X,
            Config.Play1PBtnPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.Play1PText,
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        play1PBtn.anchor.set(Config.Play1PBtnPos.Anchor.X, Config.Play1PBtnPos.Anchor.Y);
        play1PBtn.inputEnabled = true;
        play1PBtn.input.useHandCursor = true;
        play1PBtn.events.onInputUp.add(this.play1p.bind(this));
        play1PBtn.events.onInputDown.add(Sounds.playClick);
        play1PBtn.events.onInputOver.add(GameUtil.scaleBig);
        play1PBtn.events.onInputOut.add(GameUtil.scaleOrigin);
        play1PBtn.input.priorityID = this.mainMenuIputPriority;
        play1PBtn.hitArea = new Phaser.Rectangle(
            0 - play1PBtn.offsetX,
            0 - play1PBtn.offsetY,
            play1PBtn.width,
            play1PBtn.height
        );
        this.play1PBtn = play1PBtn;

        // 建立 Play 2P 按鈕
        let play2PBtn = game.add.bitmapText(
            Config.Play2PBtnPos.X,
            Config.Play2PBtnPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.Play2PText,
            GlobalConst.DefaultBitmapFontStyle.Size
        );
        play2PBtn.anchor.setTo(Config.Play2PBtnPos.Anchor.X, Config.Play2PBtnPos.Anchor.Y);
        play2PBtn.inputEnabled = true;
        play2PBtn.input.useHandCursor = true;
        play2PBtn.events.onInputUp.add(this.play2p.bind(this));
        play2PBtn.events.onInputDown.add(Sounds.playClick);
        play2PBtn.events.onInputOver.add(GameUtil.scaleBig);
        play2PBtn.events.onInputOut.add(GameUtil.scaleOrigin);
        play2PBtn.input.priorityID = this.mainMenuIputPriority;
        play2PBtn.hitArea = new Phaser.Rectangle(
            0 - play2PBtn.offsetX,
            0 - play2PBtn.offsetY,
            play2PBtn.width,
            play2PBtn.height
        );
        this.play2PBtn = play2PBtn;

        // 建立 Play Online 按鈕
        //todo: play online feature
        /**
         let playOnlineBtn = game.add.bitmapText(
         Config.PlayOnlineBtnPos.X,
         Config.PlayOnlineBtnPos.Y,
         Config.DollBitmapFontName,
         I18nUtil.dict.PlayOnlineText,
         GlobalConst.DefaultBitmapFontStyle.Size
         );
         playOnlineBtn.anchor.setTo(Config.PlayOnlineBtnPos.Anchor.X, Config.PlayOnlineBtnPos.Anchor.Y);
         playOnlineBtn.inputEnabled = true;
         playOnlineBtn.input.useHandCursor = true;
         playOnlineBtn.events.onInputUp.add(this.playOnline.bind(this));
         playOnlineBtn.events.onInputOver.add(Events.scaleBig);
         playOnlineBtn.events.onInputOut.add(Events.scaleOrigin);
         playOnlineBtn.input.priorityID = this.mainMenuIputPriority;
         playOnlineBtn.hitArea = new Phaser.Rectangle(
         0 - playOnlineBtn.offsetX,
         0 - playOnlineBtn.offsetY,
         playOnlineBtn.width,
         playOnlineBtn.height
         );
         this.playOnlineBtn = playOnlineBtn;
         */

        // 建立 setting 按鈕
        let settingBtn = game.add.bitmapText(
            Config.SettingBtnPos.X,
            Config.SettingBtnPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.SettingText,
            GlobalConst.BitmapFont34Style.Size
        );
        settingBtn.anchor.setTo(Config.SettingBtnPos.Anchor.X, Config.SettingBtnPos.Anchor.Y);
        settingBtn.inputEnabled = true;
        settingBtn.input.useHandCursor = true;
        settingBtn.events.onInputUp.add(this.onSettingButtonClicked.bind(this));
        settingBtn.events.onInputDown.add(Sounds.playClick);
        settingBtn.events.onInputOver.add(GameUtil.scaleBig);
        settingBtn.events.onInputOut.add(GameUtil.scaleOrigin);
        settingBtn.input.priorityID = this.mainMenuIputPriority;
        settingBtn.hitArea = new Phaser.Rectangle(
            0 - settingBtn.offsetX,
            0 - settingBtn.offsetY,
            settingBtn.width,
            settingBtn.height
        );
        this.settingBtn = settingBtn;

        // 建立游戲邊框
        let mainBox = game.add.graphics(Config.MainMenuDrawBoxPos.X, Config.MainMenuDrawBoxPos.Y);
        mainBox.lineStyle(
            GlobalConst.DefaultDrawBoxStyle.LineStyle.LineWidth,
            GlobalConst.DefaultDrawBoxStyle.LineStyle.LineColor,
            GlobalConst.DefaultDrawBoxStyle.LineStyle.LineAlpha
        );
        mainBox.drawRoundedRect(
            0,
            0,
            Config.MainMenuDrawBoxSize.Width,
            Config.MainMenuDrawBoxSize.Height,
            Config.MainMenuDrawBoxStyle.Radius
        );
        this.mainBox = mainBox;

        // 建立 follow me 標誌
        let followMeText = game.add.bitmapText(
            Config.FollowTextPos.X,
            Config.FollowTextPos.Y,
            Config.DollBitmapFontName,
            I18nUtil.dict.FollowMeText,
            GlobalConst.BitmapFont32Style.Size
        );
        followMeText.anchor.setTo(Config.FollowTextPos.Anchor.X, Config.FollowTextPos.Anchor.Y);
        this.followMeText = followMeText;

        let fbIcon = game.add.sprite(
            Config.FbIconPos.X,
            Config.FbIconPos.Y,
            Config.MainTextureAtlasName,
            Config.MainTextureAtlasKey.Facebook
        );
        fbIcon.inputEnabled = true;
        fbIcon.input.useHandCursor = true;
        fbIcon.events.onInputUp.add(this.onFbClicked.bind(this));
        this.fbIcon = fbIcon;

        let igIcon = game.add.sprite(
            Config.IgIconPos.X,
            Config.IgIconPos.Y,
            Config.MainTextureAtlasName,
            Config.MainTextureAtlasKey.Instagram
        );
        igIcon.inputEnabled = true;
        igIcon.input.useHandCursor = true;
        igIcon.events.onInputUp.add(this.onIgClicked.bind(this));
        this.igIcon = igIcon;

        // 初始化setting menu
        this.initSettingMenu();
        this.hideSettingMenu();
    }

    initSettingMenu() {
        this.settingMenu = new SettingMenu(this.game, this.settingMenuIputPriority, this.hideSettingMenu.bind(this));
    }

    showSettingMenu() {
        this.settingBtn.scale.setTo(1.0);
        this.igIcon.inputEnabled = false;
        this.fbIcon.inputEnabled = false;
        this.settingBtn.inputEnabled = false;
        this.settingMenu.showAll();
    }

    hideSettingMenu() {
        this.igIcon.inputEnabled = true;
        this.igIcon.input.useHandCursor = true;
        this.fbIcon.inputEnabled = true;
        this.fbIcon.input.useHandCursor = true;
        this.settingBtn.inputEnabled = true;
        this.settingBtn.input.useHandCursor = true;
        this.settingMenu.hideAll();
    }

    // events callback
    play1p() {
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, this.play1PBtn) === false) {
            return;
        }
        this.game.state.start("Play1P");
    }

    play2p() {
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, this.play2PBtn) === false) {
            return;
        }
        this.game.state.start("Play2P");
    }

    playOnline() {
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, this.playOnlineBtn) === false) {
            return;
        }
        // todo: play online state
        this.game.state.start("Play1P");
    }

    onSettingButtonClicked() {
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, this.settingBtn) === false) {
            return;
        }
        this.showSettingMenu();
    }

    onFbClicked() {
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, this.fbIcon) === false) {
            return;
        }
        window.open(Config.FbUrl);
    }

    onIgClicked() {
        if (InputUtil.checkMouseInObject(this.game.input.mousePointer, this.igIcon) === false) {
            return;
        }
        window.open(Config.IgUrl);
    }
}

export default MainMenuState;
