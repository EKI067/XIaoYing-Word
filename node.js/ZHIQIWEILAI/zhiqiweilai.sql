-- 删除旧表（如果存在）
DROP TABLE IF EXISTS user;

-- 创建新表
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,      -- 用户唯一ID
    username VARCHAR(50) NOT NULL UNIQUE,   -- 用户名，唯一
    password VARCHAR(255) NOT NULL,         -- 密码
    avatar_path VARCHAR(255) DEFAULT '',    -- 头像路径
    token VARCHAR(255) DEFAULT '',          -- 登录token
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 注册时间
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 测试插入一条数据
INSERT INTO user (username, password)
VALUES ('testuser', '123456');

-- 查询
SELECT * FROM user;
