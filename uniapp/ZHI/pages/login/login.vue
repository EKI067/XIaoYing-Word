<template>
  <view class="container">
    <!-- 顶部标题 -->
    <text class="title">小星单词</text>

    <!-- 白色卡片 -->
    <view class="login-card">
      <input
        v-model="username"
        placeholder="请输入用户名"
        class="input"
        placeholder-style="color:#999"
      />

      <input
        v-model="password"
        :type="inputType"
        password="true"
        placeholder="请输入密码"
        class="input"
        placeholder-style="color:#999"
      />

      <view class="remember-row">
        <checkbox v-model="rememberPassword" color="#007AFF"></checkbox>
        <text>记住密码</text>
      </view>

      <button class="login-btn" @click="login">登录/注册</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rememberPassword: false,
      inputType: 'password' // 确保密码类型始终正确
    }
  },
  onShow() {
    const savedUser = uni.getStorageSync('savedUser')
    if (savedUser) {
      this.username = savedUser.username
      this.password = savedUser.password
      this.rememberPassword = true
    }
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
        return
      }

      uni.request({
        url: 'http://127.0.0.1:3000/login',
        method: 'POST',
        data: { username: this.username, password: this.password },
        success: res => {
          if (res.data.code === 200) {
            uni.setStorageSync('user', res.data.user)

            if (this.rememberPassword) {
              uni.setStorageSync('savedUser', {
                username: this.username,
                password: this.password
              })
            } else {
              uni.removeStorageSync('savedUser')
            }

            uni.showToast({ title: '登录成功', icon: 'success' })
            uni.reLaunch({ url: '/pages/profile/profile' })
          } else {
            uni.showToast({ title: res.data.msg || '登录失败', icon: 'none' })
          }
        },
        fail: () => {
          uni.showToast({ title: '服务器连接失败', icon: 'none' })
        }
      })
    }
  }
}
</script>

<style>
/* 整体背景：左右渐变 */
.container {
  flex: 1;
  background: linear-gradient(to right, #a0e8b0, #8fd1ff);
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 卡片靠下 */
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

/* 顶部标题 */
.title {
  font-size: 50px;
  font-weight: 500; /* 字体细 */
  color: #fff;
  margin-bottom: 70px; /* 上移一个字的高度 */
  align-self: flex-start;
  padding-left: 20px;

  /* 柔和但明显的阴影 */
  text-shadow: 2px 2px 6px rgba(0,0,0,0.25);
}

/* 白色卡片 */
.login-card {
  width: 100%;
  border-radius: 20px 20px 0 0; 
  background-color: #ffffff;
  padding: 30px 20px;
  box-shadow: 0 -4px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

/* 输入框 */
.input {
  width: 600rpx;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-bottom: 18px;
  font-size: 16px;
  color: #333;
  background-color: #fdfdfd;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.3s;
}
.login-btn:active {
  box-shadow: 0 0 10px rgba(0,180,255,0.6), 0 0 20px rgba(0,180,255,0.4);
}

/* 记住密码行 */
.remember-row {
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.remember-row text {
  margin-left: 6px;
  color: #555;
}
</style>