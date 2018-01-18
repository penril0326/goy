package loader

import (
    "testing"
    "goy/back/model/file"
    "os"
    "fmt"
)

func TestJsonLoader(t *testing.T) {
    f := &file.File{}
    dir, err := os.Getwd()
    if err != nil {
        t.Fatalf("test JsonLoader failed, cant create test file, get error: %s", err.Error())
    }
    if !f.IsExist(dir + "/test.json") {
        err = f.CreateFile(dir + "/test.json")
        if err != nil {
            t.Fatalf("test JsonLoader failed, cant create test file, get error: %s", err.Error())
        }
    }
    err = f.CoverFile(
        dir + "/test.json",
        `{
  "a": 123,
  "b": true,
  "c": "abc",
  "d": {
    "d1": 456,
    "d2": false,
    "d3": "d3d3d3",
    "d4": 13.5
  },
  "e": [
    "e23",
    "e45",
    "e67",
    {
      "e1": "you"
    }
  ],
  "h": {
    "h1": {
      "h2": 123
    }
  }
}`,
true,
    )
    if err != nil {
        t.Fatalf("test JsonLoader failed, cant write test file, get error: %s", err.Error())
    }
    
    err = Json.Load("./test.json")
    if err != nil {
        t.Fatalf("test JsonLoader failed, cant load test file, get error: %s", err.Error())
    }
    
    test1 := Json.Get("e.3.e1")
    if test1 != "you" {
        t.Errorf("test JsonLoader failed, expected %v, get %v", "you", test1)
    }
    
    test2 := Json.GetInt("a")
    if test2 != 123 {
        t.Errorf("test JsonLoader failed, expected %v, get %v", 123, test2)
    }
    
    test3 := Json.GetBool("b")
    if test3 != true {
        t.Errorf("test JsonLoader failed, expected %v, get %v", true, test3)
    }
    
    test4 := Json.GetString("c")
    if test4 != "abc" {
        t.Errorf("test JsonLoader failed, expected %v, get %v", "abc", test4)
    }
    
    test5 := Json.GetStringMap("d")
    expect5 := map[string]interface{} {
        "d1": 456,
        "d2": false,
        "d3": "d3d3d3",
        "d4": 13.5,
    }
    if fmt.Sprintf("%v", test5["d1"]) != fmt.Sprintf("%v", expect5["d1"]) {
        t.Errorf("test JsonLoader failed, expected %v, get %v", expect5["d1"], test5["d1"])
    }
    if test5["d2"] != expect5["d2"] {
        t.Errorf("test JsonLoader failed, expected %v, get %v", expect5["d2"], test5["d2"])
    }
    if test5["d3"] != expect5["d3"] {
        t.Errorf("test JsonLoader failed, expected %v, get %v", expect5["d3"], test5["d3"])
    }
    if test5["d4"] != expect5["d4"] {
        t.Errorf("test JsonLoader failed, expected %v, get %v", expect5["d4"], test5["d4"])
    }
    
    test6 := Json.GetInt("d.d1")
    if test6 != 456 {
        t.Errorf("test JsonLoader failed, expected %v, get %v", 456, test6)
    }
    
    test7 := Json.Get("g")
    if test7 != nil {
        t.Errorf("test JsonLoader failed, invalid input, no get nil result")
    }
    
    test8 := Json.GetInt("h.h1.h2")
    if test8 != 123 {
        t.Errorf("test JsonLoader failed, expected %v, get %v", 123, test8)
    }
}
