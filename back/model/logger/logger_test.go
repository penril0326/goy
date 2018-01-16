package logger

import (
    "testing"
    "encoding/json"
    "fmt"
    "os"
    "goy/back/model/file"
    "strings"
)


func TestAppLog(t *testing.T) {
    l := NewAppLog()
    l.RootPath = l.RootPath + "unitest/"
    err := createTestFiles(l.RootPath)
    defer removeTestFiles(l.RootPath)
    if err != nil {
        t.Fatalf("Test AppLog failed, get error: %s", err.Error())
    }
    f := file.File{}

    //---------- info test
    fileName := l.getLogFileName(AppErrorInfoStatus)
    err = l.WriteLog(AppErrorInfoStatus, "this is a log text for info testing.")
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in info test, get error: %s", err.Error())
    }
    data, err := f.ReadFile(fileName)
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in info test, get error: %s", err.Error())
    }
    expect := `this is a log text for info testing.
`
    if strings.Compare(string(data), expect) != 0 {
        t.Errorf("Test AppLog.WriteLog failed in info test, no get expect output")
    }

    //---------- debug test
    fileName = l.getLogFileName(AppErrorDebugStatus)
    err = l.WriteLog(AppErrorDebugStatus, "this is a log text for debug testing.")
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in debug test, get error: %s", err.Error())
    }
    data, err = f.ReadFile(fileName)
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in debug test, get error: %s", err.Error())
    }
    expect = `this is a log text for debug testing.
`
    if strings.Compare(string(data), expect) != 0 {
        t.Errorf("Test AppLog.WriteLog failed in debug test, no get expect output")
    }

    //---------- exception test
    fileName = l.getLogFileName(AppErrorExceptionStatus)
    err = l.WriteLog(AppErrorExceptionStatus, "this is a log text for exception testing.")
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in exception test, get error: %s", err.Error())
    }
    data, err = f.ReadFile(fileName)
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in exception test, get error: %s", err.Error())
    }
    expect = `this is a log text for exception testing.
`
    if strings.Compare(string(data), expect) != 0 {
        t.Errorf("Test AppLog.WriteLog failed in exception test, no get expect output")
    }

    //---------- alert test
    fileName = l.getLogFileName(AppErrorAlertStatus)
    err = l.WriteLog(AppErrorAlertStatus, "this is a log text for alert testing.")
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in alert test, get error: %s", err.Error())
    }
    data, err = f.ReadFile(fileName)
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in alert test, get error: %s", err.Error())
    }
    expect = `this is a log text for alert testing.
`
    if strings.Compare(string(data), expect) != 0 {
        t.Errorf("Test AppLog.WriteLog failed in alert test, no get expect output")
    }

    //---------- invalid status name test
    fileName = l.getLogFileName(AppErrorInfoStatus)
    err = l.WriteLog("invalid status", "this is a log text for invalid status testing.")
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in invalid status test, get error: %s", err.Error())
    }
    data, err = f.ReadFile(fileName)
    if err != nil {
        t.Errorf("Test AppLog.WriteLog failed in invalid status test, get error: %s", err.Error())
    }
    expect = `this is a log text for info testing.
this is a log text for invalid status testing.
`
    if strings.Compare(string(data), expect) != 0 {
        t.Errorf("Test AppLog.WriteLog failed in invalid status test, no get expect output")
    }
}

func createTestFiles(path string) error {
    if _, err := os.Stat(path); os.IsNotExist(err) {
        err = os.MkdirAll(path, os.FileMode(0755))
        if err != nil {
            return err
        }
    }
    infoPath := path + "info/"
    if _, err := os.Stat(infoPath); os.IsNotExist(err) {
        err =os.MkdirAll(infoPath, os.FileMode(0755))
        if err != nil {
            return err
        }
    }
    debugPath := path + "debug/"
    if _, err := os.Stat(debugPath); os.IsNotExist(err) {
        err = os.MkdirAll(debugPath, os.FileMode(0755))
        if err != nil {
            return err
        }
    }
    exceptionPath := path + "exception/"
    if _, err := os.Stat(exceptionPath); os.IsNotExist(err) {
        err = os.MkdirAll(exceptionPath, os.FileMode(0755))
        if err != nil {
            return err
        }
    }
    alertPath := path + "alert/"
    if _, err := os.Stat(alertPath); os.IsNotExist(err) {
        err = os.MkdirAll(alertPath, os.FileMode(0755))
        if err != nil {
            return err
        }
    }
    return nil
}

func removeTestFiles(path string) {
    os.RemoveAll(path)
}


func TestAppError(t *testing.T) {
    //-------------normal test
    appError := NewAppError(AppErrorExceptionStatus, "It is a test for exception error")
    object := AppError{}
    errorString, err := appError.Error()
    if err != nil {
        t.Fatalf("Test AppError.Error failed, get error: %s", err.Error())
    }
    err = json.Unmarshal([]byte(errorString), &object)
    if err != nil {
        t.Fatalf("Test AppError.Error failed, get error: %s", err.Error())
    }
    if object.Status != AppErrorExceptionStatus {
        t.Errorf("Test AppError.Error failed, no get expect status")
    }
    if object.Summary != "It is a test for exception error" {
        t.Errorf("Test AppError.Error failed, no get expect summary")
    }

    //-------------empty test
    empty := AppError{}
    appError = &AppError{}
    object = AppError{}
    errorString, err = appError.Error()
    err = json.Unmarshal([]byte(errorString), &object)
    if  fmt.Sprintf("%s", object) != fmt.Sprintf("%s", empty){
        t.Errorf("Test AppError.Error failed in empty test, no get expect output")
    }
}
