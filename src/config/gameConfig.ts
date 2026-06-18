import type { GameConfig } from '../types/game'

export const gameConfig: GameConfig = {
  title: '恋爱物语',
  initialResources: 100,
  maxActionsPerDay: 3,
  daysPerWeek: 7,
  maxAffinity: 100,
  minAffinity: -50,
  maxMood: 100,
  minMood: 0,
  moodDecayPerDay: 5,
  affinityDecayPerDay: 1,
  timeSlots: ['morning', 'afternoon', 'evening', 'night'],

  characters: [
    {
      id: 'linxiaoyu',
      name: '林小雨',
      avatar: '🌸',
      description: '温柔善良的图书馆管理员，喜欢读书和花草',
      personality: '温柔内向，有些害羞，但对喜欢的事物非常热情',
      favoriteGifts: ['flower', 'book', 'tea'],
      dislikedGifts: ['alcohol', 'game_console'],
      chatTopics: [
        { topic: '文学', affinity: 3 },
        { topic: '花草', affinity: 3 },
        { topic: '天气', affinity: 1 },
        { topic: '游戏', affinity: -1 },
        { topic: '运动', affinity: 0 }
      ],
      baseAffinity: 10,
      baseMood: 60,
      unlocked: true
    },
    {
      id: 'sufei',
      name: '苏菲',
      avatar: '🔥',
      description: '活泼开朗的咖啡馆女老板，热爱烘焙',
      personality: '热情外向，有点毒舌但内心温柔',
      favoriteGifts: ['coffee', 'dessert', 'game_console'],
      dislikedGifts: ['flower', 'book'],
      chatTopics: [
        { topic: '美食', affinity: 3 },
        { topic: '游戏', affinity: 3 },
        { topic: '天气', affinity: 1 },
        { topic: '文学', affinity: -1 },
        { topic: '运动', affinity: 2 }
      ],
      baseAffinity: 5,
      baseMood: 70,
      unlocked: true
    },
    {
      id: 'yeqing',
      name: '叶青',
      avatar: '🌙',
      description: '神秘的转学生，总是独来独往',
      personality: '冷静寡言，似乎藏着很多秘密',
      favoriteGifts: ['book', 'tea', 'music_box'],
      dislikedGifts: ['dessert', 'alcohol'],
      chatTopics: [
        { topic: '文学', affinity: 2 },
        { topic: '音乐', affinity: 3 },
        { topic: '天气', affinity: 0 },
        { topic: '游戏', affinity: 1 },
        { topic: '运动', affinity: -1 }
      ],
      baseAffinity: 0,
      baseMood: 50,
      unlocked: false,
      hidden: true,
      unlockCondition: 'unlock_yeqing'
    }
  ],

  gifts: [
    { id: 'flower', name: '鲜花', price: 30, icon: '🌹', description: '一束美丽的鲜花' },
    { id: 'book', name: '小说', price: 25, icon: '📚', description: '一本畅销小说' },
    { id: 'tea', name: '茶叶', price: 40, icon: '🍵', description: '上等的茶叶礼盒' },
    { id: 'coffee', name: '咖啡豆', price: 35, icon: '☕', description: '精品咖啡豆' },
    { id: 'dessert', name: '甜点', price: 20, icon: '🍰', description: '精致的手工甜点' },
    { id: 'game_console', name: '游戏机', price: 80, icon: '🎮', description: '最新款掌上游戏机' },
    { id: 'alcohol', name: '红酒', price: 60, icon: '🍷', description: '一瓶高档红酒' },
    { id: 'music_box', name: '音乐盒', price: 50, icon: '🎵', description: '精致的八音盒' }
  ],

  cards: [
    { id: 'linxiaoyu_common_1', name: '图书馆的邂逅', characterId: 'linxiaoyu', rarity: 'common', image: '📖', description: '第一次在图书馆见到小雨的场景', unlockCondition: 'meet_linxiaoyu' },
    { id: 'linxiaoyu_rare_1', name: '花田中', characterId: 'linxiaoyu', rarity: 'rare', image: '🌻', description: '小雨在花田中微笑的样子', unlockCondition: 'linxiaoyu_affinity_40' },
    { id: 'linxiaoyu_epic_1', name: '雨中伞', characterId: 'linxiaoyu', rarity: 'epic', image: '☂️', description: '一起在雨中撑伞回家', unlockCondition: 'linxiaoyu_affinity_70' },
    { id: 'linxiaoyu_legendary_1', name: '告白', characterId: 'linxiaoyu', rarity: 'legendary', image: '💝', description: '樱花树下的告白', unlockCondition: 'linxiaoyu_affinity_100' },
    { id: 'sufei_common_1', name: '咖啡馆的相遇', characterId: 'sufei', rarity: 'common', image: '☕', description: '第一次走进苏菲的咖啡馆', unlockCondition: 'meet_sufei' },
    { id: 'sufei_rare_1', name: '烘焙时光', characterId: 'sufei', rarity: 'rare', image: '🧁', description: '苏菲教你做蛋糕', unlockCondition: 'sufei_affinity_40' },
    { id: 'sufei_epic_1', name: '深夜游戏', characterId: 'sufei', rarity: 'epic', image: '🎮', description: '一起打游戏到深夜', unlockCondition: 'sufei_affinity_70' },
    { id: 'sufei_legendary_1', name: '夕阳下的吻', characterId: 'sufei', rarity: 'legendary', image: '🌅', description: '咖啡馆关门前的浪漫时刻', unlockCondition: 'sufei_affinity_100' },
    { id: 'yeqing_common_1', name: '月下身影', characterId: 'yeqing', rarity: 'common', image: '🌙', description: '月光下独自散步的叶青', unlockCondition: 'meet_yeqing' },
    { id: 'yeqing_rare_1', name: '琴音缭绕', characterId: 'yeqing', rarity: 'rare', image: '🎹', description: '叶青弹奏钢琴的样子', unlockCondition: 'yeqing_affinity_40' },
    { id: 'linxiaoyu_weekend_1', name: '星空下的约定', characterId: 'linxiaoyu', rarity: 'epic', image: '🌟', description: '和小雨在观星台许下的星空之约', unlockCondition: 'weekend_stargazing_linxiaoyu' },
    { id: 'sufei_weekend_1', name: '海上日出', characterId: 'sufei', rarity: 'epic', image: '🏞️', description: '和苏菲一起看海上的第一缕阳光', unlockCondition: 'weekend_seaside_sufei' },
    { id: 'yeqing_weekend_1', name: '古寺钟声', characterId: 'yeqing', rarity: 'epic', image: '⛩️', description: '与叶青在山间古寺的静默时光', unlockCondition: 'weekend_mountain_yeqing' },
    { id: 'weekend_legendary_1', name: '命运的交汇', characterId: 'linxiaoyu', rarity: 'legendary', image: '💫', description: '所有人在花火大会上的命运交错', unlockCondition: 'weekend_fireworks_all' }
  ],

  events: [
    {
      id: 'intro_linxiaoyu',
      title: '图书馆的邂逅',
      description: '你在图书馆寻找一本书时，一位温柔的女生帮你找到了它。她叫林小雨，是这里的管理员。',
      characterId: 'linxiaoyu',
      triggerCondition: { minDay: 1, maxDay: 1, timeOfDay: 'morning' },
      choices: [
        {
          id: 'thankful',
          text: '道谢并和她聊聊天',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 5, moodChange: 10 }],
          addCardId: 'linxiaoyu_common_1'
        },
        {
          id: 'hurry',
          text: '道谢后匆匆离开',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 2 }]
        }
      ],
      once: true,
      priority: 100
    },
    {
      id: 'intro_sufei',
      title: '咖啡馆的偶遇',
      description: '你走进一家新开的咖啡馆，热情的女老板苏菲立刻迎了上来。"欢迎光临！今天想来点什么？"',
      characterId: 'sufei',
      triggerCondition: { minDay: 1, maxDay: 2, timeOfDay: 'afternoon' },
      choices: [
        {
          id: 'coffee',
          text: '点一杯招牌咖啡',
          effects: [{ characterId: 'sufei', affinityChange: 5, moodChange: 10 }],
          resourceChange: -10,
          addCardId: 'sufei_common_1'
        },
        {
          id: 'dessert',
          text: '点一份甜点尝尝',
          effects: [{ characterId: 'sufei', affinityChange: 7, moodChange: 15 }],
          resourceChange: -20
        }
      ],
      once: true,
      priority: 99
    },
    {
      id: 'rainy_day_1',
      title: '突如其来的暴雨',
      description: '天空突然下起了大雨，你看到林小雨站在屋檐下，似乎没带伞。',
      characterId: 'linxiaoyu',
      triggerCondition: { minDay: 3, timeOfDay: 'evening', minAffinity: 20, characterId: 'linxiaoyu' },
      choices: [
        {
          id: 'share_umbrella',
          text: '把伞借给她',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 15, moodChange: 20 }]
        },
        {
          id: 'wait_together',
          text: '陪她等雨停',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 10, moodChange: 10 }]
        },
        {
          id: 'leave',
          text: '假装没看到走开',
          effects: [{ characterId: 'linxiaoyu', affinityChange: -5, moodChange: -10 }]
        }
      ],
      once: true,
      priority: 90
    },
    {
      id: 'cafe_late_night',
      title: '深夜咖啡馆',
      description: '你路过咖啡馆，发现灯还亮着。苏菲一个人在店里，看起来有些疲惫。',
      characterId: 'sufei',
      triggerCondition: { minDay: 5, timeOfDay: 'night', minAffinity: 30, characterId: 'sufei' },
      choices: [
        {
          id: 'help',
          text: '进去帮帮忙',
          effects: [{ characterId: 'sufei', affinityChange: 12, moodChange: 15 }],
          resourceChange: -5
        },
        {
          id: 'company',
          text: '点杯咖啡陪陪她',
          effects: [{ characterId: 'sufei', affinityChange: 8, moodChange: 10 }],
          resourceChange: -15
        },
        {
          id: 'ignore',
          text: '不打扰她了',
          effects: [{ characterId: 'sufei', affinityChange: -3 }]
        }
      ],
      once: true,
      priority: 85
    },
    {
      id: 'mysterious_girl',
      title: '神秘的转学生',
      description: '在公园的角落里，你看到一个安静的女生独自坐在长椅上。她似乎注意到了你，微微点了点头。',
      characterId: 'yeqing',
      triggerCondition: { minDay: 7, minAffinity: 40 },
      choices: [
        {
          id: 'approach',
          text: '上前打招呼',
          effects: [
            { characterId: 'yeqing', affinityChange: 5 },
            { characterId: 'linxiaoyu', affinityChange: -3 },
            { characterId: 'sufei', affinityChange: -3 }
          ],
          unlockCharacterId: 'yeqing',
          addCardId: 'yeqing_common_1'
        },
        {
          id: 'leave_quietly',
          text: '悄悄离开',
          effects: []
        }
      ],
      once: true,
      priority: 80
    },
    {
      id: 'birthday_surprise_1',
      title: '小雨的生日',
      description: '你想起今天是林小雨的生日，要准备什么惊喜吗？',
      characterId: 'linxiaoyu',
      triggerCondition: { minDay: 14, minAffinity: 50, characterId: 'linxiaoyu' },
      choices: [
        {
          id: 'big_surprise',
          text: '准备一个大惊喜',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 25, moodChange: 30 }],
          resourceChange: -50
        },
        {
          id: 'small_gift',
          text: '送一个小礼物',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 10, moodChange: 15 }],
          resourceChange: -20
        },
        {
          id: 'forget',
          text: '算了，假装不知道',
          effects: [{ characterId: 'linxiaoyu', affinityChange: -10, moodChange: -20 }]
        }
      ],
      once: true,
      priority: 95
    },
    {
      id: 'conflict_1',
      title: '两人的邀约',
      description: '林小雨和苏菲同时邀请你周末出去，你该怎么办？',
      triggerCondition: { minDay: 10, minAffinity: 35 },
      choices: [
        {
          id: 'choose_xiaoyu',
          text: '答应小雨',
          effects: [
            { characterId: 'linxiaoyu', affinityChange: 10, moodChange: 15 },
            { characterId: 'sufei', affinityChange: -8, moodChange: -10 }
          ]
        },
        {
          id: 'choose_sufei',
          text: '答应苏菲',
          effects: [
            { characterId: 'sufei', affinityChange: 10, moodChange: 15 },
            { characterId: 'linxiaoyu', affinityChange: -8, moodChange: -10 }
          ]
        },
        {
          id: 'reject_both',
          text: '都拒绝，说有事',
          effects: [
            { characterId: 'linxiaoyu', affinityChange: -3 },
            { characterId: 'sufei', affinityChange: -3 }
          ]
        },
        {
          id: 'suggest_together',
          text: '建议三个人一起',
          effects: [
            { characterId: 'linxiaoyu', affinityChange: -2 },
            { characterId: 'sufei', affinityChange: -2 }
          ]
        }
      ],
      once: true,
      priority: 88
    }
  ],

  actions: [
    { type: 'chat', name: '聊天', icon: '💬', description: '和角色聊聊天，增进感情', energyCost: 1 },
    { type: 'gift', name: '送礼', icon: '🎁', description: '送礼物给角色，效果因人而异', energyCost: 1 },
    { type: 'work', name: '打工', icon: '💼', description: '辛苦工作赚取代币', energyCost: 2 },
    { type: 'weekend_trip', name: '周末行程', icon: '✈️', description: '周末特别行程，高成本换取稀有剧情', energyCost: 3 }
  ],

  weekendItineraries: [
    {
      id: 'stargazing_linxiaoyu',
      name: '星空观星之旅',
      icon: '🔭',
      description: '和小雨一起去郊外观星台看星星，远离城市喧嚣的浪漫之夜',
      characterId: 'linxiaoyu',
      cost: 60,
      energyCost: 3,
      minDay: 5,
      minAffinity: 30,
      requiredUnlocked: true,
      storyText: '你们驱车来到郊外的观星台。夜幕降临，满天繁星如钻石般洒落在深邃的天穹上。小雨轻轻依偎在你身边，安静地仰望着星空……',
      choices: [
        {
          id: 'name_a_star',
          text: '为小雨命名一颗星星',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 20, moodChange: 25 }],
          resourceChange: -20,
          addCardId: 'linxiaoyu_weekend_1',
          addFlag: 'weekend_stargazing_linxiaoyu'
        },
        {
          id: 'hold_hand',
          text: '悄悄牵起她的手',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 15, moodChange: 20 }],
          addFlag: 'weekend_stargazing_linxiaoyu'
        },
        {
          id: 'take_photo',
          text: '拍下这片星空留作纪念',
          effects: [{ characterId: 'linxiaoyu', affinityChange: 10, moodChange: 15 }],
          addCardId: 'linxiaoyu_weekend_1',
          addFlag: 'weekend_stargazing_linxiaoyu'
        }
      ],
      rewardCardId: 'linxiaoyu_weekend_1'
    },
    {
      id: 'seaside_sufei',
      name: '海滨日出之行',
      icon: '🏖️',
      description: '和苏菲一起去海边看日出，享受清晨的海风和浪花',
      characterId: 'sufei',
      cost: 70,
      energyCost: 3,
      minDay: 5,
      minAffinity: 30,
      requiredUnlocked: true,
      storyText: '凌晨四点，你和苏菲踏上了去海边的路。天边渐渐泛起橘红色的光晕，海浪轻拍沙滩，苏菲脱掉鞋子踩在细软的沙滩上……',
      choices: [
        {
          id: 'surf_together',
          text: '一起冲浪迎接日出',
          effects: [{ characterId: 'sufei', affinityChange: 20, moodChange: 25 }],
          resourceChange: -15,
          addCardId: 'sufei_weekend_1',
          addFlag: 'weekend_seaside_sufei'
        },
        {
          id: 'beach_walk',
          text: '沿沙滩漫步聊天',
          effects: [{ characterId: 'sufei', affinityChange: 15, moodChange: 20 }],
          addFlag: 'weekend_seaside_sufei'
        },
        {
          id: 'build_sandcastle',
          text: '一起堆沙堡',
          effects: [{ characterId: 'sufei', affinityChange: 12, moodChange: 18 }],
          addCardId: 'sufei_weekend_1',
          addFlag: 'weekend_seaside_sufei'
        }
      ],
      rewardCardId: 'sufei_weekend_1'
    },
    {
      id: 'mountain_yeqing',
      name: '山间古寺探幽',
      icon: '⛩️',
      description: '和叶青一起去深山中的古寺探访，感受寂静与禅意',
      characterId: 'yeqing',
      cost: 80,
      energyCost: 3,
      minDay: 10,
      minAffinity: 25,
      requiredUnlocked: true,
      storyText: '山路蜿蜒而上，古寺隐藏在云雾缭绕的山巅。叶青走在前面，步伐轻快而沉稳。寺庙的钟声悠远传来，仿佛能洗涤一切杂念……',
      choices: [
        {
          id: 'pray_together',
          text: '一起在佛前许愿',
          effects: [{ characterId: 'yeqing', affinityChange: 20, moodChange: 25 }],
          resourceChange: -10,
          addCardId: 'yeqing_weekend_1',
          addFlag: 'weekend_mountain_yeqing'
        },
        {
          id: 'listen_bell',
          text: '安静地听钟声和叶青谈心',
          effects: [{ characterId: 'yeqing', affinityChange: 18, moodChange: 22 }],
          addFlag: 'weekend_mountain_yeqing'
        },
        {
          id: 'explore_trail',
          text: '探索寺庙后山的小径',
          effects: [{ characterId: 'yeqing', affinityChange: 15, moodChange: 20 }],
          addCardId: 'yeqing_weekend_1',
          addFlag: 'weekend_mountain_yeqing'
        }
      ],
      rewardCardId: 'yeqing_weekend_1'
    },
    {
      id: 'fireworks_all',
      name: '花火大会之夜',
      icon: '🎆',
      description: '小镇一年一度的花火大会，所有人都会到场。这是见证命运交汇的珍贵时刻',
      characterId: 'linxiaoyu',
      cost: 100,
      energyCost: 3,
      minDay: 14,
      requiredUnlocked: false,
      storyText: '花火大会的夜空被绚烂的烟花照亮。林小雨站在河岸边仰望着，苏菲在小吃摊前忙碌地张罗着，而叶青独自坐在远处的石阶上……每个人的身影都被花火映照出不同的色彩。',
      choices: [
        {
          id: 'watch_with_xiaoyu',
          text: '陪小雨看烟花',
          effects: [
            { characterId: 'linxiaoyu', affinityChange: 18, moodChange: 20 },
            { characterId: 'sufei', affinityChange: -5 },
            { characterId: 'yeqing', affinityChange: -3 }
          ],
          addCardId: 'weekend_legendary_1',
          addFlag: 'weekend_fireworks_all'
        },
        {
          id: 'help_sufei',
          text: '帮苏菲经营摊位',
          effects: [
            { characterId: 'sufei', affinityChange: 18, moodChange: 20 },
            { characterId: 'linxiaoyu', affinityChange: -5 },
            { characterId: 'yeqing', affinityChange: -3 }
          ],
          resourceChange: 20,
          addCardId: 'weekend_legendary_1',
          addFlag: 'weekend_fireworks_all'
        },
        {
          id: 'sit_with_yeqing',
          text: '去陪叶青坐一会儿',
          effects: [
            { characterId: 'yeqing', affinityChange: 18, moodChange: 20 },
            { characterId: 'linxiaoyu', affinityChange: -3 },
            { characterId: 'sufei', affinityChange: -5 }
          ],
          addCardId: 'weekend_legendary_1',
          addFlag: 'weekend_fireworks_all'
        }
      ],
      rewardCardId: 'weekend_legendary_1'
    }
  ],

  workRewards: { min: 15, max: 35 }
}

export default gameConfig
