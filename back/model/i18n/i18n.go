package i18n

import (
    "goy/back/model/i18n/tw"
    "goy/back/model/i18n/us"
    "goy/back/model/i18n/cn"
)

// 合法的語系
const (
    TW = "TW"
    US = "US"
    CN = "CN"
)

// 預設的字典檔語系為US
var Dict = us.Dict

// 載入指定語系的字典檔
func Load(lang string) {
    switch lang {
    case TW:
        Dict = tw.Dict
    case CN:
        Dict = cn.Dict
    default:
        Dict = us.Dict
    }
}

func IsValidLangCode(lang string) bool {
    if lang != TW && lang != US && lang != CN {
        return false
    }
    return true
}

// 字典檔key的紀錄
const (
    NoSupportMobile     = "NoSupportMobile"
    GameNoSupportMobile = "GameNoSupportMobile"
)
