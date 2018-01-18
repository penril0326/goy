package deploy

import (
    "fmt"
    "net/http"
    "goy/back/controller/downstairs"
    "goy/back/model/loader"
    "github.com/gorilla/mux"
    "os"
    "goy/back/model/logger"
    "path"
)

func init() {
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
                    loader.Json.GetString("ExportDir")+"assets/",
                ),
            ),
        ),
    ).Methods("GET")
    http.Handle("/", router)
}
