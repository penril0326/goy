package hello

import (
    "fmt"
    "net/http"
    "text/template"
    "goy/back/model/loader"
    "goy/back/model/tpl_dto"
)

func Index(writer http.ResponseWriter, request *http.Request) {
    type IndexData struct {
        Description string
    }
    indexTemplate := template.New(loader.Json.GetString("IndexFile"))
    indexTemplate.ParseFiles(loader.Json.GetString("ExportDir") + loader.Json.GetString("IndexFile"))
    data := tpl_dto.Container{
        Title: "hello!",
        Data: IndexData{
            Description: "Hello World",
        },
    }
    err := indexTemplate.Execute(writer, data)
    if err != nil {
        fmt.Printf("%+v", err)
    }
}
