const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const mysql = require('mysql2')
const classifyText = require('./services/textClassifier')
const recommendTags = require('./services/tagRecommender')


const app = express()

// ================= JSON =================
app.use(express.json())


// ================= uploads =================
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
    console.log('uploads 文件夹已创建')
}
app.use('/uploads', express.static(uploadDir))

// ================= 数据库 =================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'speech_app'
})

db.connect(err => {
    if (err) console.error(err)
    else console.log('数据库连接成功')
})

// ================= multer =================
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir)
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

// ================= 登录/注册 =================
app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.json({ code: 400, msg: '用户名和密码不能为空' })

    db.query(
        'SELECT * FROM user WHERE username = ?',
        [username],
        (err, rows) => {
            if (err) return res.json({ code: 500, msg: '数据库错误' })

            if (rows.length > 0) {
                const user = rows[0]
                if (user.password === password) {
                    // 登录成功
                    res.json({ code: 200, user })
                } else {
                    res.json({ code: 401, msg: '密码错误' })
                }
            } else {
                // 用户不存在 → 注册
                db.query(
                    'INSERT INTO user (username, password) VALUES (?, ?)',
                    [username, password],
                    (err, result) => {
                        if (err) return res.json({ code: 500, msg: '注册失败' })
                        const newUser = {
                            id: result.insertId,
                            username,
                            password,
                            avatar_path: ''
                        }
                        res.json({ code: 200, user: newUser })
                    }
                )
            }
        }
    )
})

// ================= 上传头像 =================
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) return res.json({ code: 400, msg: '没有接收到文件' })

    const userId = req.body.id
    const avatarUrl = `http://127.0.0.1:3000/uploads/${req.file.filename}`

    db.query(
        'UPDATE user SET avatar_path = ? WHERE id = ?',
        [avatarUrl, userId],
        err => {
            if (err) return res.json({ code: 500, msg: '数据库更新失败' })
            res.json({ code: 200, avatar: avatarUrl })
        }
    )
})

// ================= 文本分析 =================
app.post('/text/analyze', (req, res) => {
    const { text } = req.body
    if (!text) return res.json({ code: 400, msg: '文本不能为空' })

    const category = classifyText(text)
    const tags = recommendTags(text)

    res.json({ code: 200, data: { category, tags } })
})


// ================= 语音转文字（预留） =================
app.post('/speech/to-text', upload.single('audio'), (req, res) => {
    res.json({
        code: 501,
        data: {
            text: ''
        },
        msg: '语音转文字功能暂未实现'
    })
})

// ================= record 表接口 =================

// 获取用户所有记录
app.get('/text/records', (req, res) => {
    const userId = req.query.user_id
    if (!userId) return res.json({ code: 400, msg: '用户ID不能为空' })

    db.query('SELECT * FROM record WHERE user_id = ?', [userId], (err, rows) => {
        if (err) return res.json({ code: 500, msg: err.message })
        res.json({ code: 200, data: rows })
    })
})

// 添加记录
app.post('/text/record/add', (req, res) => {
    const { user_id, text, category, tags, example, is_important } = req.body
    db.query(
        'INSERT INTO record (user_id, text, category, tags, example, is_important) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, text, category, JSON.stringify(tags || []), example || '', is_important || 0],
        (err, result) => {
            if (err) return res.json({ code: 500, msg: err.message })
            res.json({ code: 200, success: true, id: result.insertId })
        }
    )
})

// 删除记录
app.post('/text/record/delete', (req, res) => {
    const { id } = req.body
    db.query('DELETE FROM record WHERE id = ?', [id], (err) => {
        if (err) return res.json({ code: 500, msg: err.message })
        res.json({ code: 200, success: true })
    })
})

// 更新重点状态
app.post('/text/record/update', (req, res) => {
    const { id, isImportant } = req.body
    db.query(
        'UPDATE record SET is_important = ? WHERE id = ?',
        [isImportant ? 1 : 0, id],
        (err) => {
            if (err) return res.json({ code: 500, msg: err.message })
            res.json({ code: 200, success: true })
        }
    )
})

// 批量删除
app.post('/text/record/deleteBatch', (req, res) => {
    const { ids } = req.body
    if (!ids || !ids.length) return res.json({ code: 400, msg: 'ids不能为空' })

    db.query('DELETE FROM record WHERE id IN (?)', [ids], (err) => {
        if (err) return res.json({ code: 500, msg: err.message })
        res.json({ code: 200, success: true })
    })
})

// ================= 测试接口 =================
app.get('/test', (req, res) => {
    res.send('Node 服务正常')
})

// ================= 启动 =================
app.listen(3000, '0.0.0.0', () => {
    console.log('Node 启动：http://127.0.0.1:3000')
})

module.exports = { db, app }