package hello

import (
    "fmt"
    "net/http"
    "text/template"
    "github.com/spf13/viper"
    "goy/back/model/tpl_dto"
)


func Index(writer http.ResponseWriter, request *http.Request) {
    type IndexData struct {
        Description string
    }

    indexTemplate := template.New(viper.GetString("IndexFile"))
    indexTemplate.ParseFiles(viper.GetString("ExportDir") + viper.GetString("IndexFile"))
    data := tpl_dto.Container{
        Title: "hello!",
        Data: IndexData {
            Description: "Hello World",
        },
    }
    err := indexTemplate.Execute(writer, data)
    if err != nil {
        fmt.Printf("%+v", err)
    }
}
