package main

import (
    "log"
    "goy/back/model/loader"
    "fmt"
    "github.com/gorilla/mux"
    "goy/back/controller/downstairs"
    "goy/back/model/logger"
    "net/http"
    "path"
    "os"
)

func main() {
    // 讀取全域設定檔
    err := loader.Json.Load("config.json")
    if err != nil {
        panic(fmt.Errorf("Fatal error config file: %s \n", err))
    }
    
    // 設定logger目錄
    wd, err := os.Getwd()
    if err != nil {
        panic(fmt.Errorf("Fatal error working directory: %s \n", err))
    }
    logger.Path = path.Dir(wd + loader.Json.GetString("RootDir") + "back/log/")
    
    // 路由與controller的對應配置
    router := mux.NewRouter()
    router.HandleFunc("/", downstairs.Index).Methods("GET")
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
