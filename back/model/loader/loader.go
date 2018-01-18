package loader

import (
    "time"
    "goy/back/model/map_util"
    "goy/back/model/file"
    "errors"
    "bytes"
    "encoding/json"
    "github.com/spf13/cast"
    "strings"
    "strconv"
)

type Loader interface {
    Load(file string) error
    Get(name string) interface{}
    GetString(name string) string
    GetBool(name string) bool
    GetInt(name string) int
    GetInt64(name string) int64
    GetFloat64(name string) float64
    GetTime(name string) time.Time
    GetDuration(name string) time.Duration
    GetStringSlice(name string) []string
    GetStringMap(name string) map[string]interface{}
    GetStringMapString(name string) map[string]string
    GetStringMapStringSlice(name string) map[string][]string
}

var Json *JsonLoader
func init() {
    Json = &JsonLoader{
        delimiter: ".",
        f: &file.File{},
    }
}

type JsonLoader struct {
    delimiter string
    dataName  string
    f         *file.File
    data      map[string]interface{}
}

func (j *JsonLoader) sliceToMap(s []interface{}) map[string]interface{}{
    result := make(map[string]interface{})
    for i := 0; i < len(s); i++ {
        result[strconv.Itoa(i)] = s[i]
    }
    return result
}

func (j *JsonLoader) find(name string, data map[string]interface{}) interface{} {
    if _, ok := data[name]; ok {
        return data[name]
    } else {
        return nil
    }
}

func (j *JsonLoader) Load(file string) error {
    if !j.f.IsExist(file) {
        return errors.New("JsonLoader load file failed, file not exist")
    }
    fileData, err := j.f.ReadFile(file)
    if err != nil {
        return err
    }
    data := make(map[string]interface{})
    in := bytes.NewReader(fileData)
    buf := new(bytes.Buffer)
    buf.ReadFrom(in)
    if err := json.Unmarshal(buf.Bytes(), &data); err != nil {
        return errors.New("JsonLoader parse file failed, get error: " + err.Error())
    }
    j.data = data
    return nil
}

func (j *JsonLoader) Get(name string) interface{} {
    if name == "" {
        return nil
    }
    var result interface{}
    path := strings.Split(name, j.delimiter)
    data := j.data
    for i := 0; i < len(path); i++ {
        result = j.find(path[i], data)
        if result == nil {
            return nil
        }
        if i == len(path) - 1 {
            return result
        }
        switch v := result.(type) {
        case map[interface{}]interface{}:
            data = map_util.Copy(cast.ToStringMap(v))
        case map[string]interface{}:
            data = map_util.Copy(v)
        case []interface{}:
            data = map_util.Copy(j.sliceToMap(v))
        default:
            return nil
        }
    }
    return nil
}

func (j *JsonLoader) GetString(name string) string {
    return cast.ToString(j.Get(name))
}

func (j *JsonLoader) GetBool(name string) bool {
    return cast.ToBool(j.Get(name))
}

func (j *JsonLoader) GetInt(name string) int {
    return cast.ToInt(j.Get(name))
}

func (j *JsonLoader) GetInt64(name string) int64 {
    return cast.ToInt64(j.Get(name))
}

func (j *JsonLoader) GetFloat64(name string) float64 {
    return cast.ToFloat64(j.Get(name))
}

func (j *JsonLoader) GetTime(name string) time.Time {
    return cast.ToTime(j.Get(name))
}

func (j *JsonLoader) GetDuration(name string) time.Duration {
    return cast.ToDuration(j.Get(name))
}

func (j *JsonLoader) GetStringSlice(name string) []string {
    return cast.ToStringSlice(j.Get(name))
}

func (j *JsonLoader) GetStringMap(name string) map[string]interface{} {
    return cast.ToStringMap(j.Get(name))
}

func (j *JsonLoader) GetStringMapString(name string) map[string]string {
    return cast.ToStringMapString(j.Get(name))
}

func (j *JsonLoader) GetStringMapStringSlice(name string) map[string][]string {
    return cast.ToStringMapStringSlice(j.Get(name))
}
