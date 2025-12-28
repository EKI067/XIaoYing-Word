<template>
  <view class="tabbar">
    <view class="tab" :class="{active: selected === 0}" @click="$emit('change', 0)">个人</view>
    <view class="tab" :class="{active: selected === 1}" @click="$emit('change', 1)">语音识别</view>
    <view class="tab" :class="{active: selected === 2}" @click="$emit('change', 2)">语音备忘录</view>
  </view>
</template>

<script>
export default {
  props: { selected: { type: Number, default: 0 } }
}
</script>

<style>
.tabbar {
  display: flex;
  flex-direction: row;
  height: 50px;
  border-top: 1px solid #ccc;
  background-color: #fff;
}
.tab {
  flex: 1;
  text-align: center;
  line-height: 50px;
  color: #666;
}
.tab.active {
  color: #007aff;
  font-weight: bold;
}
</style>
