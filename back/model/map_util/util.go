package map_util

import "github.com/spf13/cast"

func Find(name string, data map[string]interface{}) (bool, interface{}) {
    if _, ok := data[name]; ok {
        return true, data[name]
    }
    var result interface{}
    var find = false
    for _, val := range data {
        switch v := val.(type) {
        case map[interface{}]interface{}:
            find, result = Find(name, Copy(cast.ToStringMap(v)))
        case map[string]interface{}:
            find, result = Find(name, Copy(v))
        }
        if find {
            return find, result
        }
    }
    return find, result
}

func Copy(m map[string]interface{}) map[string]interface{} {
    copyMap := make(map[string]interface{})
    for key, val := range m {
        switch v := val.(type) {
        case map[interface{}]interface{}:
            copyMap[key] = Copy(cast.ToStringMap(v))
        case map[string]interface{}:
            copyMap[key] = Copy(v)
        default:
            copyMap[key] = v
        }
    }
    return copyMap
}
