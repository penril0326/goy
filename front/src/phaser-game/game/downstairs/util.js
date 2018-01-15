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
    if (scores <= 5) {
        r = MathUtil.getRandomInt(1, 3);
        return "0." + r.toString();
    }
    if (scores > 5 && scores <= 15) {
        //min 0.4  max 1.3
        base = 0.3 + (scores - 5) * 0.1;
    }
    if (scores > 15 && scores <= 25) {
        //min 1.5  max 3.3
        base = 1.3 + (scores - 15) * 0.2;
    }
    if (scores > 25 && scores <= 35) {
        //min 3.7  max 7.3
        base = 3.3 + (scores - 25) * 0.4;
    }
    if (scores > 35 && scores <= 45) {
        //min 7.9  max 13.3
        base = 7.3 + (scores - 35) * 0.6;
    }
    if (scores > 45 && scores <= 55) {
        //min 14.1  max 21.3
        base = 13.3 + (scores - 45) * 0.8;
    }
    if (scores > 55 && scores <= 65) {
        //min 22.3  max 31.3
        base = 21.3 + (scores - 55);
    }
    if (scores > 65 && scores <= 80) {
        //min 32.5  max 47.8
        base = 31.3 + (scores - 65) * 1.1;
    }
    if (scores > 80 && scores <= 90) {
        //min 48.7  max 56.7
        base = 47.8 + (scores - 80) * 0.9;
    }
    if (scores > 90 && scores <= 100) {
        //min 57.4  max 63.7
        base = 56.7 + (scores - 90) * 0.7;
    }
    if (scores > 100 && scores <= 110) {
        //min 64.3  max 69.7
        base = 63.7 + (scores - 100) * 0.6;
    }
    if (scores > 110 && scores <= 120) {
        //min 70.2  max 74.7
        base = 69.7 + (scores - 110) * 0.5;
    }
    if (scores > 120 && scores <= 130) {
        //min 75.1  max 78.7
        base = 74.7 + (scores - 120) * 0.4;
    }
    if (scores > 130 && scores <= 150) {
        //min 78.9  max 82.7
        base = 78.7 + (scores - 130) * 0.2;
    }
    if (scores > 150 && scores <= 200) {
        //min 82.8  max 87.7
        base = 82.7 + (scores - 150) * 0.1;
    }
    if (scores > 200 && scores <= 240) {
        //min 87.9  max 95.7
        base = 87.7 + (scores - 200) * 0.2;
    }
    if (scores > 240 && scores <= 260) {
        //min 95.8  max 97.7
        base = 95.7 + (scores - 240) * 0.1;
    }
    if (scores > 300) {
        scores = 300;
    }
    if (scores > 260 && scores <= 300) {
        //min 97.75  max 99.7
        base = 97.7 + (scores - 260) * 0.05;
    }
    base = base + (r / 10);
    if (base > 99.9) {
        base = 99.9;
    }
    return MathUtil.formatFloat(base, 2).toString();
}
