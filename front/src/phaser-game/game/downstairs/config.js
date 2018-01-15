import * as GlobalConst from "../../globalconst";
import atlas_maintexture from "../../../../../front/style/img/downstairs/atlas_maintexture.png";
import atlas_maintexture_json from "../../../../../front/style/img/downstairs/atlas_maintexture.json";
import atlas_ledges from "../../../../../front/style/img/downstairs/atlas_ledges.png";
import atlas_ledges_json from "../../../../../front/style/img/downstairs/atlas_ledges.json";
import atlas_porkoldman from "../../../../../front/style/img/downstairs/atlas_porkoldman.png";
import atlas_porkoldman_json from "../../../../../front/style/img/downstairs/atlas_porkoldman.json";

//----- for Game -----
export const PixelScaleRate = 1.0;
export const WorldWidth = 860 * PixelScaleRate;
export const WorldHeight = 800 * PixelScaleRate;
export const CameraWidth = 860 * PixelScaleRate;
export const CameraHeight = 760 * PixelScaleRate;
export const GameDivName = "container";
export const AutoWidthPercent = 0.75;
export const AutoHeightPercent = 0.9;
export const GameBackgroundColor = "#ffffff";
export const WorldCenterPosCenterAnchor = {
    X: WorldWidth / 2,
    Y: WorldHeight / 2,
    Anchor: GlobalConst.CenterAnchor
};
export const CameraCenterPosCenterAnchor = {
    X: CameraWidth / 2,
    Y: CameraHeight / 2,
    Anchor: GlobalConst.CenterAnchor
};
export const DefaultFontStyle = GlobalConst.Play60FontStyle;


export const GameSettingCookieName = "d100_stt";
export const GameSettingCookieExpiredDay = 30;
export const DefaultGameSetting = {
    Sounds : true,
    SandLedge : true,
    JumpLedge : true,
    RollLedge : true,
};
export const LedgeTypes = {
    Normal: "normal",
    Sand: "sand",
    Thorn: "thorn",
    Jump: "jump",
    Left: "left",
    Right: "right",
};
export const PlayerType = {
    Green: "green",
    Yellow: "yellow"
};


//----- for atlas path -----
// ledges atlas
export const LedgesAtlasName = "atlas_ledges";
export const LedgesAtlasPath = {
    Image: atlas_ledges,
    JSON: atlas_ledges_json
};
export const LedgesAtlasKey = {
    NormalLedge: "normal-ledge.png",
    ThornLedge: "thorn-ledge.png",
    JumpLedge1: "jump-ledge-01.png",
    JumpLedge2: "jump-ledge-02.png",
    JumpLedge3: "jump-ledge-03.png",
    LeftLedge1: "left-ledge-01.png",
    LeftLedge2: "left-ledge-02.png",
    LeftLedge3: "left-ledge-03.png",
    LeftLedge4: "left-ledge-04.png",
    LeftLedge5: "left-ledge-05.png",
    LeftLedge6: "left-ledge-06.png",
    RightLedge1: "right-ledge-01.png",
    RightLedge2: "right-ledge-02.png",
    RightLedge3: "right-ledge-03.png",
    RightLedge4: "right-ledge-04.png",
    RightLedge5: "right-ledge-05.png",
    RightLedge6: "right-ledge-06.png",
    SandLedge1: "sand-ledge-01.png",
    SandLedge2: "sand-ledge-02.png",
    SandLedge3: "sand-ledge-03.png",
    SandLedge4: "sand-ledge-04.png",
    SandLedge5: "sand-ledge-05.png",
    SandLedge6: "sand-ledge-06.png",
};
export const JumpLedgeAnimationName = "Jump";
export const JumpLedgeAnimationFrames = [
    LedgesAtlasKey.JumpLedge2,
    LedgesAtlasKey.JumpLedge2,
    LedgesAtlasKey.JumpLedge3,
    LedgesAtlasKey.JumpLedge3,
    LedgesAtlasKey.JumpLedge1
];
export const RollLeftLedgeAnimationName = "Left";
export const RollLeftLedgeAnimationFrames = [
    LedgesAtlasKey.LeftLedge1,
    LedgesAtlasKey.LeftLedge2,
    LedgesAtlasKey.LeftLedge3,
    LedgesAtlasKey.LeftLedge4,
    LedgesAtlasKey.LeftLedge5,
    LedgesAtlasKey.LeftLedge6,
];
export const RollRightLedgeAnimationName = "Right";
export const RollRightLedgeAnimationFrames = [
    LedgesAtlasKey.RightLedge1,
    LedgesAtlasKey.RightLedge2,
    LedgesAtlasKey.RightLedge3,
    LedgesAtlasKey.RightLedge4,
    LedgesAtlasKey.RightLedge5,
    LedgesAtlasKey.RightLedge6,
];
export const SandLedgeAnimationName = "Land";
export const SandLedgeAnimationFrames = [
    LedgesAtlasKey.SandLedge1,
    LedgesAtlasKey.SandLedge1,
    LedgesAtlasKey.SandLedge1,
    LedgesAtlasKey.SandLedge2,
    LedgesAtlasKey.SandLedge3,
    LedgesAtlasKey.SandLedge4,
    LedgesAtlasKey.SandLedge5,
    LedgesAtlasKey.SandLedge6,
    LedgesAtlasKey.SandLedge1,
];
export const DefaultLedgeFrameSet = [
    LedgesAtlasKey.NormalLedge,
    LedgesAtlasKey.SandLedge1,
    LedgesAtlasKey.ThornLedge,
    LedgesAtlasKey.JumpLedge1,
    LedgesAtlasKey.LeftLedge1,
    LedgesAtlasKey.RightLedge1
];
export const DefaultLedgeNameSet = [
    LedgeTypes.Normal,
    LedgeTypes.Sand,
    LedgeTypes.Thorn,
    LedgeTypes.Jump,
    LedgeTypes.Left,
    LedgeTypes.Right
];

// pork old man atlas
export const PorkOldManAtlasName = "atlas_porkoldman";
export const PorkOldManAtlasPath = {
    Image: atlas_porkoldman,
    JSON: atlas_porkoldman_json
};
export const PorkOldManAtlasKey = {
    Green1: "porkoldman-green-01.png",
    Green2: "porkoldman-green-02.png",
    Green3: "porkoldman-green-03.png",
    Green4: "porkoldman-green-04.png",
    Green5: "porkoldman-green-05.png",
    Green6: "porkoldman-green-06.png",
    Green7: "porkoldman-green-07.png",
    Yellow1: "porkoldman-yellow-01.png",
    Yellow2: "porkoldman-yellow-02.png",
    Yellow3: "porkoldman-yellow-03.png",
    Yellow4: "porkoldman-yellow-04.png",
    Yellow5: "porkoldman-yellow-05.png",
    Yellow6: "porkoldman-yellow-06.png",
    Yellow7: "porkoldman-yellow-07.png",
};
export const PlayerAnimationName = {
    Left: "Left",
    Right: "Right"
};
export const PorkOldManAnimationFrames = {
    Green: {
        Left: [
            PorkOldManAtlasKey.Green2,
            PorkOldManAtlasKey.Green3,
            PorkOldManAtlasKey.Green2,
            PorkOldManAtlasKey.Green4
        ],
        Right: [
            PorkOldManAtlasKey.Green5,
            PorkOldManAtlasKey.Green6,
            PorkOldManAtlasKey.Green5,
            PorkOldManAtlasKey.Green7
        ]
    },
    Yellow: {
        Left: [
            PorkOldManAtlasKey.Yellow2,
            PorkOldManAtlasKey.Yellow3,
            PorkOldManAtlasKey.Yellow2,
            PorkOldManAtlasKey.Yellow4
        ],
        Right: [
            PorkOldManAtlasKey.Yellow5,
            PorkOldManAtlasKey.Yellow6,
            PorkOldManAtlasKey.Yellow5,
            PorkOldManAtlasKey.Yellow7
        ]
    },
};

// main texture atlas
export const MainTextureAtlasName = "atlas_maintexture";
export const MainTextureAtlasPath = {
    Image: atlas_maintexture,
    JSON: atlas_maintexture_json
};
export const MainTextureAtlasKey = {
    ButtonA: "buttonA.png",
    ButtonD: "buttonD.png",
    ButtonLeft: "buttonLeft.png",
    ButtonRight: "buttonRight.png",
    CheckBox1: "checkbox-01.png",
    CheckBox2: "checkbox-02.png",
    Sounds: "sounds.png",
    LifeBarBorder: "lifebar-border.png",
    LifeBarContent: "lifebar-content.png",
    Thorn: "thorn.png",
    Facebook: "facebook.png",
    Instagram: "instagram.png"
};

// for assets

// scroll counter
export const ScrollCounterImageName = "ScrollCounter";


//----- for preload state -----
// loading文字的放置位置
export const LoadingTextPos = WorldCenterPosCenterAnchor;

// loading進度條的放置位置
export const LoadingProgressPos = {
    X: WorldWidth / 2,
    Y: WorldHeight / 2 + (100 * PixelScaleRate),
    Anchor: GlobalConst.CenterAnchor
};

//----- for main menu state -----
export const GameTitlePos = {
    X: WorldWidth / 2,
    Y: 120 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const Play1PBtnPos = {
    X: WorldWidth / 2,
    Y: 330 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const Play2PBtnPos = {
    X: WorldWidth / 2,
    Y: 430 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const PlayOnlineBtnPos = {
    X: WorldWidth / 2,
    Y: 530 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const SettingBtnPos = {
    X: 110 * PixelScaleRate,
    Y: CameraHeight - (60 * PixelScaleRate),
    Anchor: GlobalConst.CenterAnchor
};
export const MainMenuDrawBoxPos =  {
    X: 0,
    Y: 0,
    Anchor: GlobalConst.LeftTopAnchor
};
export const MainMenuDrawBoxSize = {
    Width: CameraWidth,
    Height: CameraHeight
};
export const MainMenuDrawBoxStyle = {
    Radius: 5
};
export const SettingMenuDrawBoxPos = {
    X: 155 * PixelScaleRate,
    Y: 180 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const SettingMenuDrawBoxSize = {
    Width: 550 * PixelScaleRate,
    Height: 500 * PixelScaleRate
};
export const SettingMenuDrawBoxStyle = {
    Radius: 5
};
export const SettingMenuTitlePos = {
    X: WorldWidth / 2,
    Y: 225 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const SettingSoundPos = {
    X: 370 * PixelScaleRate,
    Y: 340 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const SettingSandLedgePos = {
    X: 370 * PixelScaleRate,
    Y: 420 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const SettingJumpLedgePos = {
    X: 370 * PixelScaleRate,
    Y: 500 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const SettingRollLedgePos = {
    X: 370 * PixelScaleRate,
    Y: 580 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const SettingSoundCheckBoxPos = {
    X: 520 * PixelScaleRate,
    Y: 322 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const SettingSandLedgeCheckBoxPos = {
    X: 520 * PixelScaleRate,
    Y: 402 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const SettingJumpLedgeCheckBoxPos = {
    X: 520 * PixelScaleRate,
    Y: 482 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const SettingRollLedgeCheckBoxPos = {
    X: 520 * PixelScaleRate,
    Y: 562 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const FbIconPos = {
    X: 715 * PixelScaleRate,
    Y: 685 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const IgIconPos = {
    X: 780 * PixelScaleRate,
    Y: 685 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const FollowTextPos = {
    X: 500 * PixelScaleRate,
    Y: 695 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const FbUrl = "https://www.facebook.com/PorkOldManSayBullShit/";
export const IgUrl = "https://www.instagram.com/porkoldman555/";

// for play state
export const PlayDrawBoxPos = {
    X: 0,
    Y: 0,
    Anchor: GlobalConst.LeftTopAnchor
};
export const PlayDrawBoxSize = {
    Width: CameraWidth,
    Height: CameraHeight,
};
export const PlayDrawBoxStyle = {
    LineStyle:{
        LineWidth: 2,
        LineColor: 0x000000,
        LineAlpha: 1,
    },
    FillStyle:{
        FillColor: 0xffffff,
        FillAlpha: 0
    },
    Radius: 5
};
export const MainGameDrawBoxPos = {
    X: 60 * PixelScaleRate,
    Y: 100 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const MainGameDrawBoxSize = {
    Width: 740 * PixelScaleRate,
    Height: 660 * PixelScaleRate,
};
export const MainGameDrawBoxStyle = {
    LineStyle:{
        LineWidth: 1,
        LineColor: 0x000000,
        LineAlpha: 1,
    },
    FillStyle:{
        FillColor: 0xffffff,
        FillAlpha: 0
    },
    Radius: 5
};
export const CountDownTime = 3;
export const CountDownSpeed = 0.65;
export const PlayerIniPos = {
    X: 406 * PixelScaleRate,
    Y: 370 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const Player1IniPos = {
    X: 436 * PixelScaleRate,
    Y: 370 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const Player2IniPos = {
    X: 376 * PixelScaleRate,
    Y: 370 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const PlayerGravity = {
    X: 0,
    Y: 800
};
export const PlayerIgnoreCollide = {
    X: 15 * PixelScaleRate,
    Y: 30 * PixelScaleRate
};
export const PlayerJumpSpeed = -300;
export const PlayerLeftSpeed = -220;
export const PlayerRightSpeed = 220;
export const MaxLedgesNumber = 8;
export const MiddleLedgesNumber = MaxLedgesNumber / 2;
export const LedgeBasicSpeed = 115;
export const LedgePos = {
    MinX: 60 * PixelScaleRate,
    MaxX: 620 * PixelScaleRate,
    BaseY: 105 * PixelScaleRate,
    MinY: 70 * PixelScaleRate,
    MaxY: CameraHeight + (30 * PixelScaleRate),
    MarginY: 90 * PixelScaleRate,
    Anchor: GlobalConst.LeftBottomAnchor
};
export const LedgeMiddlePos = {
    X: 340 * PixelScaleRate,
    Y: 465 * PixelScaleRate,
    Anchor: GlobalConst.LeftBottomAnchor
};
export const DefaultLedgeBodySize = {
    Width: 180 * PixelScaleRate,
    Height: 30 * PixelScaleRate,
    OffsetX: 0,
    OffsetY: 0
};
export const ThornLedgeBodySize = {
    Width: 180 * PixelScaleRate,
    Height: 30 * PixelScaleRate,
    OffsetX: 0,
    OffsetY: 30 * PixelScaleRate
};
export const GameBoundColor = 0xffffff;
export const GameUpBoundThick = 100 * PixelScaleRate;
export const GameBottomBoundThick = 0;
export const GameLeftBoundThick = 60 * PixelScaleRate;
export const GameRightBoundThick = 60 * PixelScaleRate;
export const PauseMenuDrawBoxPos = SettingMenuDrawBoxPos;
export const PauseMenuDrawBoxSize = SettingMenuDrawBoxSize;
export const PauseMenuDrawBoxStyle = SettingMenuDrawBoxStyle;
export const PauseMenuTitlePos = SettingMenuTitlePos;
export const PauseMenuSoundPos = {
    X: 370 * PixelScaleRate,
    Y: 400 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const PauseMenuSoundCheckBoxPos = {
    X: 520 * PixelScaleRate,
    Y: 382 * PixelScaleRate,
    Anchor: GlobalConst.LeftTopAnchor
};
export const PauseMenuContinueButtonPos = {
    X: WorldWidth / 2,
    Y: 550 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const CountDownTextPos = {
    X: WorldWidth / 2,
    Y: 400 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintTextPos = {
    X: WorldWidth / 2,
    Y: 650 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintP1ControlTextPos = {
    X: 635 * PixelScaleRate,
    Y: 600 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintP2ControlTextPos = {
    X: 225 * PixelScaleRate,
    Y: 600 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintButtonAPos = {
    X: 160 * PixelScaleRate,
    Y: 670 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintButtonDPos = {
    X: 280 * PixelScaleRate,
    Y: 670 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintButtonLeftPos = {
    X: 580 * PixelScaleRate,
    Y: 670 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const HintButtonRightPos = {
    X: 700 * PixelScaleRate,
    Y: 670 * PixelScaleRate,
    Anchor: GlobalConst.CenterAnchor
};
export const ScrollCounterPos = {
    X: WorldWidth / 2,
    Y:65,
    Anchor: GlobalConst.CenterAnchor
};
export const ScrollCounterSpeed = 2700;

export const LifeBarPos = {
    X: 90,
    Y: 55,
    Anchor: GlobalConst.LeftTopAnchor
};
export const LifeTextPos = {
    X: 180,
    Y: 35,
    Anchor: GlobalConst.CenterAnchor
};
export const Player1LifeTextPos = {
    X: 675,
    Y: 35,
    Anchor: GlobalConst.CenterAnchor
};
export const Player2LifeTextPos = LifeTextPos;

export const Player1LifeBarPos = {
    X: 585,
    Y: 55,
    Anchor: GlobalConst.LeftTopAnchor
};

export const Player2LifeBarPos = {
    X: 90,
    Y: 55,
    Anchor: GlobalConst.LeftTopAnchor
};
export const LifeBarSize = {
    Width: 180 * PixelScaleRate,
    Height: 30 * PixelScaleRate,
};
export const GameOverDrawBoxPos = SettingMenuDrawBoxPos;
export const GameOverDrawBoxSize = SettingMenuDrawBoxSize;
export const GameOverDrawBoxStyle = SettingMenuDrawBoxStyle;
export const GameOverTitlePos = {
    X: 430,
    Y: 250,
    Anchor: GlobalConst.CenterAnchor
};
export const GameOverScoresPos = {
    X: 430,
    Y: 350,
    Anchor: GlobalConst.CenterAnchor
};
export const GameOverRankPos = {
    X: 430,
    Y: 450,
    Anchor: GlobalConst.CenterAnchor
};

export const GameOverContinueButtonPos = {
    X: 430,
    Y: 600,
    Anchor: GlobalConst.CenterAnchor
};

// for ledges effect
export const DefaultNormalLedgeWeight = 9;
export const DefaultSandLedgeWeight = 2;
export const DefaultThornLedgeWeight = 3;
export const DefaultJumpLedgeWeight = 2;
export const DefaultLeftLedgeWeight = 1;
export const DefaultRightLedgeWeight = 1;
