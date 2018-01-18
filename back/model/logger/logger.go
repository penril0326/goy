package logger

import (
    "fmt"
    "encoding/json"
    "runtime"
    "bytes"
    "time"
    "goy/back/model/file"
)

const (
    AppErrorDebugStatus     = "debug"
    AppErrorInfoStatus      = "info"
    AppErrorExceptionStatus = "exception"
    AppErrorAlertStatus     = "alert"
)

var Path = ""

// 撰寫log的api函式，用法: logger.Write("debug", "it is a summary for example")
func Write(status, summary string) {
    appError := NewAppError(status, summary)
    go writeLog(appError)
}

// 撰寫log
func writeLog(appError *AppError) {
    if isValidStatus(appError.Status) == false {
        appError = NewAppError(AppErrorExceptionStatus, "write log with invalid status: "+appError.Status)
    }
    status := appError.Status
    logger := NewAppLog(Path)
    appErrorString, err := appError.Error()
    if err != nil {
        logger.WriteLog(status, err.Error())
    } else {
        logger.WriteLog(status, appErrorString)
    }
}

// 檢查是否為合法的狀態碼
func isValidStatus(status string) bool {
    if status != AppErrorDebugStatus && status != AppErrorInfoStatus &&
        status != AppErrorExceptionStatus && status != AppErrorAlertStatus {
        return false
    }
    return true
}

// 類別 AppLog, 紀錄專案所有執行的訊息
type AppLog struct {
    RootPath string
}

// 創建一個 AppLog 物件，並自動設定log檔存放目錄
func NewAppLog(logpath string) *AppLog {
    l := &AppLog{}
    l.RootPath = logpath
    return l
}

// 撰寫log到檔案裡面
func (l *AppLog) WriteLog(status, data string) error {
    f := &file.File{}
    switch status {
    case AppErrorDebugStatus:
        fallthrough
    case AppErrorInfoStatus:
        fallthrough
    case AppErrorExceptionStatus:
        fallthrough
    case AppErrorAlertStatus:
    default:
        status = AppErrorInfoStatus
    }
    fileName := l.getLogFileName(status)
    err := f.CreateFile(fileName)
    if err != nil {
        return err
    }
    err = f.WriteFile(fileName, data)
    if err != nil {
        return err
    }
    return nil
}

// 依據log狀態，取得目前時間的log檔案名稱(路徑+檔名)
func (l *AppLog) getLogFileName(status string) string {
    dir := AppErrorInfoStatus
    switch status {
    case AppErrorDebugStatus:
        dir = status
    case AppErrorInfoStatus:
        dir = status
    case AppErrorExceptionStatus:
        dir = status
    case AppErrorAlertStatus:
        dir = status
    }
    return l.RootPath + "/" + dir + "/" + time.Now().UTC().Format("2006-01-02-15") + ".log"
}

// 類別 AppError 整理並紀錄完善的錯誤訊息，以供後續查看
type AppError struct {
    Time    string
    Status  string
    Summary string
    Trace   string
}

// 新增一AppError物件，此物件會解析使用者的request，並記錄相關資料
func NewAppError(status string, summary string) *AppError {
    if isValidStatus(status) == false {
        status = AppErrorInfoStatus
    }
    e := &AppError{}
    e.Time = time.Now().UTC().String()
    e.Status = status
    e.Summary = summary
    e.Trace = e.getStackTrace(false)
    return e
}

// 取得錯誤訊息
func (e *AppError) Error() (string, error) {
    s, err := e.getString()
    if err != nil {
        return "", err
    }
    return fmt.Sprintf("%s", s), nil
}

// 將錯誤資料整理成json字串
func (e *AppError) getString() (string, error) {
    result, err := json.Marshal(e)
    if err != nil {
        return "", err
    }
    return fmt.Sprintf("%s", result), nil
}

// 取得程式執行紀錄(stack trace)，參數all代表是否取出不同goroutine的執行紀錄
func (e *AppError) getStackTrace(all bool) string {
    buf := make([]byte, 64)
    for {
        size := runtime.Stack(buf, all)
        if size == len(buf) {
            buf = make([]byte, len(buf)<<1)
            continue
        }
        break
    }
    return string(bytes.Trim(buf, "\x00"))
}
