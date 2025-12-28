<template>
  <view class="container">
    <!-- 顶部 -->
    <view class="header">
      <view class="title-wrap">
        <text class="title">英语好句笔记本</text>
        <text class="subtitle">Daily English Notes</text>
      </view>
      <button class="btn-search-page" @click="goSearch">🔍 搜索</button>
    </view>

    <!-- 输入区 -->
    <view class="card input-card">
      <view class="card-header">
        <text class="card-title">输入英语句子</text>
        <text class="tip-text">或使用下方推荐</text>
      </view>

      <!-- 分类 -->
      <view class="category-row">
        <picker :range="categories" @change="onCategoryChange">
          <view class="picker">
            {{ selectedCategory || '默认：日常' }}
          </view>
        </picker>
        <input
          class="category-input"
          v-model="customCategory"
          placeholder="自定义分类（可选）"
        />
      </view>

      <textarea
        v-model="text"
        class="input"
        placeholder="请输入英语内容..."
      />
    </view>

    <!-- 今日好句 -->
    <view class="card sentence-card">
      <view class="card-header">
        <text class="card-title">✨ 今日好句</text>
        <button class="random-btn" @click="randomSentence">🎲 换一句</button>
      </view>

      <view
        class="sentence-item"
        v-if="currentSentence"
        @click="useSentence(currentSentence.en)"
      >
        <text class="en">{{ currentSentence.en }}</text>
        <text class="zh">{{ currentSentence.zh }}</text>
        <text class="hint">点击即可使用</text>
      </view>
    </view>

    <!-- 分析按钮 -->
    <button
      class="btn analyze-btn"
      :disabled="!text.trim()"
      @click="analyzeText"
    >
      📝 分析并保存
    </button>

    <!-- 分析结果 -->
    <view v-if="result" class="card result-card" :animation="resultAnimation">
      <view class="card-header">
        <text class="card-title">分析结果</text>
        <text v-if="result.isImportant" class="badge">⭐ 重点</text>
      </view>

      <view class="result-content">
        <view class="row">
          <text class="label">分类：</text>
          <text class="value">{{ result.category }}</text>
        </view>

        <view class="row">
          <text class="label">标签：</text>
          <view class="tag-list">
            <text class="tag" v-for="(tag, i) in result.tags" :key="i">
              #{{ tag }}
            </text>
          </view>
        </view>

        <view class="row" v-if="result.example">
          <text class="label">示例：</text>
          <text class="value example">{{ result.example }}</text>
        </view>
      </view>

      <view class="action-row">
        <button class="btn-mark" @click="toggleImportant(result)">
          {{ result.isImportant ? '取消重点' : '标记重点' }}
        </button>
      </view>
    </view>

    <!-- 最近记录 -->
    <view class="card recent-card">
      <view class="card-header">
        <text class="card-title">📌 最近记录</text>
      </view>

      <view v-if="recentRecords.length" class="recent-list">
        <view 
          class="recent-item" 
          v-for="(record, i) in recentRecords" 
          :key="i"
          @click="useSentence(record.text)"
        >
          <text class="recent-text">{{ record.text }}</text>
          <text class="recent-category">[{{ record.category }}]</text>
          <button class="btn-mark-small" @click.stop="toggleImportant(record)">
            {{ record.isImportant ? '⭐' : '☆' }}
          </button>
        </view>
      </view>

      <view v-else class="empty-tip">
        暂无最近记录
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      result: null,
      user_id: 1,
      categories: ['日常', '口语表达', '商务英语', '旅行英语'],
      selectedCategory: '',
      customCategory: '',
      goodSentences: [
        { en: 'Practice makes perfect.', zh: '熟能生巧' },
        { en: 'I couldn’t agree more.', zh: '我完全同意' },
        { en: 'That sounds reasonable.', zh: '听起来很有道理' },
        { en: 'It’s not my cup of tea.', zh: '这不是我的菜' },
        { en: 'Take it step by step.', zh: '一步一步来' }
      ],
      currentSentence: null,
      resultAnimation: {},
      recentRecords: []
    };
  },

  onLoad() {
    // 初始化动画
    this.resultAnimation = uni.createAnimation({ duration: 0 })
      .opacity(0)
      .translateY(20)
      .step();

    // 页面加载时显示今日好句
    this.randomSentence();
  },

  methods: {
    onCategoryChange(e) {
      this.selectedCategory = this.categories[e.detail.value];
    },

    useSentence(sentence) {
      this.text = sentence;
    },

    randomSentence() {
      const index = Math.floor(Math.random() * this.goodSentences.length);
      this.currentSentence = this.goodSentences[index];
    },

    analyzeText() {
      if (!this.text.trim()) return;

      const finalCategory = this.customCategory || this.selectedCategory || '日常';

      uni.showLoading({ title: '分析中...' });

      uni.request({
        url: 'http://127.0.0.1:3000/text/analyze',
        method: 'POST',
        data: { text: this.text },
        success: (res) => {
          uni.hideLoading();
          if (res.data.code === 200) {
            const data = res.data.data;
            const record = {
              ...data,
              text: this.text,
              category: finalCategory,
              isImportant: false
            };
            this.result = record;

            // 动画显示
            this.resultAnimation = uni.createAnimation({ duration: 300 })
              .opacity(1)
              .translateY(0)
              .step();

            // 更新最近记录，最多保留三条
            this.recentRecords.unshift(record);
            if (this.recentRecords.length > 3) {
              this.recentRecords.pop();
            }

            // 保存到记录
            uni.request({
              url: 'http://127.0.0.1:3000/text/record/add',
              method: 'POST',
              data: {
                user_id: this.user_id,
                text: this.text,
                category: finalCategory,
                tags: data.tags || [],
                example: data.example || '',
                is_important: 0
              }
            });

            this.text = '';
            uni.showToast({ title: '保存成功', icon: 'success' });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({ title: '分析失败', icon: 'none' });
        }
      });
    },

    toggleImportant(record) {
      record.isImportant = !record.isImportant;
      uni.showToast({ 
        title: record.isImportant ? '已标记重点' : '已取消重点', 
        icon: 'none' 
      });
    },

    goSearch() {
      uni.navigateTo({ url: '/pages/search/search' });
    }
  }
};
</script>

<style scoped>
.container { padding: 24rpx; background: #f5f7fa; min-height: 100vh; box-sizing: border-box; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; }
.title-wrap { display: flex; flex-direction: column; }
.title { font-size: 36rpx; font-weight: bold; color: #2d3748; line-height: 1.2; }
.subtitle { font-size: 22rpx; color: #888; margin-top: 4rpx; }
.btn-search-page { background: #fff; color: #4299e1; border: none; padding: 12rpx 20rpx; border-radius: 20rpx; font-size: 24rpx; box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.05); }
.card { background: #fff; border-radius: 16rpx; margin-bottom: 24rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04); overflow: hidden; }
.card-header { padding: 20rpx 24rpx; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f5f5f5; }
.card-title { font-size: 28rpx; font-weight: 600; color: #2d3748; }
.tip-text { font-size: 22rpx; color: #888; }
.input-card { padding-bottom: 24rpx; }
.category-row { display: flex; gap: 16rpx; padding: 0 24rpx; margin-top: 20rpx; }
.picker, .category-input { flex: 1; background: #f7fafc; padding: 16rpx 20rpx; border-radius: 8rpx; font-size: 26rpx; border: none; }
.input { width: 100%; height: 180rpx; padding: 20rpx 24rpx; margin-top: 16rpx; font-size: 26rpx; line-height: 1.6; border: none; background: transparent; }
.sentence-card { padding-bottom: 0; }
.random-btn { background: #f7fafc; border: none; padding: 8rpx 16rpx; border-radius: 20rpx; font-size: 22rpx; color: #4a5568; }
.sentence-item { padding: 28rpx 24rpx; text-align: center; display: flex; flex-direction: column; align-items: center; }
.en { font-size: 30rpx; font-weight: 600; color: #2d3748; line-height: 1.4; }
.zh { font-size: 24rpx; color: #666; margin-top: 10rpx; line-height: 1.4; }
.hint { font-size: 20rpx; color: #aaa; margin-top: 10rpx; }
.btn { width: 100%; border: none; box-sizing: border-box; }
.analyze-btn { background: linear-gradient(90deg, #4299e1, #63b3ed); color: #fff; border-radius: 16rpx; padding: 22rpx; font-size: 28rpx; margin-bottom: 24rpx; }
.analyze-btn:disabled { background: #e2e8f0; color: #a0aec0; }
.result-card { padding-bottom: 24rpx; }
.result-content { padding: 20rpx 24rpx; }
.row { display: flex; align-items: flex-start; margin-bottom: 16rpx; width: 100%; }
.label { font-size: 26rpx; color: #4a5568; font-weight: 500; min-width: 80rpx; }
.value { font-size: 26rpx; color: #2d3748; flex: 1; word-wrap: break-word; line-height: 1.5; }
.example { color: #38b2ac; font-style: italic; }
.tag-list { display: flex; flex-wrap: wrap; gap: 12rpx; flex: 1; }
.tag { background: #ebf8ff; color: #4299e1; padding: 6rpx 16rpx; border-radius: 20rpx; font-size: 24rpx; }
.badge { background: #fef0f0; color: #e53e3e; padding: 6rpx 12rpx; border-radius: 20rpx; font-size: 22rpx; }
.action-row { display: flex; justify-content: center; padding: 0 24rpx; }
.btn-mark { background: #f7fafc; color: #4a5568; border: none; padding: 16rpx 40rpx; border-radius: 8rpx; font-size: 24rpx; }

/* 最近记录样式 */
.recent-card { padding-bottom: 24rpx; }
.recent-list { display: flex; flex-direction: column; gap: 16rpx; padding: 20rpx 24rpx; }
.recent-item { display: flex; align-items: center; justify-content: space-between; background: #f7fafc; padding: 16rpx 20rpx; border-radius: 12rpx; }
.recent-text { font-size: 26rpx; color: #2d3748; flex: 1; }
.recent-category { font-size: 22rpx; color: #888; margin-left: 12rpx; }
.btn-mark-small { background: none; border: none; font-size: 28rpx; margin-left: 12rpx; color: #e53e3e; }
.empty-tip { padding: 20rpx; text-align: center; color: #aaa; font-size: 24rpx; }
</style>
