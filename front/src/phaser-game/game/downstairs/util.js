import * as CookieUtil from "../../util/cookie";
import * as Config from "./config" ;
import * as MathUtil from "../../util/math";


export function loadDownstairsGameSetting() {
    if (CookieUtil.checkCookie(Config.GameSettingCookieName) === false) {
        CookieUtil.setCookie(
            Config.GameSettingCookieName,
            JSON.stringify(Config.DefaultGameSetting),
            Config.GameSettingCookieExpiredDay
        );
        return Config.DefaultGameSetting;
    } else {
        let validSetting = Config.DefaultGameSetting;
        let data = null;
        try {
            data = JSON.parse(CookieUtil.getCookie(Config.GameSettingCookieName));
        } catch(err) {
            CookieUtil.setCookie(
                Config.GameSettingCookieName,
                JSON.stringify(validSetting),
                Config.GameSettingCookieExpiredDay
            );
            return validSetting;
        }
        if(data.hasOwnProperty("Sounds") && typeof(data.Sounds) === "boolean") {
            validSetting.Sounds = data.Sounds;
        }
        if(data.hasOwnProperty("SandLedge") && typeof(data.SandLedge) === "boolean") {
            validSetting.SandLedge = data.SandLedge;
        }
        if(data.hasOwnProperty("JumpLedge") && typeof(data.JumpLedge) === "boolean") {
            validSetting.JumpLedge = data.JumpLedge;
        }
        if(data.hasOwnProperty("RollLedge") && typeof(data.RollLedge) === "boolean") {
            validSetting.RollLedge = data.RollLedge;
        }
        CookieUtil.setCookie(
            Config.GameSettingCookieName,
            JSON.stringify(validSetting),
            Config.GameSettingCookieExpiredDay
        );
        return validSetting;
    }
}


export function ranking(scores) {
    let r = MathUtil.getRandomInt(1, 9);
    let base = 0;
    if (scores <= 0) {
        return "0";
    }
    if (scores === 1) {
        return "0.1";
    }
    if (scores <= 3) {
        r = MathUtil.getRandomInt(1, 3);
        return "0." + r.toString();
    }
    if (scores > 3 && scores <= 10) {
        // 0.3 ~ 5
        base = 0.3 + (scores - 3) / 1.5;
    }
    if (scores > 10 && scores <= 25) {
        // 5 ~ 30
        base = 5 + (scores - 10) / 0.6;
    }
    if (scores > 25 && scores <= 60) {
        // 30 ~ 70
        base = 30 + (scores - 25) / 0.88;
    }
    if (scores > 60 && scores <= 80) {
        // 70 ~ 88.5
        base = 70 + (scores - 60) / 1.08;
    }
    if (scores > 80 && scores <= 100) {
        // 88.5 ~ 96.5
        base = 88.5 + (scores - 80) / 2.5;
    }
    if (scores > 100 && scores <= 110) {
        //96.5 ~ 98.5
        base = 96.5 + (scores - 100) / 5;
    }
    if (scores > 110 && scores <= 120) {
        // 99 ~ 99.5
        base = 99.0 + (scores - 110) / 20;
    }
    if (scores > 120 && scores <= 160) {
        // 99.5 ~ 99.98
        base = 99.5 + (scores - 120) / 83;
    }
    if (scores > 160) {
        base = 99.99;
    }
    return MathUtil.formatFloat(base, 2).toString();
}
