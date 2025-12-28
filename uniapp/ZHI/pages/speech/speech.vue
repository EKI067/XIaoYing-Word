<template>
  <view class="container">
    <view class="language-selector">
      <text>{{ fromLanguage }} → {{ toLanguage }}</text>
      <button @tap="swapLanguage">⇄</button>
    </view>
    
    <textarea 
      placeholder=" 请输入您想翻译的内容"
      v-model="inputText"
      @input="onInput"
      maxlength="500"
      auto-height
      class="input-area"
    />
    
    <view class="char-count">{{ inputText.length }}/500</view>
    
    <button 
      @tap="translateText" 
      :disabled="translating || !inputText.trim()"
      class="translate-btn"
      :class="{ 'translating': translating }"
    >
      {{ translating ? '翻译中...' : '翻译' }}
    </button>
    
    <!-- 翻译结果区域 -->
    <view v-if="translatedText" class="result-section">
      <view class="result-header">
        <text>翻译结果</text>
        <view>
          <button @tap="copyText" class="copy-btn">复制</button>
          <button @tap="saveToHistory" class="save-btn" v-if="!isInHistory">保存</button>
        </view>
      </view>
      <view class="result-text">{{ translatedText }}</view>
      
      <!-- 新增例句生成区域 -->
      <view v-if="showExampleSection" class="example-section">
        <view class="example-header">
          <text>单词例句</text>
          <button 
            @tap="generateExamples" 
            :disabled="generatingExamples"
            class="example-btn"
            :class="{ 'generating': generatingExamples }"
          >
            {{ generatingExamples ? '生成中...' : '生成例句' }}
          </button>
        </view>
        
        <!-- 例句加载状态 -->
        <view v-if="generatingExamples" class="example-loading">
          <text>正在生成例句...</text>
        </view>
        
        <!-- 例句结果 -->
        <view v-if="examples && Object.keys(examples).length > 0" class="example-result">
          <view 
            v-for="(exampleList, word) in examples" 
            :key="word"
            class="word-examples"
          >
            <view class="word-title">{{ word }}</view>
            <view 
              v-for="(example, index) in exampleList" 
              :key="index"
              class="example-item"
            >
              <text class="english-example">{{ example.english }}</text>
              <text class="chinese-example">{{ example.chinese }}</text>
            </view>
          </view>
        </view>
        
        <!-- 例句错误提示 -->
        <view v-if="exampleError" class="example-error">
          <text>⚠️ {{ exampleError }}</text>
        </view>
      </view>
    </view>
    
    <!-- 错误提示 -->
    <view v-if="error" class="error-section">
      <text>⚠️ {{ error }}</text>
    </view>
    
    <!-- 历史记录区域 -->
    <view v-if="history.length > 0" class="history-section">
      <view class="section-header">
        <text class="section-title">历史记录</text>
        <button @tap="clearHistory" class="clear-history-btn">清空</button>
      </view>
      
      <scroll-view class="history-list" scroll-y>
        <view 
          v-for="(item, index) in history" 
          :key="index"
          class="history-item"
          @tap="loadHistoryItem(item)"
        >
          <view class="history-content">
            <view class="history-text">
              <text class="source-text">{{ item.source }}</text>
              <text class="target-text">{{ item.target }}</text>
            </view>
            <view class="history-meta">
              <text class="lang-info">{{ item.fromLang }} → {{ item.toLang }}</text>
              <text class="time-info">{{ formatTime(item.timestamp) }}</text>
            </view>
          </view>
          <button @tap.stop="deleteHistoryItem(index)" class="delete-btn">删除</button>
        </view>
      </scroll-view>
    </view>
    
    <!-- 空状态提示 -->
    <view v-if="history.length === 0 && !translatedText" class="empty-state">
      <text class="empty-text">暂无翻译记录</text>
      <text class="empty-hint">翻译内容将自动保存到历史记录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      translatedText: '',
      fromLanguage: '中文',
      toLanguage: '英文',
      translating: false,
      error: '',
      history: [], // 历史记录数组
      isInHistory: false, // 当前结果是否已在历史记录中
      
      // 新增例句相关数据
      generatingExamples: false,
      examples: {},
      exampleError: ''
    }
  },
  
  computed: {
    // 判断是否显示例句区域（仅在中英互译时显示）
    showExampleSection() {
      const isChineseToEnglish = this.fromLanguage === '中文' && this.toLanguage === '英文';
      const isEnglishToChinese = this.fromLanguage === '英文' && this.toLanguage === '中文';
      return (isChineseToEnglish || isEnglishToChinese) && this.translatedText;
    }
  },
  
  onLoad() {
    this.loadHistoryFromStorage();
  },
  
  methods: {
    async translateText() {
      // 验证输入
      if (!this.inputText.trim()) {
        this.error = '请输入要翻译的文本'
        return
      }
      
      this.translating = true
      this.error = ''
      this.translatedText = ''
      this.isInHistory = false
      // 清空例句数据
      this.examples = {}
      this.exampleError = ''
      
      try {
        console.log('开始翻译请求...')
        
        // 使用更健壮的请求方式
        const res = await uni.request({
          url: 'http://localhost:3000/translate',
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: {
            text: this.inputText.trim(),
            from: this.getLangCode(this.fromLanguage),
            to: this.getLangCode(this.toLanguage)
          },
          timeout: 10000
        })
        
        console.log('API响应:', res)
        
        // 安全地处理响应
        let responseData = null
        
        // Uniapp 响应格式判断
        if (Array.isArray(res)) {
          // H5环境：res = [error, successRes]
          if (res[0]) {
            throw new Error(`请求失败: ${res[0].errMsg || '未知错误'}`)
          }
          responseData = res[1]?.data
        } else if (res && res.statusCode) {
          // 小程序环境：res = { statusCode, data, ... }
          if (res.statusCode !== 200) {
            throw new Error(`HTTP错误: ${res.statusCode}`)
          }
          responseData = res.data
        } else {
          throw new Error('未知的响应格式')
        }
        
        if (!responseData) {
          throw new Error('响应数据为空')
        }
        
        console.log('响应数据:', responseData)
        
        // 处理翻译结果
        if (responseData.code === 0) {
          // 讯飞API格式
          if (responseData.data?.result?.trans_result?.dst) {
            this.translatedText = responseData.data.result.trans_result.dst
            // 翻译成功后自动保存到历史记录
            this.saveToHistory();
          } else {
            throw new Error('翻译结果格式错误')
          }
        } else {
          throw new Error(responseData.message || `翻译错误: ${responseData.code}`)
        }
        
      } catch (err) {
        console.error('翻译错误详情:', err)
        this.error = err.message || '翻译失败，请重试'
        
        // 提供更友好的错误提示
        if (err.errMsg) {
          if (err.errMsg.includes('timeout')) {
            this.error = '请求超时，请检查网络连接'
          } else if (err.errMsg.includes('fail')) {
            this.error = '网络请求失败，请检查后端服务'
          }
        }
      } finally {
        this.translating = false
      }
    },
    
    // 新增：生成例句方法
    async generateExamples() {
      if (!this.translatedText) {
        this.exampleError = '请先完成翻译'
        return
      }
      
      this.generatingExamples = true
      this.exampleError = ''
      this.examples = {}
      
      try {
        // 确定英文和中文文本
        let englishText = '';
        let chineseText = '';
        
        if (this.fromLanguage === '中文' && this.toLanguage === '英文') {
          // 中译英：原文是中文，翻译结果是英文
          chineseText = this.inputText.trim();
          englishText = this.translatedText;
        } else if (this.fromLanguage === '英文' && this.toLanguage === '中文') {
          // 英译中：原文是英文，翻译结果是中文
          englishText = this.inputText.trim();
          chineseText = this.translatedText;
        } else {
          this.exampleError = '例句生成仅支持中英文互译'
          return;
        }
        
        const res = await uni.request({
          url: 'http://localhost:3001/generate-examples',
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            english_text: englishText,
            chinese_text: chineseText
          },
          timeout: 45000
        })
        
        console.log('例句生成响应:', res)
        
        // 处理响应
        let responseData = null;
        if (Array.isArray(res)) {
          if (res[0]) {
            throw new Error(`请求失败: ${res[0].errMsg || '未知错误'}`)
          }
          responseData = res[1]?.data
        } else if (res && res.statusCode) {
          if (res.statusCode !== 200) {
            throw new Error(`HTTP错误: ${res.statusCode}`)
          }
          responseData = res.data
        } else {
          throw new Error('未知的响应格式')
        }
        
        if (!responseData) {
          throw new Error('响应数据为空')
        }
        
        if (responseData.code === 0) {
          this.examples = responseData.data.examples || {};
          if (Object.keys(this.examples).length === 0) {
            this.exampleError = '未生成例句，请重试'
          }
        } else {
          throw new Error(responseData.message || '例句生成失败')
        }
        
      } catch (err) {
        console.error('例句生成错误:', err)
        this.exampleError = err.message || '例句生成失败，请重试'
      } finally {
        this.generatingExamples = false
      }
    },
    
    // 保存到历史记录
    saveToHistory() {
      if (!this.inputText.trim() || !this.translatedText) {
        return;
      }
      
      // 检查是否已存在相同记录
      const existingIndex = this.history.findIndex(item => 
        item.source === this.inputText.trim() && 
        item.target === this.translatedText &&
        item.fromLang === this.fromLanguage &&
        item.toLang === this.toLanguage
      );
      
      if (existingIndex !== -1) {
        // 如果已存在，更新时间为当前时间
        this.history[existingIndex].timestamp = Date.now();
        // 将该项移到最前面
        const existingItem = this.history.splice(existingIndex, 1)[0];
        this.history.unshift(existingItem);
        this.isInHistory = true;
      } else {
        // 添加新记录
        const newItem = {
          source: this.inputText.trim(),
          target: this.translatedText,
          fromLang: this.fromLanguage,
          toLang: this.toLanguage,
          timestamp: Date.now()
        };
        
        this.history.unshift(newItem);
        this.isInHistory = true;
        
        // 限制历史记录数量（最多50条）
        if (this.history.length > 50) {
          this.history = this.history.slice(0, 50);
        }
      }
      
      // 保存到本地存储
      this.saveHistoryToStorage();
    },
    
    // 从本地存储加载历史记录
    loadHistoryFromStorage() {
      try {
        const historyData = uni.getStorageSync('translationHistory');
        if (historyData) {
          this.history = JSON.parse(historyData);
        }
      } catch (err) {
        console.error('加载历史记录失败:', err);
        this.history = [];
      }
    },
    
    // 保存历史记录到本地存储
    saveHistoryToStorage() {
      try {
        uni.setStorageSync('translationHistory', JSON.stringify(this.history));
      } catch (err) {
        console.error('保存历史记录失败:', err);
      }
    },
    
    // 加载历史记录项
    loadHistoryItem(item) {
      this.inputText = item.source;
      this.translatedText = item.target;
      this.fromLanguage = item.fromLang;
      this.toLanguage = item.toLang;
      this.isInHistory = true;
      // 清空例句数据
      this.examples = {};
      this.exampleError = '';
      
      // 滚动到顶部
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    
    // 删除单条历史记录
    deleteHistoryItem(index) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这条翻译记录吗？',
        success: (res) => {
          if (res.confirm) {
            this.history.splice(index, 1);
            this.saveHistoryToStorage();
            
            uni.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    
    // 清空所有历史记录
    clearHistory() {
      if (this.history.length === 0) return;
      
      uni.showModal({
        title: '确认清空',
        content: '确定要清空所有翻译记录吗？此操作不可撤销。',
        success: (res) => {
          if (res.confirm) {
            this.history = [];
            this.saveHistoryToStorage();
            
            uni.showToast({
              title: '已清空',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    
    // 格式化时间显示
    formatTime(timestamp) {
      const now = new Date();
      const date = new Date(timestamp);
      const diff = now - date;
      
      // 如果是今天
      if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
        return date.getHours().toString().padStart(2, '0') + ':' + 
               date.getMinutes().toString().padStart(2, '0');
      }
      
      // 如果是昨天
      if (diff < 48 * 60 * 60 * 1000 && date.getDate() === now.getDate() - 1) {
        return '昨天 ' + date.getHours().toString().padStart(2, '0') + ':' + 
               date.getMinutes().toString().padStart(2, '0');
      }
      
      // 其他情况显示完整日期
      return date.getFullYear() + '/' + 
             (date.getMonth() + 1).toString().padStart(2, '0') + '/' + 
             date.getDate().toString().padStart(2, '0');
    },
    
    getLangCode(langName) {
      const langMap = {
        '中文': 'cn',
        '英文': 'en',
        '日语': 'ja',
        '韩语': 'ko'
      }
      return langMap[langName] || 'cn'
    },
    
    swapLanguage() {
      // 交换语言
      const temp = this.fromLanguage
      this.fromLanguage = this.toLanguage
      this.toLanguage = temp
      
      // 如果已经有翻译结果，交换输入和输出
      if (this.translatedText) {
        const tempText = this.inputText
        this.inputText = this.translatedText
        this.translatedText = tempText
        this.isInHistory = false;
        // 清空例句数据
        this.examples = {};
        this.exampleError = '';
      }
    },
    
    onInput(e) {
      this.inputText = e.detail?.value || e.target?.value || this.inputText
      this.error = '' // 输入时清空错误
      this.isInHistory = false;
      // 清空例句数据
      this.examples = {};
      this.exampleError = '';
    },
    
    copyText() {
      if (this.translatedText) {
        uni.setClipboardData({
          data: this.translatedText,
          success: () => {
            uni.showToast({
              title: '复制成功',
              icon: 'success'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.language-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.language-selector text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.language-selector button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
}

.input-area {
  width: 100%;
  min-height: 120px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.char-count {
  text-align: right;
  color: #999;
  font-size: 14px;
  margin-bottom: 15px;
}

.translate-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,122,255,0.3);
  transition: all 0.3s;
}

.translate-btn:disabled {
  background: #ccc;
  opacity: 0.6;
  box-shadow: none;
}

.translate-btn.translating {
  background: #666;
}

.result-section {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border-left: 4px solid #007AFF;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.result-header text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.copy-btn, .save-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: 8px;
}

.copy-btn {
  background: #007AFF;
  color: white;
}

.save-btn {
  background: #34C759;
  color: white;
}

.result-text {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* 新增例句区域样式 */
.example-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.example-header text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.example-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #FF9500 0%, #FF6B00 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}

.example-btn:disabled {
  background: #ccc;
  opacity: 0.6;
}

.example-btn.generating {
  background: #666;
}

.example-loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.example-result {
  margin-top: 10px;
}

.word-examples {
  margin-bottom: 20px;
}

.word-title {
  font-size: 16px;
  font-weight: 600;
  color: #FF9500;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #FFE8CC;
}

.example-item {
  margin-bottom: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #FF9500;
}

.english-example {
  display: block;
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
}

.chinese-example {
  display: block;
  font-size: 14px;
  color: #666;
}

.example-error {
  margin-top: 10px;
  padding: 10px;
  background: #ffe6e6;
  color: #d32f2f;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}

.error-section {
  margin-top: 15px;
  padding: 15px;
  background: #ffe6e6;
  color: #d32f2f;
  border-radius: 8px;
  border-left: 4px solid #ff4444;
  font-size: 14px;
}

.history-section {
  margin-top: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.clear-history-btn {
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
}

.history-list {
  max-height: 300px;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f8f8f8;
  transition: background-color 0.2s;
}

.history-item:last-child {
  border-bottom: none;
}

.history-item:active {
  background-color: #f8f9fa;
}

.history-content {
  flex: 1;
  margin-right: 12px;
}

.history-text {
  margin-bottom: 8px;
}

.source-text {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.target-text {
  display: block;
  font-size: 14px;
  color: #007AFF;
}

.history-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.delete-btn {
  background: #ff3b30;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-text {
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
}

.empty-hint {
  display: block;
  font-size: 14px;
}
</style>