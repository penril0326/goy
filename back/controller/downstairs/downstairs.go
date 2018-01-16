package downstairs

import (
    "net/http"
    "text/template"
    "github.com/spf13/viper"
    "goy/back/model/tpl_dto"
    "goy/back/model/client"
    "goy/back/model/logger"
    "goy/back/model/i18n"
    "goy/back/model/cookie"
)

func Index(writer http.ResponseWriter, request *http.Request) {
    c, err := client.NewClient(request)
    if err != nil {
        logger.Write(logger.AppErrorExceptionStatus, "test error")
        http.Error(writer, "Server Error", http.StatusInternalServerError)
        return
    }
    i18n.Load(c.Lang)
    if c.IsUseMobile {
        http.Error(writer, i18n.Dict[i18n.GameNoSupportMobile], http.StatusServiceUnavailable)
        return
    }
    langCookie, err := request.Cookie(viper.GetString("LangCookieName"))
    if err == http.ErrNoCookie || (!i18n.IsValidLangCode(langCookie.Value)) {
        resultCookie := cookie.NewDefault(
            viper.GetString("LangCookieName"),
            c.Lang,
            viper.GetBool("TLS"),
            true,
        )
        http.SetCookie(writer, resultCookie)
    }

    indexTemplate := template.New(viper.GetString("IndexFile"))
    indexTemplate.ParseFiles(viper.GetString("ExportDir") + viper.GetString("IndexFile"))
    data := tpl_dto.Container{
        Title: "Downstairs",
        Data: "",
    }
    err = indexTemplate.Execute(writer, data)
    if err != nil {
        logger.Write(logger.AppErrorExceptionStatus, err.Error())
    }
}
