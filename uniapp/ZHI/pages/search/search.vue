<template>
  <view class="container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">搜索记录</text>
      <button class="btn-clear" @click="clearAllRecords" v-if="records.length" hover-class="btn-active">
        <text class="iconfont">🗑️</text>
        <text class="clear-text">清空全部</text>
      </button>
    </view>

    <!-- 搜索框 -->
    <view class="search-card">
      <view class="search-box">
        <view class="search-icon">🔍</view>
        <input 
          v-model="keyword" 
          class="search-input" 
          placeholder="搜索文本、分类或标签"
          placeholder-class="input-placeholder"
          @input="searchRecords"
          @confirm="searchRecords"
        />
        <button 
          class="btn-clear-input" 
          @click="clearInput" 
          v-if="keyword"
          hover-class="btn-active"
        >×</button>
      </view>
    </view>

    <!-- 记录列表 -->
    <view v-if="filteredRecords.length" class="records-list">
      <view 
        v-for="(item, index) in filteredRecords" 
        :key="item.id" 
        class="record-item"
      >
        <!-- 文本 -->
        <view class="record-header">
          <text class="record-text">{{ item.text }}</text>
        </view>

        <!-- 分类 -->
        <view v-if="item.category" class="category-row">
          <text class="category-label">分类：</text>
          <text class="category">{{ item.category }}</text>
        </view>

        <!-- 标签 -->
        <view class="tags-row" v-if="item.tags">
          <view class="tag-list">
            <view v-for="(tag, idx) in parseTags(item.tags)" :key="idx" class="tag">{{ tag }}</view>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="record-actions">
          <button class="action-btn mark-btn" @click.stop="toggleImportant(item)" hover-class="btn-active">
            <text class="iconfont">{{ item.is_important ? '⭐' : '☆' }}</text>
            <text class="btn-text">{{ item.is_important ? '取消重点' : '标记重点' }}</text>
          </button>

          <button class="action-btn delete-btn" @click.stop="deleteRecord(item.id)" hover-class="btn-active">
            <text class="iconfont">🗑️</text>
            <text class="btn-text">删除</text>
          </button>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <view class="empty-icon">📋</view>
      <text class="empty-text">{{ keyword ? '未找到相关记录' : '暂无记录' }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      user_id: 1,
      keyword: '',
      records: [],
      filteredRecords: []
    };
  },
  onLoad() {
    this.fetchRecords();
  },
  methods: {
    // 获取用户所有记录
    fetchRecords() {
      uni.request({
        url: 'http://127.0.0.1:3000/text/records',
        method: 'GET',
        data: { user_id: this.user_id },
        success: (res) => {
          if(res.data.code === 200){
            this.records = res.data.data;
            this.filteredRecords = [...this.records];
          } else {
            uni.showToast({ title: '获取记录失败', icon: 'none' });
          }
        },
        fail: () => {
          uni.showToast({ title: '网络错误', icon: 'none' });
        }
      });
    },

    // 搜索文本、分类和标签
    searchRecords() {
      const kw = this.keyword.trim().toLowerCase();
      if(!kw){
        this.filteredRecords = [...this.records];
        return;
      }
      this.filteredRecords = this.records.filter(r => {
        const textMatch = r.text && r.text.toLowerCase().includes(kw);
        const categoryMatch = r.category && r.category.toLowerCase().includes(kw);
        const tags = this.parseTags(r.tags);
        const tagMatch = tags.some(tag => tag.toLowerCase().includes(kw));
        return textMatch || categoryMatch || tagMatch;
      });
    },

    clearInput() {
      this.keyword = '';
      this.searchRecords();
    },

    deleteRecord(id) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这条记录吗？',
        success: (res) => {
          if(res.confirm){
            uni.request({
              url: 'http://127.0.0.1:3000/text/record/delete',
              method: 'POST',
              data: { id },
              success: (res2) => {
                if(res2.data.code === 200){
                  this.records = this.records.filter(r => r.id !== id);
                  this.searchRecords();
                  uni.showToast({ title: '删除成功', icon: 'success' });
                } else {
                  uni.showToast({ title: '删除失败', icon: 'none' });
                }
              },
              fail: () => uni.showToast({ title: '网络错误，删除失败', icon: 'none' })
            });
          }
        }
      });
    },

    toggleImportant(record) {
      record.is_important = record.is_important ? 0 : 1;
      uni.request({
        url: 'http://127.0.0.1:3000/text/record/update',
        method: 'POST',
        data: { id: record.id, isImportant: record.is_important },
        success: (res) => {
          if(res.data.code === 200){
            uni.showToast({ title: '更新成功', icon: 'success' });
          } else {
            uni.showToast({ title: '更新失败', icon: 'none' });
          }
        },
        fail: () => uni.showToast({ title: '网络错误，更新失败', icon: 'none' })
      });
    },

    clearAllRecords() {
      if(!this.records.length) return;
      uni.showModal({
        title: '清空记录',
        content: '确定要清空所有记录吗？此操作不可恢复！',
        success: (res) => {
          if(res.confirm){
            const ids = this.records.map(r => r.id);
            uni.request({
              url: 'http://127.0.0.1:3000/text/record/deleteBatch',
              method: 'POST',
              data: { ids },
              success: (res2) => {
                if(res2.data.code === 200){
                  this.records = [];
                  this.filteredRecords = [];
                  uni.showToast({ title: '已清空所有记录', icon: 'success' });
                } else {
                  uni.showToast({ title: '清空失败', icon: 'none' });
                }
              },
              fail: () => uni.showToast({ title: '网络错误，清空失败', icon: 'none' })
            });
          }
        }
      });
    },

    parseTags(tagsStr) {
      try {
        return tagsStr ? JSON.parse(tagsStr) : [];
      } catch (e) {
        console.error('标签解析失败:', e);
        return [];
      }
    }
  }
};
</script>

<style scoped>
.container { padding: 20rpx; background: #f8f9fa; min-height: 100vh; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30rpx; }
.title { font-size: 38rpx; font-weight: 700; color: #2d3748; }
.btn-clear { display: flex; align-items: center; background: #fef0f0; border: 1px solid #fde2e2; border-radius: 8rpx; padding: 8rpx 16rpx; font-size: 24rpx; color: #e53e3e; }
.clear-text { margin-left: 8rpx; }
.search-card { background: #fff; border-radius: 16rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); padding: 20rpx; margin-bottom: 30rpx; }
.search-box { display: flex; align-items: center; gap: 12rpx; position: relative; }
.search-icon { position: absolute; left: 20rpx; top: 50%; transform: translateY(-50%); font-size: 26rpx; color: #a0aec0; z-index: 1; }
.search-input { flex: 1; border-radius: 12rpx; padding: 20rpx 20rpx 20rpx 56rpx; font-size: 28rpx; border: 1px solid #e2e8f0; background: #f7fafc; color: #2d3748; outline: none; }
.input-placeholder { color: #a0aec0; font-size: 26rpx; }
.btn-clear-input { position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%); background: transparent; border: none; font-size: 30rpx; color: #a0aec0; width: 40rpx; height: 40rpx; display: flex; align-items: center; justify-content: center; }
.records-list { display: flex; flex-direction: column; gap: 20rpx; }
.record-item { background: #fff; border-radius: 16rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); overflow: hidden; transition: all 0.2s ease; padding: 16rpx; }
.record-header { font-size: 28rpx; color: #2d3748; margin-bottom: 8rpx; }
.category-row { display: flex; align-items: center; margin-bottom: 8rpx; }
.category-label { font-weight: 600; color: #4a5568; font-size: 26rpx; margin-right: 8rpx; }
.category { color: #4299e1; font-size: 26rpx; }
.tags-row { margin-bottom: 8rpx; }
.tag-list { display: flex; flex-wrap: wrap; gap: 12rpx; }
.tag { background: #e0f7fa; padding: 6rpx 12rpx; border-radius: 12rpx; font-size: 24rpx; color: #00796b; }
.record-actions { display: flex; gap: 12rpx; margin-top: 8rpx; }
.action-btn { flex: 1; display: flex; align-items: center; justify-content: center; padding: 12rpx 8rpx; border-radius: 8rpx; font-size: 24rpx; border: none; }
.mark-btn { background: #fef7fb; color: #ed8936; }
.delete-btn { background: #fef0f0; color: #e53e3e; }
.btn-text { margin-left: 6rpx; font-size: 22rpx; }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80rpx 40rpx; text-align: center; }
.empty-icon { font-size: 80rpx; margin-bottom: 20rpx; opacity: 0.6; }
.empty-text { font-size: 28rpx; color: #718096; margin-bottom: 12rpx; }
.btn-active { transform: scale(0.96); opacity: 0.9; transition: all 0.1s ease; }
</style>
