package client

import (
    "testing"
    "net/http/httptest"
)

func TestClient(t *testing.T) {
    req := httptest.NewRequest("GET", "http://example.com/foo", nil)
    req.Header.Add("Accept-Language", "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6")
    req.Header.Add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36")
    req.RemoteAddr = "114.25.150.22:16"
    c, err := NewClient(req)
    if err != nil {
        t.Fatalf("Test ClientManager failed, can't create client, get err: %s", err)
    }
    if c.IP != "114.25.150.22" {
        t.Errorf("Test ClientManager failed, no get expect ip")
    }
    if c.Country != "Taiwan" {
        t.Errorf("Test ClientManager failed, no get expect country")
    }
    if c.IsoCode != "TW" {
        t.Errorf("Test ClientManager failed, no get expect iso code")
    }
    if c.Lang != "TW" {
        t.Errorf("Test ClientManager failed, no get expect lang")
    }
    if c.Device != "Macintosh" {
        t.Errorf("Test ClientManager failed, no get expect device")
    }
    if c.Browser != "Chrome" {
        t.Errorf("Test ClientManager failed, no get expect browser")
    }
    if c.BrowserVersion != "63.0.3239.132" {
        t.Errorf("Test ClientManager failed, no get expect browser version")
    }
    if c.IsUseMobile != false {
        t.Errorf("Test ClientManager failed, no get expect is-use-mobile ")
    }
}
