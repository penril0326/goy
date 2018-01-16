package codec

import (
    "crypto/cipher"
    "crypto/rand"
    "crypto/aes"
    "errors"
    "encoding/hex"
    "strings"
    "fmt"
    "io"
    "bytes"
    "encoding/gob"
)

// Codec介面，加解密器，可將資料加解密
type Codec interface {
    Encode(value interface{}) (string, error)
    Decode(value string, dst interface{}) error
}

// 介面Serializer，資料序列化，可將資料轉換成字串型態的bytes
type Serializer interface {
    Serialize(src interface{}) ([]byte, error)
    Deserialize(src []byte, dst interface{}) error
}

// 取得一AesCodec的物件。
func NewAesCodec(key string) *AesCodec {
    if len(key) % aes.BlockSize != 0 {
        key = string(AutoAddPadding([]byte(key), "="))
    }
    return &AesCodec{
        Key: key,
        Padding: "=",
        Encoder: &GobEncoder{},
    }
}

// 類別AesCodec，使用AES CBC來做資料的加解密
type AesCodec struct {
    Key string
    Padding string
    Encoder Serializer
}

// 執行AES的CBC加密
func (c *AesCodec) Encode(value interface{}) (string, error) {
    var empty interface{}
    if value == nil || value == empty {
        return "", errors.New("aes encode error, nil value input")
    }

    b, err := c.Encoder.Serialize(value)
    if err != nil {
        return "", err
    }
    if len(b) % aes.BlockSize != 0 {
        b = AutoAddPadding(b, c.Padding)
    }
    block, err := aes.NewCipher([]byte(c.Key))
    if err != nil {
        return "", err
    }
    cipherText := make([]byte, aes.BlockSize + len(b))
    iniVector := cipherText[:aes.BlockSize]
    if _, err := io.ReadFull(rand.Reader, iniVector); err != nil {
        return "", err
    }
    cbcMode := cipher.NewCBCEncrypter(block, iniVector)
    cbcMode.CryptBlocks(cipherText[aes.BlockSize:], b)
    return fmt.Sprintf("%x", cipherText), nil
}

// 執行AES的CBC解密
func (c *AesCodec) Decode(value string, dst interface{}) error {
    var empty interface{}
    if dst ==nil || dst == empty {
        return errors.New("aes decode error, nil dst input")
    }
    if value == "" {
        return errors.New("aes decode error, empty value input")
    }

    cipherText, err := hex.DecodeString(value)
    if err != nil {
        return err
    }

    block, err := aes.NewCipher([]byte(c.Key))
    if err != nil {
        return err
    }

    if len(cipherText) < aes.BlockSize {
        return err
    }
    iniVector := cipherText[:aes.BlockSize]
    cipherText = cipherText[aes.BlockSize:]

    if len(cipherText) % aes.BlockSize != 0 {
        return err
    }
    cbcMode := cipher.NewCBCDecrypter(block, iniVector)
    cbcMode.CryptBlocks(cipherText, cipherText)

    serializeString := strings.TrimRight(fmt.Sprintf("%s", cipherText), c.Padding)
    err = c.Encoder.Deserialize([]byte(serializeString), dst)
    if err != nil {
        return err
    }
    return nil
}

// 自動填充，將明文字串填充至可被AES CBC加解密的size
func AutoAddPadding(b []byte, padding string) []byte{
    s := string(b)
    for {
        if len(s) % aes.BlockSize != 0 {
            s = s + string(padding)
        } else {
            break
        }
    }
    return []byte(s)
}

// 類型Gob編碼器，實現介面Serializer，用go語言內建的Gob套件來完成資料序列化
type GobEncoder struct{}

// 使用gob將輸入的物件或資料序列化
func (e *GobEncoder) Serialize(src interface{}) ([]byte, error) {
    var empty interface{}
    if src == nil || src == empty{
        return nil, errors.New("gob encode error, nil src input")
    }
    buf := new(bytes.Buffer)
    enc := gob.NewEncoder(buf)
    if err := enc.Encode(src); err != nil {
        return nil, err
    }
    return buf.Bytes(), nil
}

// 使用gob將序列化後的資料還原成原始物件或資料
func (e *GobEncoder) Deserialize(src []byte, dst interface{}) error {
    var empty interface{}
    if dst ==nil || dst == empty {
        return errors.New("gob decode error, nil dst input")
    }
    if src == nil {
        return errors.New("gob decode error, nil src input")
    }
    dec := gob.NewDecoder(bytes.NewBuffer(src))
    if err := dec.Decode(dst); err != nil {
        return err
    }
    return nil
}
