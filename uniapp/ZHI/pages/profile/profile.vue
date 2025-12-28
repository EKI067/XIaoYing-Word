<template>
  <view class="container">
    <view class="avatar-box">
      <image :src="user.avatar_path || defaultAvatar" class="avatar" />
      <button class="upload-btn" @click="chooseAvatar">上传头像</button>
    </view>

    <view class="field">
      <text class="label">用户名：</text>
      <input v-model="user.username" class="username-input" />
    </view>
    <button class="save-btn" @click="saveUser">保存信息</button>

    <view class="btn-row">
      <button class="nav-btn" @click="goSpeech">🎙️ 中英互译</button>
      <button class="nav-btn" @click="goMemo">📝 备忘录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      defaultAvatar: '/static/avatar-default.png'
    }
  },
  onShow() {
    const user = uni.getStorageSync('user')
    if (user) this.user = user
    else uni.reLaunch({ url: '/pages/login/login' })
  },
  methods: {
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        success: res => {
          const tempFile = res.tempFilePaths[0]
          uni.uploadFile({
            url: 'http://127.0.0.1:3000/upload-avatar',
            filePath: tempFile,
            name: 'avatar',
            formData: { id: this.user.id },
            success: uploadRes => {
              try {
                const data = JSON.parse(uploadRes.data)
                if (data.code === 200) {
                  this.user.avatar_path = data.avatar
                  uni.setStorageSync('user', this.user)
                  uni.showToast({ title: '头像上传成功' })
                } else {
                  uni.showToast({ title: data.msg || '上传失败', icon: 'none' })
                }
              } catch (e) {
                console.error('JSON.parse 失败', uploadRes.data)
                uni.showToast({ title: '接口返回错误', icon: 'none' })
              }
            },
            fail: err => {
              console.error('上传失败', err)
              uni.showToast({ title: '上传失败', icon: 'none' })
            }
          })
        },
        fail: err => console.error('选择图片失败', err)
      })
    },
    saveUser() {
      uni.setStorageSync('user', this.user)
      uni.showToast({ title: '保存成功' })
    },
    goSpeech() { uni.switchTab({ url: '/pages/speech/speech' }) },
    goMemo() { uni.switchTab({ url: '/pages/memo/memo' }) }
  }
}
</script>

<style>
/* 整体容器背景渐变，增加 flex:1 保证撑满屏幕 */
.container {
  flex: 1; /* 新增，确保容器撑满屏幕 */
  padding: 30px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #a0e8b0, #8fd1ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 头像区域 */
.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #fff;
  box-shadow: 0 6px 12px rgba(0,0,0,0.25); 
}
.upload-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background: linear-gradient(to right, #e1f6fc, #e8f8ee);
  color: #333;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  text-shadow: 0 2px 3px rgba(0,0,0,0.25);
}
.upload-btn:active { animation: shine 1s linear infinite; }

/* 用户名输入框 */
.field {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}
.label {
  font-size: 16px;
  color: #2a2a2a; 
  text-shadow: 0 2px 3px rgba(255,255,255,0.45);
}
.username-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #b0dce0;
  border-radius: 12px;
  margin-left: 10px;
  background: linear-gradient(to right, #e1f6fc, #e8f8ee);
  font-size: 16px;
  font-weight: 400;
  color: #333;
  text-shadow: 0 1px 2px rgba(0,0,0,0.25);
}

/* 保存信息按钮 */
.save-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #e1f6fc, #e8f8ee);
  color: #333;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 25px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  text-shadow: 0 2px 3px rgba(0,0,0,0.25);
}
.save-btn:active { animation: shine 1s linear infinite; }

/* 导航按钮行 */
.btn-row {
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.nav-btn {
  flex: 1;
  margin: 0 5px;
  padding: 12px;
  background: linear-gradient(to right, #e1f6fc, #e8f8ee);
  color: #333;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  text-shadow: 0 2px 3px rgba(0,0,0,0.25);
}
.nav-btn:active { animation: shine 1s linear infinite; }

/* 流光动效 */
@keyframes shine {
  0% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
  50% { box-shadow: 0 0 15px rgba(255,255,255,0.9); }
  100% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
}
</style>