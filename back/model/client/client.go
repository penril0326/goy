package client

import (
    "net/http"
    "goy/back/model/realip"
    "github.com/mssola/user_agent"
    "github.com/oschwald/geoip2-golang"
    "net"
    "strings"
    "runtime"
    "path"
)

type Client struct {
    IP             string
    Country        string
    IsoCode        string
    Lang           string
    Device         string
    Browser        string
    BrowserVersion string
    IsUseMobile    bool
    request        http.Request
}

func NewClient(req *http.Request) (*Client, error) {
    _, filename, _, ok := runtime.Caller(0)
    if !ok {
        panic("No caller information")
    }
    geoDbPath := path.Dir(filename) + "/GeoLite2-Country.mmdb"
    c := &Client{}
    c.IP = realip.FromRequest(req)
    err := c.initCountry(geoDbPath)
    if err != nil {
        return nil, err
    }
    c.initLang(req, c.IsoCode)
    ua := user_agent.New(req.UserAgent())
    c.Device = ua.Platform()
    c.Browser, c.BrowserVersion = ua.Browser()
    c.IsUseMobile = ua.Mobile()
    c.request = *req
    return c, nil
}

func (c *Client) initCountry(geoDbPath string) error {
    db, err := geoip2.Open(geoDbPath)
    if err != nil {
        return err
    }
    defer db.Close()
    ip := net.ParseIP(c.IP)
    record, err := db.Country(ip)
    if err != nil {
        return err
    }
    c.Country = record.Country.Names["en"]
    c.IsoCode = record.Country.IsoCode
    return nil
}

func (c *Client) initLang(req *http.Request, defaultLang string) {
    // US, TW, CN
    accept := req.Header.Get("Accept-Language")
    lang := strings.Trim(accept, " ")
    if lang == "" {
        lang = defaultLang
    }
    if strings.Contains(lang, ";") {
        all := strings.Split(lang, ";")
        if len(all) <= 0 || all[0] == "" {
            lang = defaultLang
        } else {
            lang = all[0]
        }
    }
    if strings.Contains(lang, ",") {
        all := strings.Split(lang, ",")
        if len(all) <= 0 || all[0] == "" {
            lang = defaultLang
        } else {
            lang = all[0]
        }
    }
    switch lang {
    case "zh":
        fallthrough
    case "tw":
        fallthrough
    case "TW":
        fallthrough
    case "zh-TW":
        lang = "TW"
    case "cn":
        fallthrough
    case "CN":
        fallthrough
    case "zh-CN":
        lang = "CN"
    default:
        lang = "US"
    }
    c.Lang = lang
}
