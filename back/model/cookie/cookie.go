package cookie

import (
    "net/http"
    "time"
)

// 產生一組cookie物件
func NewCookie(name, value, path, domain string, maxAge int, secure, httpOnly bool) *http.Cookie {
    cookie := &http.Cookie{
        Name:     name,
        Value:    value,
        Path:     path,
        Domain:   domain,
        MaxAge:   maxAge,
        Secure:   secure,
        HttpOnly: httpOnly,
    }
    if maxAge > 0 {
        d := time.Duration(maxAge) * time.Second
        cookie.Expires = time.Now().Add(d)
    } else if maxAge < 0 {
        cookie.Expires = time.Unix(1, 0)
    }
    return cookie
}

func NewDefault(name, value string, secure, httpOnly bool) *http.Cookie {
    cookie := &http.Cookie{
        Name:     name,
        Value:    value,
        MaxAge:   86400 * 30,
        Secure:   secure,
        HttpOnly: httpOnly,
    }
    return cookie
}

// 從server刪除client端的一組cookie
func DeleteCookie(writer http.ResponseWriter, name string) {
    cookie := NewCookie(name, "", "", "",
        -1, false, true)
    http.SetCookie(writer, cookie)
}
