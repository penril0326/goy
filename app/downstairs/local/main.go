package main

import (
    "log"
    "github.com/spf13/viper"
    "fmt"
    "github.com/gorilla/mux"
    "goy/back/controller/downstairs"
    "net/http"
)

func main() {
    // 讀取全域設定檔
    viper.SetConfigName("config")
    viper.AddConfigPath("./")
    err := viper.ReadInConfig()
    if err != nil {
        panic(fmt.Errorf("Fatal error config file: %s \n", err))
    }
    // 路由與controller的對應配置
    router := mux.NewRouter()
    router.HandleFunc("/", downstairs.Index).Methods("GET")
    router.PathPrefix("/assets").Handler(
        http.StripPrefix(
            "/assets",
            http.FileServer(
                http.Dir(
                    viper.GetString("ExportDir") + "assets/",
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
