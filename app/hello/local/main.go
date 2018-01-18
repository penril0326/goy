package main

import (
    "log"
    "fmt"
    "net/http"
    "goy/back/model/loader"
    "goy/back/controller/hello"
    "github.com/gorilla/mux"
)

func main() {
    // 讀取全域設定檔
    err := loader.Json.Load("config.json")
    if err != nil {
        panic(fmt.Errorf("Fatal error config file: %s \n", err))
    }
    // 路由與controller的對應配置
    router := mux.NewRouter()
    router.HandleFunc("/", hello.Index).Methods("GET")
    router.PathPrefix("/assets").Handler(
        http.StripPrefix(
            "/assets",
            http.FileServer(
                http.Dir(
                    loader.Json.GetString("ExportDir") + "assets/",
                ),
            ),
        ),
    ).Methods("GET")
    http.Handle("/", router)
    // 開始監聽服務
    err = http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal("occur error here: ", err.Error())
    }
}
