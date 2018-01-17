import DictUS from "../../dict/us";
import DictTW from "../../dict/tw";
import DictCN from "../../dict/cn";
import * as Config from "../game/downstairs/config";
import * as CookieUtil from "./cookie";

class I18n {
    constructor() {
        this.lang = Config.LangSet.US;
        this.dict = DictUS;
    }
    init() {
        // 依語系載入字典檔
        if (CookieUtil.getCookie(Config.GameLangCookieName) === Config.LangSet.TW) {
            this.lang = Config.LangSet.TW;
            this.dict = DictTW;
        } else if (CookieUtil.getCookie(Config.GameLangCookieName) === Config.LangSet.CN){
            this.lang = Config.LangSet.CN;
            this.dict = DictCN;
        } else {
            this.lang = Config.LangSet.US;
            this.dict = DictUS;
        }
    }
}

var i18n = new I18n();

export default i18n;
