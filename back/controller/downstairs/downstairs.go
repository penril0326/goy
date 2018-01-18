package downstairs

import (
    "net/http"
    "text/template"
    "goy/back/model/loader"
    "goy/back/model/tpl_dto"
    "goy/back/model/client"
    "goy/back/model/logger"
    "goy/back/model/i18n"
    "goy/back/model/cookie"
    "path"
    "os"
    "fmt"
)

func Index(writer http.ResponseWriter, request *http.Request) {
    wd, err := os.Getwd()
    if err != nil {
        panic(fmt.Errorf("Fatal error working directory: %s \n", err))
    }
    geodbFile := path.Dir(wd + loader.Json.GetString("RootDir") + "back/external/")
    geodbFile = geodbFile + "/GeoLite2-Country.mmdb"
    c, err := client.NewClient(request, geodbFile)
    if err != nil {
        logger.Write(logger.AppErrorExceptionStatus, err.Error())
        http.Error(writer, "Server Error", http.StatusInternalServerError)
        return
    }
    i18n.Load(c.Lang)
    if c.IsUseMobile {
        http.Error(writer, i18n.Dict[i18n.GameNoSupportMobile], http.StatusServiceUnavailable)
        return
    }
    langCookie, err := request.Cookie(loader.Json.GetString("LangCookieName"))
    if err == http.ErrNoCookie || (!i18n.IsValidLangCode(langCookie.Value)) {
        resultCookie := cookie.NewDefault(
            loader.Json.GetString("LangCookieName"),
            c.Lang,
            loader.Json.GetBool("TLS"),
            false,
        )
        http.SetCookie(writer, resultCookie)
    }
    
    indexTemplate := template.New(loader.Json.GetString("IndexFile"))
    indexTemplate.ParseFiles(loader.Json.GetString("ExportDir") + loader.Json.GetString("IndexFile"))
    data := tpl_dto.Container{
        Title: "Downstairs",
        Data:  "",
    }
    err = indexTemplate.Execute(writer, data)
    if err != nil {
        logger.Write(logger.AppErrorExceptionStatus, err.Error())
    }
}
