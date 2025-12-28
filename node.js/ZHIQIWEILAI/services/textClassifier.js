// upgradedClassifier.js
module.exports = function classifyText(text) {
  if (!text) return { category: '日常', tags: [] }

  const t = text.toLowerCase()

  // 1️⃣ 谚语库及主题
  const proverbs = [
    { phrase: "practice makes perfect", category: "教育" },
    { phrase: "take it step by step", category: "教育" },
    { phrase: "i couldn't agree more", category: "生活" },
    { phrase: "it's not my cup of tea", category: "生活" },
    { phrase: "that sounds reasonable", category: "生活" }
  ]

  let foundProverbs = []
  let proverbCategories = []

  proverbs.forEach(p => {
    const regex = new RegExp(p.phrase, 'i') // 不区分大小写
    if (regex.test(text)) {
      foundProverbs.push(p.phrase)
      proverbCategories.push(p.category)
    }
  })

  // 2️⃣ 去掉已匹配谚语
  let remainingText = text
  foundProverbs.forEach(p => {
    const regex = new RegExp(p, 'gi')
    remainingText = remainingText.replace(regex, '')
  })

  // 3️⃣ 主题关键词分类
  const categories = {
    教育: ['学习','练习','考试','技能','知识'],
    工作: ['工作','项目','任务','会议','报告'],
    健康: ['运动','锻炼','健康','饮食','心情'],
    娱乐: ['电影','游戏','音乐','旅游','休闲']
  }

  let tags = [...foundProverbs]
  let autoCategory = proverbCategories[0] || '日常'

  for (const [cat, keywords] of Object.entries(categories)) {
    keywords.forEach(k => {
      if (remainingText.toLowerCase().includes(k.toLowerCase()) && !tags.includes(k)) {
        tags.push(k)
      }
    })
    if (tags.length && autoCategory === '日常' && keywords.some(k => remainingText.toLowerCase().includes(k.toLowerCase()))) {
      autoCategory = cat
    }
  }

  return { category: autoCategory, tags }
}
