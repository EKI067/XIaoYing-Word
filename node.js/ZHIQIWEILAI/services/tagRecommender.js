// recommendTags.js

// 1️⃣ 已知短语 / 谚语 /固定表达库（函数外声明，避免重复声明）
const phrases = [
  { phrase: 'Practice makes perfect', tag: 'proverb' },
  { phrase: 'Take it step by step', tag: 'proverb' },
  { phrase: "I couldn't agree more", tag: 'proverb' },
  { phrase: "It's not my cup of tea", tag: 'proverb' },
  { phrase: 'That sounds reasonable', tag: 'proverb' }
]

// 2️⃣ 常用关键词库
const tagRules = [
  { keywords: ['order', 'food', 'meal'], tag: 'food' },
  { keywords: ['hotel', 'hostel', 'inn'], tag: 'hotel' },
  { keywords: ['airport', 'flight', 'plane'], tag: 'airport' },
  { keywords: ['would like', 'could you', 'please'], tag: 'polite expression' },
  { keywords: ['yesterday', 'last', 'ago'], tag: 'past tense' },
  { keywords: ['will', 'going to'], tag: 'future tense' },
  { keywords: ['meeting', 'project', 'deadline', 'client', 'report'], tag: 'business' },
  { keywords: ['exam', 'homework', 'study', 'assignment', 'class'], tag: 'education' }
]

// 3️⃣ 停用词
const stopwords = ['the','a','in','of','and','to','is','it','for','on','my','you','i','me','this','that','with']

module.exports = function recommendTags(text) {
  if (!text) return ['general']

  const t = text.toLowerCase()
  const tags = []

  // ✅ 1. 匹配短语优先
  phrases.forEach(item => {
    if (t.includes(item.phrase)) tags.push(item.tag)
  })

  // ✅ 2. 匹配关键词
  tagRules.forEach(rule => {
    if (rule.keywords.some(k => t.includes(k))) tags.push(rule.tag)
  })

  // ✅ 3. 剩余文本提取关键词
  let remainingText = t
  // 去掉已匹配短语和关键词，避免重复
  phrases.forEach(p => { remainingText = remainingText.replace(new RegExp(p.phrase, 'g'), '') })
  tagRules.forEach(r => {
    r.keywords.forEach(k => { remainingText = remainingText.replace(new RegExp(k, 'g'), '') })
  })

  // 提取单词
  let words = remainingText.match(/\b[a-z]+\b/g) || []
  words = words.filter(w => !stopwords.includes(w))
  tags.push(...words)

  // ✅ 4. 去重
  const uniqueTags = Array.from(new Set(tags))

  // ✅ 5. 默认标签
  return uniqueTags.length ? uniqueTags : ['general']
}
