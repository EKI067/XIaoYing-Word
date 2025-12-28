// server.js
const express = require('express')
const cors = require('cors')
const CryptoJS = require('crypto-js')
const request = require('request')

const app = express()
const port = 3000

// 讯飞配置
const config = {
  hostUrl: "https://ntrans.xfyun.cn/v2/ots",
  host: "ntrans.xfyun.cn",
  appid: "712b7555",
  apiSecret: "ZDQ4ZmU0OTA4ODdjMDVjNzYyNjVjYmUy",
  apiKey: "1b2e3e61a7fb387f9f214c0b9edec991",
  uri: "/v2/ots"
}

app.use(cors())
app.use(express.json())

// 翻译接口
app.post('/translate', (req, res) => {
  const { text, from, to } = req.body

  if (!text || !from || !to) {
    return res.status(400).json({
      code: 400,
      message: '缺少必要参数: text, from, to'
    })
  }

  const date = new Date().toUTCString()
  const postBody = getPostBody(text, from, to)
  const digest = getDigest(postBody)

  const options = {
    url: config.hostUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json,version=1.0',
      'Host': config.host,
      'Date': date,
      'Digest': digest,
      'Authorization': getAuthStr(date, digest)
    },
    json: true,
    body: postBody
  }

  request.post(options, (err, response, body) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: '请求讯飞API失败: ' + err.message
      })
    }

    if (body.code !== 0) {
      return res.status(400).json({
        code: body.code,
        message: `讯飞API错误: ${body.message}`
      })
    }

    res.json({
      code: 0,
      data: body.data,
      message: '翻译成功'
    })
  })
})

// 辅助函数（从你的ots-node.js复制）
function getPostBody(text, from, to) {
  return {
    common: { app_id: config.appid },
    business: { from: from, to: to },
    data: { text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text)) }
  }
}

function getDigest(body) {
  return 'SHA-256=' + CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(body)))
}

function getAuthStr(date, digest) {
  let signatureOrigin = `host: ${config.host}\ndate: ${date}\nPOST ${config.uri} HTTP/1.1\ndigest: ${digest}`
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
  let signature = CryptoJS.enc.Base64.stringify(signatureSha)
  return `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`
}

app.listen(port, () => {
  console.log(`翻译服务运行在 http://localhost:${port}`)
})